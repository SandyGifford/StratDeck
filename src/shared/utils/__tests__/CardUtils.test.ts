import "jest";

// import * as Immutable from "immutable";

import CardUtils from "../CardUtils";
import LoopUtils from "../LoopUtils";
import { CardType, CardTypes, DeckState } from "@typings/game";
import ArrayUtils from "../ArrayUtils";

const CARD_TYPES: CardType[] = ["ability1", "ability2", "ability3", "hand", "weapon"];
const createNormalizedDeck = (size: number): CardTypes => LoopUtils.mapTimes(size, x => CARD_TYPES[x % CARD_TYPES.length]);

describe("CardUtils", () => {
	test("createCard", () => {
		const cardTypes: CardTypes = createNormalizedDeck(50);
		const deck: DeckState = cardTypes.map(CardUtils.createCard);
		expect(deck).toHaveLength(50);
		expect(ArrayUtils.hasOnlyUniqueValues(deck.map(card => card.uid))).toBe(true);
		expect(deck.every(card => !!card.uid && typeof card.uid === "string")).toBe(true);
		expect(deck.every((card, index) => card.type === cardTypes[index])).toBe(true);
	});
});
