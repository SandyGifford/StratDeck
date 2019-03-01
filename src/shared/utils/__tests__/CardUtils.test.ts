import "jest";

import CardUtils from "@utils/CardUtils";
import ArrayUtils from "@utils/ArrayUtils";
import TestUtils from "./TestUtils";
import { CardTypes, DeckState } from "@typings/game";

describe("CardUtils", () => {
	describe("createCard", () => {
		let cardTypes: CardTypes;
		let deck: DeckState;

		beforeEach(() => {
			cardTypes = TestUtils.createNormalizedCardTypes(50);
			deck = cardTypes.map(CardUtils.createCard);
		})

		test("valid UIDs", () => {
			expect(ArrayUtils.hasOnlyUniqueValues(deck.map(card => card.uid))).toBe(true)
			expect(deck.every(card => !!card.uid && typeof card.uid === "string")).toBe(true);
		});

		test("card type", () => {
			deck.forEach((card, index) => expect(card.type).toBe(cardTypes[index]));
		});
	});
});
