import { GameState, PlayerState } from "../typings/game";
import SocketWrench from "./SocketWrench";
import initialGameState from "../constants/initialGameState";

export type ConnectedEventHandler = (gameState: GameState) => void;
export type GameUpdatedEventHandler = (gameState: GameState) => void;


interface SetPlayerStateWrenchData {
	playerIndex: number;
	playerState: PlayerState;
}

export default class Server {
	private static readonly events = {
		connected: "connection made",
		updated: "game state updated",
		reset: "game state reset",
	};

	private static readonly getGameStateWrench = new SocketWrench<void, GameState>("getGameState");
	private static readonly setPlayerStateWrench = new SocketWrench<SetPlayerStateWrenchData, string>("setPlayerState");

	public static getGameState = (): Promise<GameState> => {
		return Server.getGameStateWrench.emit();
	};

	public static setPlayerState = (playerIndex: number, playerState: PlayerState): Promise<string> => {
		return Server.setPlayerStateWrench.emit({
			playerIndex: playerIndex,
			playerState: playerState,
		});
	};

	public static addConnectedListener = (listener: ConnectedEventHandler): void => {
		SocketWrench.addEventListener(Server.events.connected, listener);
	};

	public static addGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		SocketWrench.addEventListener(Server.events.updated, listener);
	};

	public static removeConnectedListener = (listener: ConnectedEventHandler): void => {
		SocketWrench.removeEventListener(Server.events.connected, listener);
	};

	public static removeGameUpdatedListener = (listener: GameUpdatedEventHandler): void => {
		SocketWrench.removeEventListener(Server.events.updated, listener);
	};

	public static updateGameState = (gameState: GameState): void => {
		SocketWrench.emit("update game state", gameState);
	};

	public static resetGame = (playerCount: number): void => {
		Server.updateGameState(initialGameState(playerCount));
	};
}
