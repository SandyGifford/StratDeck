import "./PlayTable.style";

import * as React from "react";
import Deck from "./subComponents/Deck/Deck";
import Board from "./subComponents/Board/Board";
import Hand from "./subComponents/Hand/Hand";
import { PlayerState, TablePlayerState, TablePlayerCharacters } from "../../typings/game";
import { Vector2 } from "../../typings/vector";
import PlayerDecks from "./subComponents/PlayerDecks/PlayerDecks";
import LoopUtils from "../../utils/LoopUtils";
import Server from "../../connection/Server";
import SimpleSelect, { SimpleSelectChangedHandler, SimpleSelectMakeLabel } from "../SimpleSelect/SimpleSelect";
import SimpleButton from "../SimpleButton/SimpleButton";

export interface PlayTableProps {
	playersInit: PlayerState[];
	boardWidth: number;
	boardHeight: number;
	myPlayerIndex: number;
}
export interface PlayTableState {
	players: TablePlayerState[];
	newGamePlayerCount: number;
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
			}
		});

		this.state = {
			players: players,
			newGamePlayerCount: props.playersInit.length,
		};
	}

	public render(): React.ReactNode {
		const { boardWidth, boardHeight, myPlayerIndex } = this.props;
		const { players, newGamePlayerCount } = this.state;

		const me = players[myPlayerIndex];

		return (
			<div className="PlayTable">
				<div className="PlayTable__decks">
					<div className="PlayTable__decks__deck">
						<Deck label={this.renderDeckLabel("hand attack", 1)} topType="hand" facedown={false} cardCount={50} />
					</div>
					<div className="PlayTable__decks__deck">
						<Deck label={this.renderDeckLabel("weapon attack", 2)} topType="weapon" facedown={false} cardCount={50} />
					</div>
					<div className="PlayTable__decks__deck">
						<Deck label={this.renderDeckLabel("ability 1", 3)} topType="ability1" facedown={false} cardCount={50} />
					</div>
					<div className="PlayTable__decks__deck">
						<Deck label={this.renderDeckLabel("ability 2", 4)} topType="ability2" facedown={false} cardCount={50} />
					</div>
					<div className="PlayTable__decks__deck">
						<Deck label={this.renderDeckLabel("ability 3", 5)} topType="ability3" facedown={false} cardCount={50} />
					</div>
				</div>
				<div className="PlayTable__board">
					<Board
						width={boardWidth}
						height={boardHeight}
						players={players} />
				</div>
				<div className="PlayTable__player">
					<div className="PlayTable__player__hand">
						<Hand
							facedown={false}
							cards={me.hand} />
					</div>
					<div className="PlayTable__player__decks">
						<PlayerDecks
							deckCount={me.deck.length}
							discardCount={me.discard.length}
							topDiscardType="hand" />
					</div>
				</div>
				<div className="PlayTable__opponentDecks">
					{
						players.map((player, index) => {
							if (index === 0) return null;

							return <div className="PlayTable__opponentDecks__opp" key={index}>
								<PlayerDecks
									label={`${player.name} (player ${index + 1})`}
									deckCount={player.deck.length}
									discardCount={player.discard.length}
									topDiscardType="weapon" />
							</div>
						})
					}
				</div>
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

	private renderDeckLabel(text: string, cost: number): React.ReactNode {
		return <div className="PlayTable__decks__deck__label">
			<div className="PlayTable__decks__deck__label__text">{text}</div>
			<div className="PlayTable__decks__deck__label__cost">{cost}</div>
		</div>;
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