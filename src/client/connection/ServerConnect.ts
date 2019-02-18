import * as io from "socket.io-client";
import GameState, { PlayerState } from "@typings/game";
import initialGameState from "@client/constants/initialGameState";
import emitTypes from "@shared/emitTypes";
const socket = io();

export type ConnectedEventHandler = (gameState: GameState) => void;
export type GameUpdatedEventHandler = (gameState: GameState) => void;
export type GameResetEventHandler = (gameState: GameState) => void;

export default class ServerConnect {
	public static setPlayerState = (playerIndex: number, playerState: PlayerState): void => {
		socket.emit(emitTypes.toServer.setPlayerState, {
			playerIndex: playerIndex,
			playerState: playerState,
		});
	};

	public static addConnectedListener = (listener: ConnectedEventHandler): void => {
		socket.addEventListener(emitTypes.fromServer.playerConnected, listener);
	};

	public static addGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		socket.addEventListener(emitTypes.fromServer.gameStateUpdated, listener);
	};

	public static addGameResetListener = (listener: GameResetEventHandler): void => {
		socket.addEventListener(emitTypes.fromServer.gameReset, listener);
	};

	public static removeConnectedListener = (listener: ConnectedEventHandler): void => {
		socket.removeEventListener(emitTypes.fromServer.playerConnected, listener);
	};

	public static removeGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		socket.removeEventListener(emitTypes.fromServer.gameStateUpdated, listener);
	};

	public static removeGameResetListener = (listener: GameResetEventHandler): void => {
		socket.removeEventListener(emitTypes.fromServer.gameReset, listener);
	};

	public static updateGameState = (gameState: GameState): void => {
		socket.emit(emitTypes.toServer.updateGameState, gameState);
	};

	public static resetGame = (playerCount: number): void => {
		socket.emit(emitTypes.toServer.resetGame, initialGameState(playerCount));
		// Server.resetGameStateWrench.emit(initialGameState(playerCount));
	};
}
