import * as Immutable from "immutable";

import { CardTypes, DeckState, ImmutableCardTypes, ImmutableDeckState } from "@typings/game";
import LoopUtils from "../LoopUtils";
import CardUtils from "../CardUtils";
import CharacterState, { ImmutableCharacterState } from "@typings/character";
import { characters } from "../../characters/characters";

export default class TestUtils {
	private static readonly CARD_TYPES: CardTypes = ["ability1", "ability2", "ability3", "hand", "weapon"];

	/**
	 * Creates an array of card types of predictable values
	 * @param size the size of the array
	 * @returns an array of card types
	 */
	public static createNormalizedCardTypes(size: number): CardTypes {
		return LoopUtils.mapTimes(size, x => this.CARD_TYPES[x % this.CARD_TYPES.length]);
	}

	/**
	 * Creates a deck of predictable types and (optionally) UIDs
	 * @param size the size of the deck
	 * @param uidSeed the seed for the uids
	 * @returns a deck
	 */
	public static createNormalizedDeck(size: number, uidSeed?: number, incrementSeed = true): DeckState {
		return this.createNormalizedCardTypes(size).map((cardType, index) => CardUtils.createCard(cardType, typeof uidSeed === "number" ? uidSeed + (incrementSeed ? index : 0) : undefined));
	}

	/**
	 * Creates an Immutable List of card types of predictable values
	 * @param size the size of the Immutable List
	 * @returns an Immutable List of card types
	 */
	public static createImmutableNormalizedCardTypes(size: number): ImmutableCardTypes {
		return Immutable.fromJS(this.createNormalizedCardTypes(size));
	}

	/**
	 * Creates an Immutable deck of predictable types and (optionally) UIDs
	 * @param size the size of the Immutable deck
	 * @param uidSeed the seed for the uids
	 * @returns an Immutable deck
	 */
	public static createImmutableNormalizedDeck(size: number, uidSeed?: number, incrementSeed = true): ImmutableDeckState {
		return Immutable.fromJS(this.createNormalizedDeck(size, uidSeed));
	}

	public static makeBlankCharacter(baseIndex = 0, partialState?: Partial<CharacterState>): CharacterState {
		return {
			...characters[baseIndex],
			...partialState,
		};
	}

	public static makeBlankImmutableCharacter(baseIndex?: number, partialState?: Partial<CharacterState>): ImmutableCharacterState {
		return Immutable.fromJS(this.makeBlankCharacter(baseIndex, partialState));
	}
}