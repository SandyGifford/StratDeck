import "./Card.style";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { CardType } from "@shared/typing/game";
import DOMUtils from "@client/utils/DOMUtils";
import NumberUtils from "@client/utils/NumberUtils";

export interface CardClickEvent {
	props: CardProps;
	actualX: number;
	actualY: number;
}
export type CardClickEventHandler = (e: CardClickEvent) => void;

export interface CardProps {
	onClick?: CardClickEventHandler;
	type: CardType;
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
		const { type, height, facedown } = this.props;

		const baseClassName = DOMUtils.BEMClassName("Card", {
			"facedown": facedown,
		}, type);

		const shadowOpacity = NumberUtils.clamp(0.5 - (height * 0.1), 0, 0.5);
		const xScale = facedown ? -1 : 1;

		return (
			<div
				className={baseClassName}
				onClick={this.cardClicked}
				style={{
					transform: `scaleX(${xScale})`,
					boxShadow: `${1 * height}em ${1 * height}em ${2.5 * height}em 0 rgba(0, 0, 0, ${shadowOpacity})`,
				}}
			/>
		)
	}

	private cardClicked = () => {
		if (this.props.onClick) {
			const rect = (ReactDOM.findDOMNode(this) as HTMLDivElement).getBoundingClientRect();

			this.props.onClick({
				props: { ...this.props },
				actualX: rect.left,
				actualY: rect.top,
			})
		}
	};
}