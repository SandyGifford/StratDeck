import CharacterDef from "./character";

export default interface GameState {
	screen: GameScreen;
	p1: PlayerState;
	p2: PlayerState;
}

export interface PlayerState {
	chars: PlayerCharacters;
}

export type PlayerCharacters = [CharacterDef, CharacterDef, CharacterDef];

export type GameScreen = "table" | "characterSelect";