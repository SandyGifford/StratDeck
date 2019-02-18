import "./PlayTable.style";

import * as React from "react";
import Board from "./subComponents/Board/Board";
import Hand from "./subComponents/Hand/Hand";
import { PlayerState, TablePlayerState, TablePlayerCharacters, GameState } from "../../typings/game";
import { Vector2 } from "../../typings/vector";
import PlayerDecks from "./subComponents/PlayerDecks/PlayerDecks";
import LoopUtils from "../../utils/LoopUtils";
import Server from "../../connection/Server";
import SimpleSelect, { SimpleSelectChangedHandler, SimpleSelectMakeLabel } from "../SimpleSelect/SimpleSelect";
import SimpleButton from "../SimpleButton/SimpleButton";
import PopMessenger from "../PopMessage/PopMessenger";
import CardPool from "./subComponents/CardPool/CardPool";
import Rotado from "../Rotado/Rotado";
import TableDrawer from "../TableDrawer/TableDrawer";

export type PlayPhase = "buy" | "play";
export type PlayMode = "move" | "use";

export interface PlayTableProps {
	playersInit: PlayerState[];
	gameState: GameState;
	boardWidth: number;
	boardHeight: number;
	myPlayerIndex: number;
}
export interface PlayTableState {
	players: TablePlayerState[];
	newGamePlayerCount: number;
	playPhase: PlayPhase;
	playMode: PlayMode;
}

export default class PlayTable extends React.PureComponent<PlayTableProps, PlayTableState> {
	constructor(props: PlayTableProps) {
		super(props);

		const { playersInit } = props;

		const players: TablePlayerState[] = playersInit.map((player, p) => {
			const charLocs = this.getStartLocations(p);

			return {
				...player,
				chars: player.chars.map((char, c) => ({
					...char,
					...(charLocs[c]),
					maxHP: char.hp,
				})) as TablePlayerCharacters,
			};
		});

		this.state = {
			players: players,
			newGamePlayerCount: props.playersInit.length,
			playPhase: "buy",
			playMode: null,
		};
	}

	public componentDidUpdate(prevProps: PlayTableProps, prevState: PlayTableState) {
		this.updateMessage(prevState);
	}

	public componentDidMount() {
		this.updateMessage();
	}

	public render(): React.ReactNode {
		const { boardWidth, boardHeight, myPlayerIndex } = this.props;
		const { players, newGamePlayerCount, playPhase } = this.state;

		const me = players[myPlayerIndex];

		return (
			<div className="PlayTable">
				<TableDrawer side="left" forceState={this.isMyTurn() && playPhase === "buy" ? "open" : null}>
					<Rotado angle={-90}>
						<div className="PlayTable__cardPool">
							<CardPool />
						</div>
					</Rotado>
				</TableDrawer>
				<div className="PlayTable__board">
					<Board
						width={boardWidth}
						height={boardHeight}
						players={players} />
				</div>
				<TableDrawer side="bottom">
					<div className="PlayTable__player">
						<div className="PlayTable__player__hand">
							<Hand
								facedown={false}
								cards={me.hand} />
						</div>
						<div className="PlayTable__player__decks">
							<PlayerDecks player={me} />
						</div>
					</div>
				</TableDrawer>
				<TableDrawer side="right">
					<div className="PlayTable__opponentDecks">
						<Rotado angle={90}>
							<div className="PlayTable__opponentDecks__rot">
								{
									players.map((player, index) => {
										if (index === myPlayerIndex) return null;

										const genericLabel = `player ${index + 1}`;
										const label = genericLabel === player.name ?
											genericLabel :
											`${player.name} (${genericLabel})`;

										return <div className="PlayTable__opponentDecks__rot__opp" key={index}>
											<PlayerDecks
												label={label}
												player={player} />
										</div>
									})
								}
							</div>
						</Rotado>
					</div>
				</TableDrawer>
				<div className="PlayTable__newGamePanel">
					<SimpleSelect
						className="PlayTable__newGamePanel__playerCountSelect"
						items={LoopUtils.mapTimes(3, p => p + 2)}
						makeLabel={this.makeNewPlayerCountLabel}
						value={newGamePlayerCount}
						onChange={this.onNewGamePlayerCountChange} />
					<SimpleButton className="PlayTable__newGamePanel__start" onClick={this.resetGame}>start</SimpleButton>
				</div>
			</div>
		)
	}

	private updateMessage(prevState?: Partial<PlayTableState>): void {
		const { gameState } = this.props;
		const { whosTurn, players } = gameState;
		const { playPhase } = this.state;
		prevState = prevState || {};

		if (!this.isMyTurn()) {
			PopMessenger.message(`${players[whosTurn].name}'s turn`);
		} else if (playPhase !== prevState.playPhase) {
			switch (playPhase) {
				case "buy":
					PopMessenger.message("buy a card");
					break;
				case "play":
					PopMessenger.message("play");
					break;
			}
		}
	}

	private isMyTurn(): boolean {
		return this.props.gameState.whosTurn === this.props.myPlayerIndex;
	}

	private getStartLocations(playerIndex: number): [Vector2, Vector2, Vector2] {
		const { boardHeight, boardWidth } = this.props;

		switch (playerIndex) {
			case 0:
				return [
					{ x: 0, y: 0 },
					{ x: 0, y: 1 },
					{ x: 0, y: 2 },
				];
			case 1:
				return [
					{ x: boardWidth - 1, y: boardHeight - 1 },
					{ x: boardWidth - 1, y: boardHeight - 2 },
					{ x: boardWidth - 1, y: boardHeight - 3 },
				];
			case 2:
				return [
					{ x: 0, y: boardHeight - 1 },
					{ x: 1, y: boardHeight - 1 },
					{ x: 2, y: boardHeight - 1 },
				];
			case 3:
				return [
					{ x: boardWidth - 1, y: 0 },
					{ x: boardWidth - 2, y: 0 },
					{ x: boardWidth - 3, y: 0 },
				];
			default:
				throw `Board does not support this many players.  Requested start location for player ${playerIndex + 1},  max player count is 2`;
		}
	}

	private makeNewPlayerCountLabel: SimpleSelectMakeLabel<number> = playerNumber => {
		return `${playerNumber} player${playerNumber === 1 ? "" : "s"}`;
	};

	private onNewGamePlayerCountChange: SimpleSelectChangedHandler<number> = playerCount => {
		this.setState({
			newGamePlayerCount: playerCount,
		});
	};

	private resetGame = () => {
		Server.resetGame(this.state.newGamePlayerCount);
	};
}