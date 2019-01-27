import "./PlayTable.style";

import * as React from "react";
import Deck from "./subComponents/Deck/Deck";
import Board from "./subComponents/Board/Board";
import Hand from "./subComponents/Hand/Hand";
import { PlayerState, TablePlayerState, TablePlayerCharacters } from "../../typings/game";

export interface PlayTableProps {
	p1: PlayerState;
	p2: PlayerState;
	boardWidth: number;
	boardHeight: number;
}
export interface PlayTableState {
	p1: TablePlayerState;
	p2: TablePlayerState;
}

export default class PlayTable extends React.PureComponent<PlayTableProps, PlayTableState> {
	constructor(props: PlayTableProps) {
		super(props);

		const { p1, p2, boardHeight, boardWidth } = props;

		const p1TableChars: TablePlayerCharacters = [null, null, null];
		const p2TableChars: TablePlayerCharacters = [null, null, null];

		p1.chars.forEach((char, index) => p1TableChars[index] = {
			...char,
			x: 0,
			y: index,
			maxHP: char.hp
		});

		p2.chars.forEach((char, index) => p2TableChars[index] = {
			...char,
			x: boardWidth - 1,
			y: boardHeight - 1 - index,
			maxHP: char.hp
		});

		this.state = {
			p1: {
				chars: p1TableChars,
			},
			p2: {
				chars: p2TableChars,
			}
		};
	}

	public render(): React.ReactNode {
		const { boardWidth, boardHeight } = this.props;
		const { p1, p2 } = this.state;

		return (
			<div className="PlayTable">
				<div className="PlayTable__decks">
					<Deck className="PlayTable__decks__deck" label={this.renderDeckLabel("hand attack", 1)} topType="hand" facedown={false} cardCount={50} />
					<Deck className="PlayTable__decks__deck" label={this.renderDeckLabel("weapon attack", 2)} topType="weapon" facedown={false} cardCount={50} />
					<Deck className="PlayTable__decks__deck" label={this.renderDeckLabel("ability 1", 3)} topType="ability1" facedown={false} cardCount={50} />
					<Deck className="PlayTable__decks__deck" label={this.renderDeckLabel("ability 2", 4)} topType="ability2" facedown={false} cardCount={50} />
					<Deck className="PlayTable__decks__deck" label={this.renderDeckLabel("ability 3", 5)} topType="ability3" facedown={false} cardCount={50} />
				</div>
				<div className="PlayTable__board">
					<Board
						width={boardWidth}
						height={boardHeight}
						p1={p1}
						p2={p2} />
				</div>
				<div className="PlayTable__player">
					<div className="PlayTable__player__hand">
						<Hand
							facedown={false}
							cards={["hand", "hand", "ability1"]} />
					</div>
					<div className="PlayTable__player__decks">
						<Deck
							label="deck"
							className="PlayTable__player__decks__deck"
							facedown={true}
							cardCount={100} />
						<Deck
							label="discard"
							className="PlayTable__player__decks__deck"
							facedown={false}
							cardCount={100} />
					</div>
				</div>
				<div className="PlayTable__opponent">
					<div className="PlayTable__opponent__hand">
						<Hand
							facedown={true}
							cards={["hand", "hand", "ability1"]} />
					</div>
					<div className="PlayTable__opponent__decks">
						<Deck
							label="deck"
							className="PlayTable__opponent__decks__deck"
							facedown={true}
							cardCount={100} />
						<Deck
							label="discard"
							className="PlayTable__opponent__decks__deck"
							facedown={true}
							cardCount={100} />
					</div>
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
}