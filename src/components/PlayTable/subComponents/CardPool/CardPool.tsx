import "./CardPool.style";

import * as React from "react";
import Deck from "../Deck/Deck";

export interface CardPoolProps { }
export interface CardPoolState { }

export default class CardPool extends React.PureComponent<CardPoolProps, CardPoolState> {
	constructor(props: CardPoolProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div className="CardPool">
				<div className="CardPool__deck">
					<Deck
						label={this.renderDeckLabel("hand attack", 1)}
						topType="hand"
						facedown={false}
						cardCount={50} />
				</div>
				<div className="CardPool__deck">
					<Deck
						label={this.renderDeckLabel("weapon attack", 2)}
						topType="weapon"
						facedown={false}
						cardCount={50} />
				</div>
				<div className="CardPool__deck">
					<Deck
						label={this.renderDeckLabel("ability 1", 3)}
						topType="ability1"
						facedown={false}
						cardCount={50} />
				</div>
				<div className="CardPool__deck">
					<Deck
						label={this.renderDeckLabel("ability 2", 4)}
						topType="ability2"
						facedown={false}
						cardCount={50} />
				</div>
				<div className="CardPool__deck">
					<Deck
						label={this.renderDeckLabel("ability 3", 5)}
						topType="ability3"
						facedown={false}
						cardCount={50} />
				</div>
			</div>
		)
	}

	private renderDeckLabel(text: string, cost: number): React.ReactNode {
		return <div className="CardPool__deck__label">
			<div className="CardPool__deck__label__text">{text}</div>
			<div className="CardPool__deck__label__cost">{cost}</div>
		</div>;
	}
}