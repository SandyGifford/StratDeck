import "./CardPool.style";

import * as React from "react";
import Deck from "../Deck/Deck";
import { CardType } from "@typings/game";
import { CardClickEventHandler } from "../Card/Card";

export type CardPoolClicked = (cardType: CardType) => void;

export interface CardPoolProps {
	onClick?: CardPoolClicked;
}
export interface CardPoolState { }

export default class CardPool extends React.PureComponent<CardPoolProps, CardPoolState> {
	constructor(props: CardPoolProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		return (
			<div className="CardPool">
				{this.renderDeck("hand", "hand attack", 1)}
				{this.renderDeck("weapon", "weapon attack", 2)}
				{this.renderDeck("ability1", "ability 1", 3)}
				{this.renderDeck("ability2", "ability 2", 4)}
				{this.renderDeck("ability3", "ability 3", 5)}
			</div>
		)
	}

	private renderDeck(cardType: CardType, label: string, cost: number): React.ReactNode {
		return <div className="CardPool__deck">
			<Deck
				label={this.renderDeckLabel(label, cost)}
				onMouseDown={this.makeClickHandler(cardType)}
				topType={cardType}
				facedown={false}
				cardCount={50} />
		</div>
	}

	private renderDeckLabel(text: string, cost: number): React.ReactNode {
		return <div className="CardPool__deck__label">
			<div className="CardPool__deck__label__text">{text}</div>
			<div className="CardPool__deck__label__cost">{cost}</div>
		</div>;
	}

	private makeClickHandler(cardType: CardType): CardClickEventHandler {
		return (e) => {
			const { onClick } = this.props;

			if (onClick) onClick(cardType);
		};
	}
}