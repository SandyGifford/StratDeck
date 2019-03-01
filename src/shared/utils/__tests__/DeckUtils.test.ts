import "jest";

import DeckUtils, { FromDeckToDeck, DealtCards } from "../DeckUtils";
import TestUtils from "./TestUtils";
import { ImmutableDeckState } from "@typings/game";


describe("DeckUtils", () => {
	const DECK_A_SIZE = 25;
	const DECK_B_SIZE = 50;

	let deckA: ImmutableDeckState;
	let deckB: ImmutableDeckState;

	beforeEach(() => {
		deckA = TestUtils.createImmutableNormalizedDeck(DECK_A_SIZE);
		deckB = TestUtils.createImmutableNormalizedDeck(DECK_B_SIZE);
	});

	describe("dealAllCardsToDeck", () => {
		let fromTo: FromDeckToDeck;

		beforeEach(() => {
			fromTo = DeckUtils.dealAllCardsToDeck(deckA, deckB);
		});

		test("size", () => {
			expect(fromTo.fromDeck.size).toBe(0);
			expect(fromTo.toDeck.size).toBe(DECK_A_SIZE + DECK_B_SIZE);
		});

		test("UIDs", () => {
			deckA.forEach((card, index) => expect(card.get("uid")).toBe(fromTo.toDeck.get(index + DECK_B_SIZE).get("uid")));
			deckB.forEach((card, index) => expect(card.get("uid")).toBe(fromTo.toDeck.get(index).get("uid")));
		});

		test("card types", () => {
			deckA.forEach((card, index) => expect(card.get("type")).toBe(fromTo.toDeck.get(index + DECK_B_SIZE).get("type")));
			deckB.forEach((card, index) => expect(card.get("type")).toBe(fromTo.toDeck.get(index).get("type")));
		});
	});

	describe("dealCardsToDeck", () => {
		const CARD_COUNT = 10;

		let fromTo: FromDeckToDeck;

		beforeEach(() => {
			fromTo = DeckUtils.dealCardsToDeck(deckA, deckB, CARD_COUNT);
		});

		test("size", () => {
			expect(fromTo.fromDeck.size).toBe(DECK_A_SIZE - CARD_COUNT);
			expect(fromTo.toDeck.size).toBe(DECK_B_SIZE + CARD_COUNT);
		});

		// TODO: test types, order and UIDs
	});

	describe("dealCards", () => {
		const CARD_COUNT = 10;

		let dealtCards: DealtCards;

		beforeEach(() => {
			dealtCards = DeckUtils.dealCards(deckA, CARD_COUNT);
		});

		test("size", () => {
			expect(dealtCards.dealt.size).toBe(CARD_COUNT);
			expect(dealtCards.deck.size).toBe(DECK_A_SIZE - CARD_COUNT);
		});

		test("UIDs", () => {
			dealtCards.deck.forEach((card, index) => expect(card.get("uid")).toBe(deckA.get(index).get("uid")));
			dealtCards.dealt.forEach((card, index) => expect(card.get("uid")).toBe(deckA.get(DECK_A_SIZE - CARD_COUNT + index).get("uid")));
		});

		test("card types", () => {
			dealtCards.deck.forEach((card, index) => expect(card.get("type")).toBe(deckA.get(index).get("type")));
			dealtCards.dealt.forEach((card, index) => expect(card.get("type")).toBe(deckA.get(DECK_A_SIZE - CARD_COUNT + index).get("type")));
		});
	});

	describe("addCardsToTop", () => {
		let combinedDeck: ImmutableDeckState;

		beforeEach(() => combinedDeck = DeckUtils.addCardsToTop(deckA, deckB));

		test("size", () => {
			expect(combinedDeck.size).toBe(DECK_A_SIZE + DECK_B_SIZE);
		});

		test("UIDs", () => {
			deckA.forEach((card, index) => expect(card.get("uid")).toBe(combinedDeck.get(index).get("uid")));
			deckB.forEach((card, index) => expect(card.get("uid")).toBe(combinedDeck.get(DECK_A_SIZE + index).get("uid")));
		});

		test("card types", () => {
			deckA.forEach((card, index) => expect(card.get("type")).toBe(combinedDeck.get(index).get("type")));
			deckB.forEach((card, index) => expect(card.get("type")).toBe(combinedDeck.get(DECK_A_SIZE + index).get("type")));
		});
	});

	describe("addCardsToBottom", () => {
		let combinedDeck: ImmutableDeckState;

		beforeEach(() => combinedDeck = DeckUtils.addCardsToBottom(deckA, deckB));

		test("size", () => {
			expect(combinedDeck.size).toBe(DECK_A_SIZE + DECK_B_SIZE);
		});

		test("UIDs", () => {
			deckA.forEach((card, index) => expect(card.get("uid")).toBe(combinedDeck.get(DECK_B_SIZE + index).get("uid")));
			deckB.forEach((card, index) => expect(card.get("uid")).toBe(combinedDeck.get(index).get("uid")));
		});

		test("card types", () => {
			deckA.forEach((card, index) => expect(card.get("type")).toBe(combinedDeck.get(DECK_B_SIZE + index).get("type")));
			deckB.forEach((card, index) => expect(card.get("type")).toBe(combinedDeck.get(index).get("type")));
		});
	});
});
