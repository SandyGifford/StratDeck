import "./PlayTable.style";

import * as React from "react";
import Deck from "./subComponents/Deck/Deck";
import Board from "./subComponents/Board/Board";
import Hand from "./subComponents/Hand/Hand";
import TableCharacterDef, { PlayerState, TablePlayerState, TablePlayerCharacters } from "../../typings/game";
import { Vector2 } from "../../typings/vector";
import PlayerDecks from "./subComponents/PlayerDecks/PlayerDecks";

export interface PlayTableProps {
	playersInit: PlayerState[];
	boardWidth: number;
	boardHeight: number;
}
export interface PlayTableState {
	players: TablePlayerState[];
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
				})) as TablePlayerCharacters
			}
		});

		this.state = {
			players: players,
		};
	}

	public render(): React.ReactNode {
		const { boardWidth, boardHeight } = this.props;
		const { players } = this.state;

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
							cards={["hand", "hand", "ability1"]} />
					</div>
					<div className="PlayTable__player__decks">
						<PlayerDecks
							deckCount={100}
							discardCount={100}
							topDiscardType="hand" />
					</div>
				</div>
				<div className="PlayTable__opponentDecks">
					{
						players.map((player, index) => {
							if (index === 0) return null;

							return <div className="PlayTable__opponentDecks_opp" key={index}>
								<PlayerDecks
									deckCount={100}
									discardCount={100}
									topDiscardType="weapon" />
							</div>
						})
					}
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
			default:
				throw `Board does not support this many players.  Requested start location for player ${playerIndex + 1},  max player count is 2`;
		}
	}
}