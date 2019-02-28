import { ImmutableDeckState } from "@typings/game";

export type FromDeckToDeck = { fromDeck: ImmutableDeckState, toDeck: ImmutableDeckState };
export type DealtCards = { deck: ImmutableDeckState, dealt: ImmutableDeckState };

export default class DeckUtils {
	public static dealAllCardsToDeck(fromDeck: ImmutableDeckState, toDeck: ImmutableDeckState): FromDeckToDeck {
		return this.dealCardsToDeck(fromDeck, toDeck, fromDeck.size);
	}

	public static dealCardsToDeck(fromDeck: ImmutableDeckState, toDeck: ImmutableDeckState, cardCount: number): FromDeckToDeck {
		const dealtCards = DeckUtils.dealCards(fromDeck, cardCount);
		const newToDeck = this.addCardsToTop(toDeck, dealtCards.dealt);
		return { fromDeck: dealtCards.deck, toDeck: newToDeck };
	}

	public static dealCards(deck: ImmutableDeckState, cardCount: number): DealtCards {
		return {
			deck: deck.slice(0, -cardCount),
			dealt: deck.slice(-cardCount),
		};
	}

	public static addCardsToTop(deck: ImmutableDeckState, cards: ImmutableDeckState): ImmutableDeckState {
		return deck.concat(cards);
	}

	public static addCardsToBottom(deck: ImmutableDeckState, cards: ImmutableDeckState): ImmutableDeckState {
		return cards.concat(deck);
	}
}