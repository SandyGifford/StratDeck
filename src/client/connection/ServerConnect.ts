import * as io from "socket.io-client";
import GameState, { PlayerState, CardType } from "@typings/game";
import emitTypes from "@shared/emitTypes";
const { fromServer, toServer } = emitTypes;

const socket = io();

export type ConnectedEventHandler = (gameState: GameState) => void;
export type GameUpdatedEventHandler = (gameState: GameState) => void;
export type GameResetEventHandler = (gameState: GameState) => void;

export default class ServerConnect {
	public static initializePlayer = (playerIndex: number, playerState: PlayerState): void => {
		socket.emit(toServer.initializePlayer, playerIndex, playerState);
	};

	public static resetGame = (playerCount: number): void => {
		socket.emit(toServer.resetGame, playerCount);
	};

	public static takeTurn = (boughtCard: CardType): void => {
		socket.emit(toServer.takeTurn, boughtCard);
	};






	public static addConnectedListener = (listener: ConnectedEventHandler): void => {
		socket.addEventListener(fromServer.playerConnected, listener);
	};

	public static addGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		socket.addEventListener(fromServer.gameStateUpdated, listener);
	};

	public static addGameResetListener = (listener: GameResetEventHandler): void => {
		socket.addEventListener(fromServer.gameReset, listener);
	};

	public static removeConnectedListener = (listener: ConnectedEventHandler): void => {
		socket.removeEventListener(fromServer.playerConnected, listener);
	};

	public static removeGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		socket.removeEventListener(fromServer.gameStateUpdated, listener);
	};

	public static removeGameResetListener = (listener: GameResetEventHandler): void => {
		socket.removeEventListener(fromServer.gameReset, listener);
	};
}

(window as any).SC = ServerConnect;
