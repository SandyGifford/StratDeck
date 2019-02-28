import * as Immutable from "immutable";

import { CardType, ImmutableCardTypes } from "@typings/game";

export type MaybeMultiCard = ImmutableCardTypes | CardType;
export type FromDeckToDeck = { fromDeck: ImmutableCardTypes, toDeck: ImmutableCardTypes };
export type DealtCards = { deck: ImmutableCardTypes, dealt: ImmutableCardTypes };

export default class DeckUtils {
	public static dealAllCardsToDeck(fromDeck: ImmutableCardTypes, toDeck: ImmutableCardTypes): FromDeckToDeck {
		return this.dealCardsToDeck(fromDeck, toDeck, fromDeck.size);
	}

	public static dealCardsToDeck(fromDeck: ImmutableCardTypes, toDeck: ImmutableCardTypes, cardCount: number): FromDeckToDeck {
		const dealtCards = DeckUtils.dealCards(fromDeck, cardCount);
		const newToDeck = this.addCardsToTop(toDeck, dealtCards.dealt);
		return { fromDeck: dealtCards.deck, toDeck: newToDeck };
	}

	public static dealCards(deck: ImmutableCardTypes, cardCount: number): DealtCards {
		return {
			deck: deck.slice(0, -cardCount),
			dealt: deck.slice(-cardCount),
		};
	}

	public static addCardsToTop(deck: ImmutableCardTypes, cards: MaybeMultiCard): ImmutableCardTypes {
		const multiCards = typeof cards === "string" ? Immutable.fromJS([cards]) as ImmutableCardTypes : cards;
		return deck.concat(multiCards);
	}

	public static addCardsToBottom(deck: ImmutableCardTypes, cards: MaybeMultiCard): ImmutableCardTypes {
		const multiCards = typeof cards === "string" ? Immutable.fromJS([cards]) as ImmutableCardTypes : cards;
		return multiCards.concat(deck);
	}
}