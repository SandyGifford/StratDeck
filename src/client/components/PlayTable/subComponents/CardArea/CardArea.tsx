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

(window as any).i = Immutable

export interface CardAreaProps {

}
export interface CardAreaState {
	cardStock: ImmutableCardStock;
}

type CardOwner = "self" | "area";

interface CardInfo {
	parent: HTMLElement;
	cardType: CardType;
	fromPos: Vector2;
	toPos: Vector2;
	isIn: boolean;
	owner: CardOwner;
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
						const isIn = cardInfo.get("isIn");
						const cardType = cardInfo.get("cardType");
						const pos = isIn ? cardInfo.get("fromPos") : cardInfo.get("toPos");
						const style = pos ? {
							top: pos.get("y"),
							left: pos.get("x"),
						} : null;
						console.log("rendering");
						return <Transition
							key={uid}
							onEnter={() => console.log("Enter")}
							onEntered={() => console.log("Entered")}
							onEntering={() => console.log("Entering")}
							onExit={() => console.log("Exit")}
							onExited={() => console.log("Exited")}
							onExiting={() => console.log("Exiting")}
							timeout={300}
							appear>
							<div
								className="CardArea__cardWrapper"
								style={style}>
								<CardDisplay
									type={cardType}
									height={1}
									facedown={true} />
							</div>
						</Transition>
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
			fromPos: null,
			toPos: null,
			isIn: false,
			owner: "self",
		} as CardInfo));

		const parent = element.parentElement;
		const currentParent = currentInfo.get("parent");

		if (currentParent !== parent) {
			const rect = element.getBoundingClientRect();
			const oldTo = currentInfo.get("toPos");

			const newInfo: CardInfo = {
				cardType,
				parent,
				fromPos: oldTo ? { x: oldTo.get("x"), y: oldTo.get("y") } : null,
				toPos: { x: rect.left, y: rect.right },
				isIn: !oldTo,
				owner: "area",
			};

			this.cardStock = this.cardStock.set(uid, Immutable.fromJS(newInfo));
			this.updatedListener.trigger(this.cardStock);
		}
	}
}