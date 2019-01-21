import "./Deck.style";

import * as React from "react";
import Card, { CardType, CardClickEventHandler } from "../Card/Card";

export interface DeckProps {
	facedown: boolean;
	onClick?: CardClickEventHandler;
	topType?: CardType;
	x: number;
	y: number;
	cardCount: number;
	rotation?: number;
}
export interface DeckState { }

export default class Deck extends React.PureComponent<DeckProps, DeckState> {
	constructor(props: DeckProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { x, y, facedown, topType, cardCount, onClick, rotation } = this.props;
		const height = cardCount / 2;

		return (
			<div className="Deck" style={{
				left: x,
				top: y,
				transform: `rotate(${rotation}deg)`
			}}>
				<Card
					x={0}
					y={-height}
					onClick={onClick}
					facedown={facedown}
					type={topType || "hand"}
					height={0} />
				<div className="Deck__fill" style={{ height: height + 10 }} />
			</div>
		)
	}
}