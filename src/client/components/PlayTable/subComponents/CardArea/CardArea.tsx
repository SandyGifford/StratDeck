import "./CardArea.style";

import * as Immutable from "immutable";
import * as React from "react";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import Immutalizer from "@typings/immutalizer";
import ImmutableUtils from "@utils/ImmutableUtils";
import { CardType } from "@typings/game";
import CardDisplay from "../CardDisplay/CardDisplay";
import { Vector2 } from "@typings/vector";

export interface CardAreaProps {

}
export interface CardAreaState {
	cardStock: ImmutableCardStock;
}

interface CardInfo {
	parent: HTMLElement;
	cardType: CardType;
	animating: boolean;
	pos: Vector2;
}
type CardStock = { [uid: string]: CardInfo };
type ImmutableCardStock = Immutalizer<CardStock>;
type CardUpdatedListener = GenericEventListener<ImmutableCardStock>;

export default class CardArea extends React.PureComponent<CardAreaProps, CardAreaState> {
	// TODO: not a huge fan of storing this both statically and per instance
	private static cardStock: ImmutableCardStock = ImmutableUtils.emptyMap();
	private static updatedListener = new EventDelegate<ImmutableCardStock>();

	constructor(props: CardAreaProps) {
		super(props);
		this.state = {
			cardStock: ImmutableUtils.emptyMap(),
		};
	}

	public componentDidMount() {
		CardArea.addUpdatedListener(this.cardStoreUpdated);
		this.setState({
			cardStock: CardArea.cardStock,
		});
	}

	public componentWillUnmount() {
		CardArea.removeUpdatedListener(this.cardStoreUpdated);
	}

	public render(): React.ReactNode {
		const { cardStock } = this.state;

		return (
			<div className="CardArea">
				{
					ImmutableUtils.plainMap(cardStock, (cardInfo, uid) => {
						const cardType = cardInfo.get("cardType");
						const pos = cardInfo.get("pos");
						const parent = cardInfo.get("parent");

						return <div
							className="CardArea__cardWrapper"
							style={{
								top: pos.get("y"),
								left: pos.get("x"),
							}}
							key={uid}>
							{parent.parentElement.parentElement.parentElement.parentElement.className}
							<CardDisplay
								type={cardType}
								height={1}
								facedown={true} />
						</div>
					})
				}
			</div>
		)
	}

	private cardStoreUpdated: CardUpdatedListener = (cardStock) => {
		console.log("updating");
		this.setState({ cardStock })
	};

	public static addUpdatedListener(listener: CardUpdatedListener): void {
		this.updatedListener.addEventListener(listener);
	}

	public static removeUpdatedListener(listener: CardUpdatedListener): void {
		this.updatedListener.removeEventListener(listener);
	}

	public static cardUpdated(uid: string, cardType: CardType, element: HTMLDivElement): void {
		const currentInfo = this.cardStock.get(uid, Immutable.fromJS({
			cardType,
			parent: null,
			animating: false,
			pos: {
				x: null,
				y: null,
			},
		}));

		const parent = element.parentElement;
		const rect = element.getBoundingClientRect();
		let animating = false;
		if (currentInfo.get("parent") !== parent) animating = true;

		const newInfo: CardInfo = {
			cardType,
			parent,
			animating,
			pos: {
				x: rect.left,
				y: rect.top,
			},
		};

		this.cardStock = this.cardStock.set(uid, Immutable.fromJS(newInfo));
		console.log("triggering");
		this.updatedListener.trigger(this.cardStock);
	}
}