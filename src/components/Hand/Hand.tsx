import "./Hand.style";

import * as React from "react";
import Card, { CardType } from "../Card/Card";

export interface HandProps {
	cards: CardType[];
}
export interface HandState { }

export default class Hand extends React.PureComponent<HandProps, HandState> {
	private static readonly CARD_SEPARATION = 100;

	constructor(props: HandProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { cards } = this.props;

		const cardOffset = Hand.CARD_SEPARATION * cards.length / 2;

		return (
			<div className="Hand">
				{
					cards.map((cardType, index) => <Card
						key={index}
						type={cardType}
						x={Hand.CARD_SEPARATION * index - cardOffset}
						y={-150}
						facedown={false}
						height={0.1}
					/>)
				}
			</div>
		)
	}
}