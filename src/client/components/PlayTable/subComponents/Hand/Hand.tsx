import "./Hand.style";

import * as React from "react";
import { ImmutableDeckState } from "@typings/game";
import Card from "../Card/Card";

export interface HandProps {
	cards: ImmutableDeckState;
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
					cards.map(card => <div key={card.get("uid")} className="Hand__card">
						<Card
							card={card}
							facedown={facedown}
							height={0.1}
						/>
					</div>)
				}
			</div>
		)
	}
}