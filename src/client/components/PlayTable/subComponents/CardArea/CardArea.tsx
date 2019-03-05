import "./CardArea.style";

import * as Immutable from "immutable";
import * as React from "react";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import Immutalizer from "@typings/immutalizer";
import ImmutableUtils from "@utils/ImmutableUtils";

export interface CardAreaProps { }
export interface CardAreaState {
	cardStock: CardStock;
}


interface CardInfo {
	parent: HTMLElement;
}
type CardStock = { [uid: string]: CardInfo };
type ImmutableCardStock = Immutalizer<CardStock>;
type CardUpdatedListener = GenericEventListener<CardStock>;

export default class CardArea extends React.PureComponent<CardAreaProps, CardAreaState> {
	// TODO: not a huge fan of storing this both statically and per instance
	private static cardStock: ImmutableCardStock = ImmutableUtils.emptyMap();
	private static updatedListener = new EventDelegate<CardStock>();

	constructor(props: CardAreaProps) {
		super(props);
		this.state = {
			cardStock: {},
		};
	}

	public componentDidMount() {
		CardArea.addUpdatedListener(this.cardStoreUpdated);
	}

	public componentWillUnmount() {
		CardArea.removeUpdatedListener(this.cardStoreUpdated);
	}

	public render(): React.ReactNode {
		return (
			<div className="CardArea"></div>
		)
	}

	private cardStoreUpdated: CardUpdatedListener = () => {

	};

	public static addUpdatedListener(listener: CardUpdatedListener): void {
		this.updatedListener.addEventListener(listener);
	}

	public static removeUpdatedListener(listener: CardUpdatedListener): void {
		this.updatedListener.removeEventListener(listener);
	}

	public static cardUpdated(uid: string, parent: HTMLElement): void {
		const currentInfo = this.cardStock.get(uid);
		if (currentInfo.get("parent") !== parent) console.log("do thing");

		const newInfo: CardInfo = {
			parent: parent,
		};

		this.cardStock = this.cardStock.set(uid, Immutable.fromJS(newInfo));
	}
}