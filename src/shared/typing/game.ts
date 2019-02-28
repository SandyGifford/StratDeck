import { PlayerCharacters, TablePlayerCharacters } from "@typings/character";
import Immutalizer from "./immutalizer";

export type PlayPhase = "buy" | "move";

export default interface GameState {
	screen: GameScreen;
	players: TablePlayerStates;
	playerCount: number;
	playerReadyState: boolean[];
	playPhase: PlayPhase;
	whosTurn: number;
	boardWidth: number;
	boardHeight: number;
}

export type CardType = "hand" | "weapon" | "ability1" | "ability2" | "ability3";
export type CardTypes = CardType[];
export type DeckState = CardState[];

export interface CardState {
	type: CardType;
	uid: string;
}

export interface PlayerState {
	name: string;
	chars: PlayerCharacters;
	hand: DeckState;
	deck: DeckState;
	discard: DeckState;
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
export type ImmutableCardState = Immutalizer<CardState>;
export type ImmutableDeckState = Immutalizer<DeckState>;
