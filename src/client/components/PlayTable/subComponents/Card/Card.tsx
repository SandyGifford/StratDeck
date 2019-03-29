import "./Card.style";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { ImmutableCardState } from "@typings/game";
import CardArea, { ImmutableCardInfo, CardUpdatedListener } from "../CardArea/CardArea";
import CardDisplay from "../CardDisplay/CardDisplay";

export type CardClickEventHandler = () => void;

export interface CardProps {
	onClick?: CardClickEventHandler;
	card: ImmutableCardState;
	height: number;
	facedown: boolean;
}

interface CardState {
	cardInfo: ImmutableCardInfo;
}

export default class Card extends React.PureComponent<CardProps, CardState> {
	constructor(props: CardProps) {
		super(props);
		this.state = {
			cardInfo: null,
		};
	}

	public componentDidUpdate() {
		const el = (ReactDOM.findDOMNode(this) as HTMLDivElement);
		const { card } = this.props;

		CardArea.cardUpdated(card.get("uid"), card.get("type"), el);
	}

	public componentDidMount() {
		const el = (ReactDOM.findDOMNode(this) as HTMLDivElement);
		const { card } = this.props;
		const uid = card.get("uid");

		CardArea.addCardUpdatedListener(uid, this.cardStockUpdated);
		CardArea.cardUpdated(uid, card.get("type"), el);
	}

	public componentWillUnmount() {
		const { card } = this.props;

		CardArea.removeCardUpdatedListener(card.get("uid"));
	}

	public render(): React.ReactNode {
		const { onClick } = this.props;
		const { cardInfo } = this.state;

		const selfOwned = cardInfo && cardInfo.get("owner") === "self";

		return (
			<div onClick={onClick} className="Card">
				{
					selfOwned ?
						<CardDisplay
							type={cardInfo.get("cardType")}
							height={1}
							facedown={true} /> :
						null
				}
			</div>
		);
	}

	private cardStockUpdated: CardUpdatedListener = cardInfo => {
		this.setState({ cardInfo });
	};
}
