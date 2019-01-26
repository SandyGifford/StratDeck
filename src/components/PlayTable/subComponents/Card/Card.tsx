import "./Card.style";

import * as React from "react";
import * as ReactDOM from "react-dom";
import DOMUtils from "../../../../utils/DOMUtils";
import NumberUtils from "../../../../utils/NumberUtils";

export interface CardClickEvent {
	props: CardProps;
	actualX: number;
	actualY: number;
}
export type CardClickEventHandler = (e: CardClickEvent) => void;
export type CardType = "hand" | "weapon" | "ability1" | "ability2" | "ability3";

export interface CardProps {
	onClick?: CardClickEventHandler;
	type: CardType;
	x: number;
	y: number;
	height: number;
	facedown: boolean;
	rotation?: number;
	style?: React.CSSProperties;
	className?: string;
}

export interface CardState { }

export default class Card extends React.PureComponent<CardProps, CardState> {
	constructor(props: CardProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { type, x, y, height, facedown, rotation, className, style } = this.props;

		const baseClassName = DOMUtils.BEMClassName("Card", {
			"facedown": facedown,
		}, type) + " " + className || "";

		const shadowOpacity = NumberUtils.clamp(0.5 - (height * 0.1), 0, 0.5);
		const xScale = facedown ? -1 : 1;

		return (
			<div
				className={baseClassName}
				onClick={this.cardClicked}
				style={{
					left: x,
					top: y,
					transform: `scaleX(${xScale}) rotate(${rotation}deg)`,
					boxShadow: `${10 * height}px ${10 * height}px ${25 * height}px 0 rgba(0, 0, 0, ${shadowOpacity})`,
					...style
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