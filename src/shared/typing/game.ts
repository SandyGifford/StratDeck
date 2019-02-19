import { PlayerCharacters, TablePlayerCharacters } from "@typings/character";

export default interface GameState {
	screen: GameScreen;
	players: TablePlayerState[];
	playerCount: number;
	playerReadyState: boolean[];
	whosTurn: number;
	boardWidth: number;
	boardHeight: number;
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
