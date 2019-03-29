import "./CardArea.style";

import * as Immutable from "immutable";
import * as React from "react";
import Transition from 'react-transition-group/Transition';
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import Immutalizer from "@typings/immutalizer";
import ImmutableUtils from "@utils/ImmutableUtils";
import { CardType } from "@typings/game";
import CardDisplay from "../CardDisplay/CardDisplay";
import { Vector2 } from "@typings/vector";
import KeyedEventDelegate from "@utils/KeyedEventDelegate";

export interface CardAreaProps {

}
export interface CardAreaState {
	cardStock: ImmutableCardStock;
}

type CardOwner = "self" | "area";

export interface CardInfo {
	parent: HTMLElement;
	cardType: CardType;
	position: Vector2;
	owner: CardOwner;
}
export type ImmutableCardInfo = Immutalizer<CardInfo>;

type CardStock = { [uid: string]: CardInfo };
type ImmutableCardStock = Immutalizer<CardStock>;
type StockUpdatedListener = GenericEventListener<ImmutableCardStock>;
export type CardUpdatedListener = GenericEventListener<ImmutableCardInfo>;

export default class CardArea extends React.PureComponent<CardAreaProps, CardAreaState> {
	// TODO: not a huge fan of storing this both statically and per instance
	private static cardStock: ImmutableCardStock = ImmutableUtils.emptyMap();
	private static stockUpdatedDelegate = new EventDelegate<ImmutableCardStock>();
	private static cardUpdatedDelegates = new KeyedEventDelegate<ImmutableCardInfo>();
	private static cardRefs: { [uid: string]: React.RefObject<HTMLDivElement> } = {};

	constructor(props: CardAreaProps) {
		super(props);
		this.state = {
			cardStock: ImmutableUtils.emptyMap(),
		};
	}

	public componentDidMount() {
		CardArea.addStockUpdatedListener(this.cardStoreUpdated);
		this.setState({
			cardStock: CardArea.cardStock,
		});
	}

	public componentWillUnmount() {
		CardArea.removeStockUpdatedListener(this.cardStoreUpdated);
	}

	public render(): React.ReactNode {
		const { cardStock } = this.state;


		return (
			<div className="CardArea">
				{
					// TODO: figure out why uid wants to type as "React.Key"
					ImmutableUtils.plainMap(cardStock, (cardInfo, uid: string) => {
						const owner = cardInfo.get("owner");
						const ownedByArea = owner === "area";

						const cardType = cardInfo.get("cardType");
						const position = cardInfo.get("position");
						const style = position ? {
							top: position.get("y"),
							left: position.get("x"),
						} : null;

						return <Transition
							key={uid}
							in={ownedByArea}
							onEntered={() => CardArea.endMovement(uid)}
							timeout={1000}
							appear>
							<div
								className="CardArea__cardWrapper"
								style={style}
								ref={CardArea.cardRefs[uid]}>
								{
									ownedByArea ?
										<CardDisplay
											type={cardType}
											height={1}
											facedown={true} /> :
										null
								}
							</div>
						</Transition>
					})
				}
			</div>
		)
	}

	protected static addStockUpdatedListener(listener: StockUpdatedListener): void {
		this.stockUpdatedDelegate.addEventListener(listener);
	}

	protected static removeStockUpdatedListener(listener: StockUpdatedListener): void {
		this.stockUpdatedDelegate.removeEventListener(listener);
	}


	public static addCardUpdatedListener(uid: string, listener: CardUpdatedListener): void {
		this.cardUpdatedDelegates.addEventListener(listener, uid);
	}

	public static removeCardUpdatedListener(uid: string): void {
		this.cardUpdatedDelegates.removeEventListener(uid);
	}

	private cardStoreUpdated: StockUpdatedListener = (cardStock) => {
		this.setState({ cardStock })
	};

	public static cardUpdated(uid: string, cardType: CardType, element: HTMLDivElement): void {
		let cardInfo = this.cardStock.get(uid);

		if (cardInfo) this.updateCard(uid, element);
		else this.addCard(uid, cardType, element);
	}

	private static endMovement(uid: string): void {
		let cardInfo = this.cardStock.get(uid);
		const wrapperRect = this.getWrapperRect(uid);

		cardInfo = cardInfo.set("position", Immutable.fromJS({ x: wrapperRect.left, y: wrapperRect.top }));
		cardInfo = cardInfo.set("owner", "self");

		this.updateCardStock(uid, cardInfo);
	}

	private static updateCard(uid: string, cardElement: HTMLElement): void {
		let cardInfo = this.cardStock.get(uid);

		const newParent = cardElement.parentElement;
		const currentParent = cardInfo.get("parent");

		if (currentParent !== newParent) {
			const rect = cardElement.getBoundingClientRect();

			cardInfo = cardInfo.set("position", Immutable.fromJS({ x: rect.left, y: rect.top }));
			cardInfo = cardInfo.set("parent", newParent);
			cardInfo = cardInfo.set("owner", "area");

			this.updateCardStock(uid, cardInfo);
		}
	}

	private static getWrapperRect(uid: string): ClientRect {
		const wrapper = this.cardRefs[uid].current;
		return wrapper.getBoundingClientRect();
	}

	private static addCard(uid: string, cardType: CardType, element: HTMLElement): void {
		const rect = element.getBoundingClientRect();

		const cardInfo = Immutable.fromJS({
			cardType,
			parent: element.parentElement,
			fromPos: { x: rect.left, y: rect.top },
			position: { x: rect.left, y: rect.top },
			owner: "self",
		} as CardInfo);

		this.cardRefs[uid] = React.createRef();

		this.updateCardStock(uid, cardInfo);
	}

	private static updateCardStock(uid: string, cardInfo: ImmutableCardInfo): void {
		this.cardStock = this.cardStock.set(uid, cardInfo);
		this.stockUpdatedDelegate.trigger(this.cardStock);
		this.cardUpdatedDelegates.trigger(uid, cardInfo);
	}
}