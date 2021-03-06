import { ImmutableTableCharacterState, ImmutableCharacterState, ImmutableTablePlayerCharacterStates } from "@typings/character";
import { Vector2 } from "@typings/vector";

export default class CharUtils {
	/**
	 * Changes the location of a character
	 * @param character A character
	 * @param move The new location
	 * @returns an Immutable character at the new location
	 */
	public static moveChar(character: ImmutableTableCharacterState, move: Vector2): ImmutableTableCharacterState {
		return character.set("x", move.x).set("y", move.y);
	}

	/**
	 * Changes an ImmutableCharacterDef to an ImmutableTableCharacterDef
	 * @param character The character base
	 * @param position The position to start the character at
	 * @returns a new ImmutableTableCharacterDef
	 */
	public static convertToTableChar(character: ImmutableCharacterState, position: Vector2): ImmutableTableCharacterState {
		return (character as ImmutableTableCharacterState)
			.set("maxHP", character.get("hp"))
			.set("x", position.x)
			.set("y", position.y)
			.set("movedThisTurn", false);
	}

	/**
	 * Counts how man players haven't moved yet in this turn
	 * @param chars An Immutable list of characters
	 * @returns The numbe of characters who have not moved yet
	 */
	public static countUnmovedCharacters(chars: ImmutableTablePlayerCharacterStates): number {
		return chars.reduce((charCount, char) => {
			if (char.get("movedThisTurn")) charCount--;
			return charCount;
		}, chars.size);
	}
}