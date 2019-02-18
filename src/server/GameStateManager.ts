import GameState, { PlayerState } from "@typings/game";
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

	public static setPlayerState(playerIndex: number, playerState: PlayerState) {
		const { players } = this.gameState;

		players[playerIndex] = playerState;

		const waitingOnPlayers = players.reduce((playerCount, player) => {
			if (player) playerCount--;
			return playerCount;
		}, players.length);
		const allPicked = waitingOnPlayers === 0;

		console.log(
			`Player ${playerIndex + 1} (${playerState.name}) has selected characters, ` + (
				allPicked ? "all players ready" : (
					`still waiting on ${waitingOnPlayers} player` + (waitingOnPlayers === 1 ? "" : "s")
				)
			)
		);

		GameStateManager.updatePartialGameState({
			players: players,
			screen: allPicked ? "table" : "characterSelect",
		});
	}

	public static getGameState() {
		return this.gameState;
	}
};
