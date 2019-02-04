import { GameState } from "../typings/game";
import SocketWrench from "./SocketWrench";
import initialGameState from "../constants/initialGameState";

export type ConnectedEventHandler = (gameState: GameState) => void;
export type GameUpdatedEventHandler = (gameState: GameState) => void;
export type GameResetEventHandler = (gameState: GameState) => void;

export default class Server {
	private static readonly events = {
		connected: "connection made",
		updated: "game state updated",
		reset: "game state reset",
	};

	private static readonly getGameStateWrench = new SocketWrench<void, GameState>("getGameState");

	public static getGameState = (): Promise<GameState> => {
		return Server.getGameStateWrench.emit();
	};

	public static addConnectedListener = (listener: ConnectedEventHandler): void => {
		SocketWrench.addEventListener(Server.events.connected, listener);
	};

	public static addGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		SocketWrench.addEventListener(Server.events.updated, listener);
	};

	public static addGameResetListener = (listener: GameResetEventHandler): void => {
		SocketWrench.addEventListener(Server.events.reset, listener);
	};

	public static removeConnectedListener = (listener: ConnectedEventHandler): void => {
		SocketWrench.removeEventListener(Server.events.connected, listener);
	};

	public static removeGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		SocketWrench.removeEventListener(Server.events.updated, listener);
	};

	public static removeGameResetListener = (listener: GameResetEventHandler): void => {
		SocketWrench.removeEventListener(Server.events.reset, listener);
	};

	public static updateGameState = (gameState: GameState): void => {
		SocketWrench.emit("update game state", gameState);
	};

	public static resetGame = (): void => {
		SocketWrench.emit("reset game state", initialGameState);
	};
}
