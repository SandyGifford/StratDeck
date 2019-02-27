import { ImmutableTableCharacterDef } from "@typings/character";
import { Vector2 } from "@typings/vector";

export default class CharUtils {
	public static moveChar(character: ImmutableTableCharacterDef, move: Vector2): ImmutableTableCharacterDef {
		return character.set("x", move.x).set("y", move.y);
	}
}