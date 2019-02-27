import { ImmutableGameState, ImmutableTablePlayerState, ImmutablePlayerState, CardType } from "@typings/game";
import { Vector2 } from "@typings/vector";
import PlayerUtils from "./PlayerUtils";

export default class Gameutils {
	public static moveChar(gameState: ImmutableGameState, playerIndex: number, charIndex: number, move: Vector2): ImmutableGameState {
		const player = PlayerUtils.moveCharInPlayer(gameState.get("players").get(playerIndex), charIndex, move);
		const players = gameState.get("players").set(playerIndex, player);
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
		const tablePlayer = PlayerUtils.convertPlayerToTablePlayer(gameState.get("players").get(playerIndex), playerIndex, gameState.get("boardWidth"), gameState.get("boardHeight"));
		const players = gameState.get("players").set(playerIndex, tablePlayer);
		return gameState.set("players", players);
	}

	public static addCardToDiscard(gameState: ImmutableGameState, playerIndex: number, card: CardType): ImmutableGameState {
		const player = PlayerUtils.addCardToDiscard(gameState.get("players").get(playerIndex), card);
		const players = gameState.get("players").set(playerIndex, player);
		return gameState.set("players", players);
	}
}