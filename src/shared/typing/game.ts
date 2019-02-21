import { PlayerCharacters, TablePlayerCharacters } from "@typings/character";
import Immutalizer from "./immutalizer";

export type PlayPhase = "buy" | "move";

export default interface GameState {
	screen: GameScreen;
	players: TablePlayerState[];
	playerCount: number;
	playerReadyState: boolean[];
	playPhase: PlayPhase;
	whosTurn: number;
	boardWidth: number;
	boardHeight: number;
}

export type CardType = "hand" | "weapon" | "ability1" | "ability2" | "ability3";
export type CardTypes = CardType[];

export interface PlayerState {
	name: string;
	chars: PlayerCharacters;
	hand: CardType[];
	deck: CardType[];
	discard: CardType[];
}

export type PlayerInitializer = Pick<PlayerState, "chars" | "name">;

export interface TablePlayerState extends PlayerState {
	chars: TablePlayerCharacters;
}

export type TablePlayerStates = TablePlayerState[];

export type GameScreen = "table" | "characterSelect";


/**
 * Immutable interfaces
 */

export type ImmutableGameState = Immutalizer<GameState>;
export type ImmutablePlayerState = Immutalizer<PlayerState>;
export type ImmutableTablePlayerState = Immutalizer<TablePlayerState>;
export type ImmutableTablePlayerStates = Immutalizer<TablePlayerStates>;
export type ImmutablePlayerInitializer = Immutalizer<PlayerInitializer>;

export type ImmutableCardTypes = Immutalizer<CardTypes>;
