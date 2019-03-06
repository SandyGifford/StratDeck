import "./Card.style";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { ImmutableCardState } from "@typings/game";
import CardArea from "../CardArea/CardArea";

export type CardClickEventHandler = () => void;

export interface CardProps {
	onClick?: CardClickEventHandler;
	card: ImmutableCardState;
	height: number;
	facedown: boolean;
}

interface CardState { }

export default class Card extends React.PureComponent<CardProps, CardState> {
	constructor(props: CardProps) {
		super(props);
		this.state = {};
	}

	public componentDidUpdate() {
		this.updateCard();
	}

	public componentDidMount() {
		this.updateCard();
	}

	public render(): React.ReactNode {
		const { onClick } = this.props;

		return (
			<div onClick={onClick} className="Card" />
		)
	}

	private updateCard() {
		const el = (ReactDOM.findDOMNode(this) as HTMLDivElement);
		const { card } = this.props;

		CardArea.cardUpdated(card.get("uid"), card.get("type"), el);
	}
}
