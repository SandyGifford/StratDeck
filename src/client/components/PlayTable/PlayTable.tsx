import "./PlayTable.style";

import * as React from "react";
import { ImmutableGameState } from "@typings/game";
import TableDrawer, { TableDrawerOpenState } from "@components/TableDrawer/TableDrawer";
import Rotado from "@components/Rotado/Rotado";
import CardPool, { CardPoolClicked } from "./subComponents/CardPool/CardPool";
import Board from "./subComponents/Board/Board";
import Hand from "./subComponents/Hand/Hand";
import PlayerDecks from "./subComponents/PlayerDecks/PlayerDecks";
import SimpleSelect, { SimpleSelectMakeLabel, SimpleSelectChangedHandler } from "@components/SimpleSelect/SimpleSelect";
import LoopUtils from "@utils/LoopUtils";
import SimpleButton from "@components/SimpleButton/SimpleButton";
import PopMessenger from "@components/PopMessage/PopMessenger";
import ServerConnect from "@client/connection/ServerConnect";

export interface PlayTableProps {
	gameState: ImmutableGameState;
	myPlayerIndex: number;
}
export interface PlayTableState {
	newGamePlayerCount: number;
}

export default class PlayTable extends React.PureComponent<PlayTableProps, PlayTableState> {
	constructor(props: PlayTableProps) {
		super(props);

		this.state = {
			newGamePlayerCount: props.gameState.get("playerCount"),
		};
	}

	public componentDidUpdate(prevProps: PlayTableProps) {
		this.updateMessage(prevProps);
	}

	public componentDidMount() {
		this.updateMessage();
	}

	public render(): React.ReactNode {
		const { myPlayerIndex, gameState } = this.props;
		const { newGamePlayerCount } = this.state;
		const boardWidth = gameState.get("boardWidth");
		const boardHeight = gameState.get("boardHeight");
		const players = gameState.get("players");
		const playPhase = gameState.get("playPhase");

		const me = players.get(myPlayerIndex);
		const poolOpen: TableDrawerOpenState = this.isMyTurn() && playPhase === "buy" ? "open" : null;

		return (
			<div className="PlayTable">
				<TableDrawer side="left" forceState={poolOpen}>
					<Rotado angle={-90} watchResize={true}>
						<div className="PlayTable__cardPool">
							<CardPool onClick={this.poolClicked} />
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
								cards={me.get("hand")} />
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

										const playerName = player.get("name");
										const genericLabel = `player ${index + 1}`;
										const label = genericLabel === playerName ?
											genericLabel :
											`${playerName} (${genericLabel})`;

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

	private poolClicked: CardPoolClicked = (cardType) => {
		if (this.isMyTurn()) {
			ServerConnect.buyCard(cardType);
		}
	};

	private updateMessage(prevProps: Partial<PlayTableProps> = {}): void {
		const { gameState } = this.props;
		const { gameState: prevGameState } = prevProps;

		const whosTurn = gameState.get("whosTurn");
		const players = gameState.get("players");
		const playPhase = gameState.get("playPhase");

		const prevPlayPhase = prevGameState ? prevGameState.get("playPhase") : null;

		if (!this.isMyTurn()) {
			PopMessenger.message(`${players.get(whosTurn).get("name")}'s turn`);
		} else if (playPhase !== prevPlayPhase) {
			switch (playPhase) {
				case "buy":
					PopMessenger.message("buy a card");
					break;
				case "move":
					PopMessenger.message("move your characters");
					break;
			}
		}
	}

	private isMyTurn(): boolean {
		return this.props.gameState.get("whosTurn") === this.props.myPlayerIndex;
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
		ServerConnect.resetGame(this.state.newGamePlayerCount);
	};
}