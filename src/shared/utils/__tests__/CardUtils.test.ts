import "jest";

import CardUtils from "../CardUtils";
import ArrayUtils from "../ArrayUtils";
import TestUtils from "./TestUtils";

describe("CardUtils", () => {
	test("createCard", () => {
		const cardTypes = TestUtils.createNormalizedCardTypes(50);
		const deck = cardTypes.map(CardUtils.createCard);

		expect(deck).toHaveLength(50);
		expect(ArrayUtils.hasOnlyUniqueValues(deck.map(card => card.uid))).toBe(true);
		expect(deck.every(card => !!card.uid && typeof card.uid === "string")).toBe(true);
		expect(deck.every((card, index) => card.type === cardTypes[index])).toBe(true);
	});
});
