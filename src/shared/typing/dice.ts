import Immutalizer from "./immutalizer";

export default interface DiceRoll {
	count?: number;
	sides: DiceSides;
}
export type DiceSides = 4 | 6 | 8 | 10 | 12 | 20;


/**
 * Immutable interfaces
 */

export type ImmutableDiceRoll = Immutalizer<DiceRoll>;
