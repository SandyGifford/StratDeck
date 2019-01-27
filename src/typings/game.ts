import CharacterDef from "./character";

export interface PlayerState {
	chars: PlayerCharacters;
}

export type PlayerCharacters = [CharacterDef, CharacterDef, CharacterDef];

export type GameScreen = "table" | "characterSelect";