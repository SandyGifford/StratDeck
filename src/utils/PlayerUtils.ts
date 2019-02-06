import { PlayerState } from "../typings/game";
import ArrayUtils from "./ArrayUtils";
import DeckUtils from "./DeckUtils";
import { CardType } from "../components/PlayTable/subComponents/Card/Card";

export default class PlyaerUtils {
	public static dealCards(player: PlayerState, cardCount: number): void {
		DeckUtils.dealCardsToDeck(player.deck, player.hand, cardCount);
	}

	public static discardHand(player: PlayerState): void {
		DeckUtils.dealAllCardsToDeck(player.hand, player.discard);
	}

	public static shuffleDiscardToDeck(player: PlayerState): void {
		DeckUtils.dealAllCardsToDeck(player.discard, player.deck);
		player.deck = ArrayUtils.shuffle(player.deck);
	}

	public static addCardToDiscard(player: PlayerState, card: CardType): void {
		DeckUtils.addCardsToTop(player.discard, card);
	}
}