import { ImmutableTableCharacterDef, ImmutableCharacterDef, ImmutableTablePlayerCharacters } from "@typings/character";
import { Vector2 } from "@typings/vector";

export default class CharUtils {
	public static moveChar(character: ImmutableTableCharacterDef, move: Vector2): ImmutableTableCharacterDef {
		return character.set("x", move.x).set("y", move.y);
	}

	public static convertToTableChar(character: ImmutableCharacterDef, position: Vector2): ImmutableTableCharacterDef {
		return (character as ImmutableTableCharacterDef)
			.set("maxHP", character.get("hp"))
			.set("x", position.x)
			.set("y", position.y)
			.set("movedThisTurn", false);
	}

	public static countUnmovedPlayers(chars: ImmutableTablePlayerCharacters): number {
		return chars.reduce((charCount, char) => {
			if (char.get("movedThisTurn")) charCount--;
			return charCount;
		}, chars.size);
	}
}