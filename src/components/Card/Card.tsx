import "./Card.style";

import * as React from "react";
import DOMUtils from "../../utils/DOMUtils";
import NumberUtils from "../../utils/NumberUtils";

export type CardType = "hand" | "weapon" | "ability1" | "ability2" | "ability3";

export interface CardProps {
	type: CardType;
	x: number;
	y: number;
	height: number;
	facedown: boolean;
}

export interface CardState { }

export default class Card extends React.PureComponent<CardProps, CardState> {
	constructor(props: CardProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { type, x, y, height, facedown } = this.props;

		const className = DOMUtils.BEMClassName("Card", {
			"facedown": facedown,
		}, type);

		const shadowOpacity = NumberUtils.clamp(0.5 - (height * 0.1), 0, 0.5);

		return (
			<div className={className} style={{
				left: x,
				top: y,
				boxShadow: `${10 * height}px ${10 * height}px ${25 * height}px 0 rgba(0, 0, 0, ${shadowOpacity})`
			}} />
		)
	}
}