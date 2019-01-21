import "./Deck.style";

import * as React from "react";
import Card, { CardType, CardClickEventHandler } from "../Card/Card";
import DOMUtils from "../../utils/DOMUtils";

export interface DeckProps {
	facedown: boolean;
	onClick?: CardClickEventHandler;
	topType?: CardType;
	cardCount: number;
	rotation?: number;
	style?: React.CSSProperties;
	className?: string;
	label?: React.ReactNode;
	disabled?: boolean;
}
export interface DeckState { }

export default class Deck extends React.PureComponent<DeckProps, DeckState> {
	constructor(props: DeckProps) {
		super(props);
		this.state = {};
	}

	public render(): React.ReactNode {
		const { facedown, topType, cardCount, onClick, rotation, style, className, label, disabled } = this.props;
		const height = cardCount / 2;

		const baseClassName = DOMUtils.BEMClassName("Deck", {
			"disabled": disabled,
		}) + " " + (className || "");

		return (
			<div className={baseClassName} style={{
				transform: `rotate(${rotation}deg)`,
				...style,
			}}>
				<div className="Deck__inner">
					<div className="Deck__inner__cards">
						<Card
							className="Deck__inner__cards__card"
							x={0}
							y={-height}
							onClick={onClick}
							facedown={facedown}
							type={topType || "hand"}
							height={0} />
						<div className="Deck__inner__cards__fill" style={{ height: height + 10 }} />
					</div>
					{
						label ?
							<div className="Deck__inner__label">{label}</div> : null
					}
				</div>
			</div>
		)
	}
}