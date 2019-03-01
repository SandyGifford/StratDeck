import { CardTypes } from "@typings/game";
import LoopUtils from "../LoopUtils";

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
}