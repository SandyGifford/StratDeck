import "./Hand.style";

import * as React from "react";
import { CardType } from "@typings/game";
import Card from "../Card/Card";

export interface HandProps {
	cards: CardType[];
	facedown: boolean;
}
export interface HandState { }

export default class Hand extends React.PureComponent<HandProps, HandState> {
	constructor(props: HandProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { cards, facedown } = this.props;

		return (
			<div className="Hand">
				{
					cards.map((cardType, index) => <div key={index} className="Hand__Card">
						<Card
							type={cardType}
							facedown={facedown}
							height={0.1}
						/>
					</div>)
				}
			</div>
		)
	}
}