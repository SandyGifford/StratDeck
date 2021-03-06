import * as Immutable from "immutable";
import io from "socket.io-client";

import GameState, { CardType, ImmutableGameState, ImmutablePlayerInitializer } from "@typings/game";
import emitTypes from "@shared/emitTypes";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import { Vector2 } from "@typings/vector";
const { fromServer, toServer } = emitTypes;

const socket = io();

export type ConnectedEventHandler = GenericEventListener<ImmutableGameState>;
export type GameUpdatedEventHandler = GenericEventListener<ImmutableGameState>;
export type GameResetEventHandler = GenericEventListener<ImmutableGameState>;
export type PlayerIndexAssignedEventHandler = GenericEventListener<number>;

const connectedDelegate = new EventDelegate<ImmutableGameState>();
const gameUpdatedDelegate = new EventDelegate<ImmutableGameState>();
const gameResetDelegate = new EventDelegate<ImmutableGameState>();
const playerIndexAssignedDelegate = new EventDelegate<number>();

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

	public static moveChar = (charIndex: number, move: Vector2): void => {
		socket.emit(toServer.moveChar, charIndex, move);
	};

	public static connectAsPlayer = (playerIndex: number): void => {

	};






	public static addConnectedListener = (listener: ConnectedEventHandler): void => {
		connectedDelegate.addEventListener(listener);
	};

	public static addGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		gameUpdatedDelegate.addEventListener(listener);
	};

	public static addGameResetListener = (listener: GameResetEventHandler): void => {
		gameResetDelegate.addEventListener(listener);
	};

	public static addPlayerIndexAssignedListener = (listener: PlayerIndexAssignedEventHandler): void => {
		playerIndexAssignedDelegate.addEventListener(listener);
	};

	public static removeConnectedListener = (listener: ConnectedEventHandler): void => {
		connectedDelegate.removeEventListener(listener);
	};

	public static removeGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		gameUpdatedDelegate.removeEventListener(listener);
	};

	public static removeGameResetListener = (listener: GameResetEventHandler): void => {
		gameResetDelegate.removeEventListener(listener);
	};

	public static removePlayerIndexAssignedListener = (listener: PlayerIndexAssignedEventHandler): void => {
		playerIndexAssignedDelegate.removeEventListener(listener);
	};
}

(window as any).SC = ServerConnect;
