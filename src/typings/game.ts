import CharacterDef from "./character";

export interface GameState {
	screen: GameScreen;
	players: PlayerState[];
	playerCount: number;
	whosTurn: number;
}

export interface PlayerState {
	name: string;
	chars: PlayerCharacters;
}

export interface TablePlayerState extends PlayerState {
	chars: TablePlayerCharacters;
}

export type PlayerCharacters = [CharacterDef, CharacterDef, CharacterDef];
export type TablePlayerCharacters = [TableCharacterDef, TableCharacterDef, TableCharacterDef];

export default interface TableCharacterDef extends CharacterDef {
	x: number;
	y: number;
	maxHP: number;
}

export type GameScreen = "table" | "characterSelect";
