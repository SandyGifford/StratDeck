import { ImmutableGameState, ImmutableTablePlayerState, ImmutablePlayerState } from "@typings/game";
import { Vector2 } from "@typings/vector";
import PlayerUtils from "./PlayerUtils";

export default class Gameutils {
	public static moveChar(gameState: ImmutableGameState, playerIndex: number, charIndex: number, move: Vector2): ImmutableGameState {
		const players = PlayerUtils.moveCharInPlayers(gameState.get("players"), playerIndex, charIndex, move);
		return gameState.set("players", players);
	}

	public static setPlayer(gameState: ImmutableGameState, playerIndex: number, player: ImmutableTablePlayerState): ImmutableGameState {
		const players = gameState.get("players").set(playerIndex, player);
		return gameState.set("players", players);
	}

	public static countUnreadyPlayers(gameState: ImmutableGameState): number {
		return PlayerUtils.countUnreadyPlayers(gameState.get("players"));
	}

	public static convertPlayerToTablePlayer(gameState: ImmutableGameState, player: ImmutablePlayerState, playerIndex: number): ImmutableGameState {
		const players = PlayerUtils.convertPlayerToTablePlayerInPlayers(gameState.get("players"), playerIndex, player, gameState.get("boardWidth"), gameState.get("boardHeight"));
		return gameState.set("players", players);
	}
}