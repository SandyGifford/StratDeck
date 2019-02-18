import "./DeckDeck.style";

import * as React from "react";
import { CardClickEventHandler } from "../Card/Card";
import { CardType } from "@shared/typing/game";
import Deck from "../Deck/Deck";

export interface DeckDeckProps {
	facedown: boolean;
	onMouseDown?: CardClickEventHandler;
	deck: CardType[];
	label?: React.ReactNode;
	disabled?: boolean;
}
export interface DeckDeckState { }

export default class DeckDeck extends React.PureComponent<DeckDeckProps, DeckDeckState> {
	constructor(props: DeckDeckProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { deck, ...otherProps } = this.props;

		return (
			<Deck
				cardCount={deck.length}
				topType={deck[deck.length - 1]}
				{...otherProps} />
		)
	}
}