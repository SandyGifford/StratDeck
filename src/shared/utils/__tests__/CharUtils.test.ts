import "jest";
import * as Immutable from "immutable";

import CharUtils from "../CharUtils";
import TestUtils from "./TestUtils";
import { ImmutableCharacterState, ImmutableTableCharacterState, ImmutableTablePlayerCharacterStates } from "@typings/character";

describe("CharUtils", () => {
	let char: ImmutableCharacterState;
	let tableChar: ImmutableTableCharacterState;

	beforeEach(() => {
		char = TestUtils.makeBlankImmutableCharacter();
		tableChar = CharUtils.convertToTableChar(char, { x: 0, y: 0 });
	});

	test("moveChar", () => {
		const moved = CharUtils.moveChar(tableChar, { x: 5, y: 6 });
		expect(moved.get("x")).toBe(5);
		expect(moved.get("y")).toBe(6);
	});

	describe("convertToTableChar", () => {
		test("existing props", () => {
			const otherTableChar = CharUtils.convertToTableChar(char, { x: 1, y: 2 });
			char.forEach((prop, key) => expect(prop).toBe(otherTableChar.get(key)));
		});

		test("new props", () => {
			const otherTableChar = CharUtils.convertToTableChar(char, { x: 1, y: 2 });
			expect(otherTableChar.get("maxHP")).toBe(char.get("hp"));
			expect(otherTableChar.get("x")).toBe(1);
			expect(otherTableChar.get("y")).toBe(2);
			expect(otherTableChar.get("movedThisTurn")).toBe(false);
		})
	});

	describe("countUnmovedCharacters", () => {
		const chars0Moved: ImmutableTablePlayerCharacterStates = Immutable.fromJS([
			CharUtils.convertToTableChar(TestUtils.makeBlankImmutableCharacter(0), { x: 0, y: 0, }),
			CharUtils.convertToTableChar(TestUtils.makeBlankImmutableCharacter(1), { x: 0, y: 1, }),
			CharUtils.convertToTableChar(TestUtils.makeBlankImmutableCharacter(2), { x: 0, y: 2, }),
		]);

		const chars1Moved = chars0Moved.setIn([1, "movedThisTurn"], true);
		const chars2Moved = chars1Moved.setIn([2, "movedThisTurn"], true);
		const chars3Moved = chars2Moved.setIn([0, "movedThisTurn"], true);

		test("0 characters moved", () => expect(CharUtils.countUnmovedCharacters(chars0Moved)).toBe(3));
		test("1 characters moved", () => expect(CharUtils.countUnmovedCharacters(chars1Moved)).toBe(2));
		test("2 characters moved", () => expect(CharUtils.countUnmovedCharacters(chars2Moved)).toBe(1));
		test("3 characters moved", () => expect(CharUtils.countUnmovedCharacters(chars3Moved)).toBe(0));
	});
});
