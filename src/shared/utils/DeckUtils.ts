import { ImmutableDeckState } from "@typings/game";

export type FromDeckToDeck = { fromDeck: ImmutableDeckState, toDeck: ImmutableDeckState };
export type DealtCards = { deck: ImmutableDeckState, dealt: ImmutableDeckState };

export default class DeckUtils {
	/**
	 * Deals all cards from one deck onto the top of another
	 * @param fromDeck The deck to deal cards from
	 * @param toDeck The deck to deal cards to
	 * @returns an object with the after states of both decks
	 */
	public static dealAllCardsToDeck(fromDeck: ImmutableDeckState, toDeck: ImmutableDeckState): FromDeckToDeck {
		return this.dealCardsToDeck(fromDeck, toDeck, fromDeck.size);
	}

	/**
	 * Deals cards from one deck onto the top of another
	 * @param fromDeck The deck to deal cards from
	 * @param toDeck The deck to deal cards to
	 * @param cardCount The number of cards to deal
	 * @returns an object with the after states of both decks
	 */
	public static dealCardsToDeck(fromDeck: ImmutableDeckState, toDeck: ImmutableDeckState, cardCount: number): FromDeckToDeck {
		const dealtCards = DeckUtils.dealCards(fromDeck, cardCount);
		const newToDeck = this.addCardsToTop(toDeck, dealtCards.dealt);
		return { fromDeck: dealtCards.deck, toDeck: newToDeck };
	}

	/**
	 * Removes cards from the top of a deck, returns them
	 * @param deck The deck to deal from
	 * @param cardCount The number of cards to deal
	 * @returns an object with the after state of the deck as well as the cards dealt
	 */
	public static dealCards(deck: ImmutableDeckState, cardCount: number): DealtCards {
		return {
			deck: deck.slice(0, -cardCount),
			dealt: deck.slice(-cardCount),
		};
	}

	/**
	 * Adds cards to the top of a deck
	 * @param deck The deck to add to
	 * @param cards The cards to add
	 * @returns The new deck state
	 */
	public static addCardsToTop(deck: ImmutableDeckState, cards: ImmutableDeckState): ImmutableDeckState {
		return deck.concat(cards);
	}

	/**
	 * Adds cards to the bottom of a deck
	 * @param deck The deck to add to
	 * @param cards The cards to add
	 * @returns The new deck state
	 */
	public static addCardsToBottom(deck: ImmutableDeckState, cards: ImmutableDeckState): ImmutableDeckState {
		return cards.concat(deck);
	}
}