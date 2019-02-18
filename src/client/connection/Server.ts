import * as io from "socket.io-client";
import GameState, { PlayerState } from "@typings/game";
import initialGameState from "@client/constants/initialGameState";
const socket = io();

export type ConnectedEventHandler = (gameState: GameState) => void;
export type GameUpdatedEventHandler = (gameState: GameState) => void;
export type GameResetEventHandler = (gameState: GameState) => void;

export default class Server {
	private static readonly events = {
		connected: "connection made",
		updated: "game state updated",
		reset: "game state reset",
	};

	public static setPlayerState = (playerIndex: number, playerState: PlayerState): void => {
		socket.emit("set player state", {
			playerIndex: playerIndex,
			playerState: playerState,
		});
	};

	public static addConnectedListener = (listener: ConnectedEventHandler): void => {
		socket.addEventListener(Server.events.connected, listener);
	};

	public static addGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		socket.addEventListener(Server.events.updated, listener);
	};

	public static addGameResetListener = (listener: GameResetEventHandler): void => {
		socket.addEventListener(Server.events.reset, listener);
	};

	public static removeConnectedListener = (listener: ConnectedEventHandler): void => {
		socket.removeEventListener(Server.events.connected, listener);
	};

	public static removeGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		socket.removeEventListener(Server.events.updated, listener);
	};

	public static removeGameResetListener = (listener: GameResetEventHandler): void => {
		socket.removeEventListener(Server.events.reset, listener);
	};

	public static updateGameState = (gameState: GameState): void => {
		socket.emit("update game state", gameState);
	};

	public static resetGame = (playerCount: number): void => {
		socket.emit("reset game state", initialGameState(playerCount));
		// Server.resetGameStateWrench.emit(initialGameState(playerCount));
	};
}
