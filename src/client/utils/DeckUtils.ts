import { CardType } from "@shared/typing/game";

export type MaybeMultiCard = CardType[] | CardType;

export default class DeckUtils {
	public static dealAllCardsToDeck(fromDeck: CardType[], toDeck: CardType[]): void {
		this.dealCardsToDeck(fromDeck, toDeck, fromDeck.length);
	}

	public static dealCardsToDeck(fromDeck: CardType[], toDeck: CardType[], cardCount: number): void {
		const cards = DeckUtils.dealCards(fromDeck, cardCount);
		this.addCardsToTop(toDeck, cards);
	}

	public static dealCards(deck: CardType[], cardCount: number): CardType[] {
		return deck.splice(-1 * cardCount);
	}

	public static addCardsToTop(deck: CardType[], cards: MaybeMultiCard): void {
		const multiCards = typeof cards === "string" ? [cards] : cards;
		deck.push(...multiCards);
	}

	public static addCardsToBottom(deck: CardType[], cards: MaybeMultiCard): void {
		const multiCards = typeof cards === "string" ? [cards] : cards;
		deck.unshift(...multiCards);
	}
}