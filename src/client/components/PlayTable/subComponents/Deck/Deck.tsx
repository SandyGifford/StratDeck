import "./Deck.style";

import * as React from "react";
import Card, { CardClickEventHandler } from "../Card/Card";
import { CardType } from "@shared/typing/game";
import DOMUtils from "@client/utils/DOMUtils";

export interface DeckProps {
	facedown: boolean;
	onMouseDown?: CardClickEventHandler;
	topType?: CardType;
	cardCount: number;
	label?: React.ReactNode;
	disabled?: boolean;
}
export interface DeckState { }

export default class Deck extends React.PureComponent<DeckProps, DeckState> {
	constructor(props: DeckProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { facedown, topType, cardCount, onMouseDown, label, disabled } = this.props;
		const deckHeight = cardCount / 2;

		const baseClassName = DOMUtils.BEMClassName("Deck", {
			"disabled": disabled,
		});

		const labelEl = label ?
			<div className="Deck__inner__label">{label}</div> : null;

		return (
			<div className={baseClassName}>
				{
					cardCount === 0 ?
						<div className="Deck__empty" /> :
						<div className="Deck__inner">
							<div className="Deck__inner__cards">
								<div className="Deck__inner__cards__card" style={{ top: `${-deckHeight / 10}em` }}>
									<Card
										onClick={onMouseDown}
										facedown={facedown}
										type={topType || "hand"}
										height={0} />
								</div>
								<div className="Deck__inner__cards__fill" style={{ height: `${(deckHeight / 10) + 10}em` }} />
							</div>
						</div>
				}
				{labelEl}
			</div>
		)
	}
}