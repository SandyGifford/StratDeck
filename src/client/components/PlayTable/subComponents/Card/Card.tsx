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

	public render(): React.ReactNode {
		const { onClick } = this.props;

		return (
			<div onClick={onClick} className="Card" />
		)
	}

	public componentDidUpdate() {
		const el = (ReactDOM.findDOMNode(this) as HTMLDivElement);
		const parent = el ? el.parentElement : null;

		CardArea.cardUpdated(this.props.card.get("uid"), parent);
	}
}
