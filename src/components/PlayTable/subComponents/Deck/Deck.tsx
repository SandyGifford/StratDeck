import "./Deck.style";

import * as React from "react";
import Card, { CardType, CardClickEventHandler } from "../Card/Card";
import DOMUtils from "../../../../utils/DOMUtils";

export interface DeckProps {
	facedown: boolean;
	onMouseDown?: CardClickEventHandler;
	topType?: CardType;
	cardCount: number;
	rotation?: number;
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
		const { facedown, topType, cardCount, onMouseDown, rotation, label, disabled } = this.props;
		const deckHeight = cardCount / 2;

		const baseClassName = DOMUtils.BEMClassName("Deck", {
			"disabled": disabled,
		});

		return (
			<div className={baseClassName} style={{
				transform: `rotate(${rotation}deg)`,
			}}>
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
							{
								label ?
									<div className="Deck__inner__label">{label}</div> : null
							}
						</div>
				}
			</div>
		)
	}
}