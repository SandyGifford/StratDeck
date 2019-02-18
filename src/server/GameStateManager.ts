import GameState from "@typings/game";
import * as SocketIO from "socket.io";

export default class GameStateManager {
	private static gameState: GameState = null;
	private static io: SocketIO.Server;

	public static init(ioInit: SocketIO.Server) {
		this.io = ioInit;
	}

	public static updateGameState(newGameState: GameState, emitEvent = "game state updated") {
		this.gameState = newGameState;
		this.io.emit(emitEvent, this.gameState);
	}

	public static updatePartialGameState(partialGameState: Partial<GameState>, emitEvent?: string) {
		const newGameState: GameState = {
			...this.gameState,
		};

		Object.keys(partialGameState).forEach((key: keyof GameState) => {
			newGameState[key] = partialGameState[key];
		});

		this.updateGameState(newGameState, emitEvent);
	}

	public static getGameState() {
		return this.gameState;
	}
};
