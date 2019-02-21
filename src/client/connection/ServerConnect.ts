import * as io from "socket.io-client";
import GameState, { CardType, ImmutableGameState, ImmutablePlayerInitializer } from "@typings/game";
import emitTypes from "@shared/emitTypes";
import { ImmutableMoveCharsMessage } from "@typings/connection";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
const { fromServer, toServer } = emitTypes;

const socket = io();

export type ConnectedEventHandler = GenericEventListener<ImmutableGameState>;
export type GameUpdatedEventHandler = GenericEventListener<ImmutableGameState>;
export type GameResetEventHandler = GenericEventListener<ImmutableGameState>;

const connectedDelegate = new EventDelegate<ImmutableGameState>();
const gameUpdatedDelegate = new EventDelegate<ImmutableGameState>();
const gameResetDelegate = new EventDelegate<ImmutableGameState>();

const onConnected = (gameState: GameState) => connectedDelegate.trigger(Immutable.fromJS(gameState));
const onGameUpdated = (gameState: GameState) => gameUpdatedDelegate.trigger(Immutable.fromJS(gameState));
const onGameReset = (gameState: GameState) => gameResetDelegate.trigger(Immutable.fromJS(gameState));

socket.addEventListener(fromServer.playerConnected, onConnected);
socket.addEventListener(fromServer.gameStateUpdated, onGameUpdated);
socket.addEventListener(fromServer.gameReset, onGameReset);

export default class ServerConnect {
	public static initializePlayer = (playerIndex: number, playerState: ImmutablePlayerInitializer): void => {
		socket.emit(toServer.initializePlayer, playerIndex, playerState.toJS());
	};

	public static resetGame = (playerCount: number): void => {
		socket.emit(toServer.resetGame, playerCount);
	};

	public static buyCard = (boughtCard: CardType): void => {
		socket.emit(toServer.buyCard, boughtCard);
	};

	public static moveChars = (moves: ImmutableMoveCharsMessage): void => {
		socket.emit(toServer.moveChars, moves.toJS());
	};






	public static addConnectedListener = (listener: ConnectedEventHandler): void => {
		connectedDelegate.addEventListener(listener);
		socket.addEventListener(fromServer.playerConnected, listener);
	};

	public static addGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		gameUpdatedDelegate.addEventListener(listener);
		socket.addEventListener(fromServer.gameStateUpdated, listener);
	};

	public static addGameResetListener = (listener: GameResetEventHandler): void => {
		gameResetDelegate.addEventListener(listener);
		socket.addEventListener(fromServer.gameReset, listener);
	};

	public static removeConnectedListener = (listener: ConnectedEventHandler): void => {
		connectedDelegate.removeEventListener(listener);
		socket.removeEventListener(fromServer.playerConnected, listener);
	};

	public static removeGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		gameUpdatedDelegate.removeEventListener(listener);
		socket.removeEventListener(fromServer.gameStateUpdated, listener);
	};

	public static removeGameResetListener = (listener: GameResetEventHandler): void => {
		gameResetDelegate.removeEventListener(listener);
		socket.removeEventListener(fromServer.gameReset, listener);
	};
}

(window as any).SC = ServerConnect;
