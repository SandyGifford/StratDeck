import "./CardDisplay.style";

import * as React from "react";
import { CardType } from "@typings/game";
import DOMUtils from "@utils/DOMUtils";
import NumberUtils from "@utils/NumberUtils";

export interface CardClickEvent {
	props: CardDisplayProps;
	actualX: number;
	actualY: number;
}
export type CardClickEventHandler = (e: CardClickEvent) => void;

export interface CardDisplayProps {
	onClick?: CardClickEventHandler;
	type: CardType;
	height: number;
	facedown: boolean;
}

export interface CardDisplayState { }

export default class CardDisplay extends React.PureComponent<CardDisplayProps, CardDisplayState> {
	constructor(props: CardDisplayProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { type, height, facedown } = this.props;

		const baseClassName = DOMUtils.BEMClassName("CardDisplay", {
			"facedown": facedown,
		}, type);

		const shadowOpacity = NumberUtils.clamp(0.5 - (height * 0.1), 0, 0.5);
		const xScale = facedown ? -1 : 1;

		return (
			<div
				className={baseClassName}
				style={{
					transform: `scaleX(${xScale})`,
					boxShadow: `${1 * height}em ${1 * height}em ${2.5 * height}em 0 rgba(0, 0, 0, ${shadowOpacity})`,
				}}
			/>
		)
	}
}