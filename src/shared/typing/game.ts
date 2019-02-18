import { PlayerCharacters, TablePlayerCharacters } from "@shared/typing/character";

export default interface GameState {
	screen: GameScreen;
	players: PlayerState[];
	playerCount: number;
	whosTurn: number;
}

export type CardType = "hand" | "weapon" | "ability1" | "ability2" | "ability3";

export interface PlayerState {
	name: string;
	chars: PlayerCharacters;
	hand: CardType[];
	deck: CardType[];
	discard: CardType[];
}

export interface TablePlayerState extends PlayerState {
	chars: TablePlayerCharacters;
}

export type GameScreen = "table" | "characterSelect";
