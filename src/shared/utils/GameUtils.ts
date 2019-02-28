import { ImmutableGameState, ImmutableTablePlayerState, ImmutablePlayerState, CardType } from "@typings/game";
import { Vector2 } from "@typings/vector";
import PlayerUtils from "./PlayerUtils";

export default class Gameutils {
	public static dealCards(gameState: ImmutableGameState, playerIndex: number, cardCount: number): ImmutableGameState {
		const player = PlayerUtils.dealCards(gameState.get("players").get(playerIndex), cardCount);
		const players = gameState.get("players").set(playerIndex, player);
		return gameState.set("players", players);

	}

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

	public static countUnmovedPlayers(gameState: ImmutableGameState, playerIndex: number): number {
		return PlayerUtils.countUnmovedPlayers(gameState.get("players").get(playerIndex));
	}

	public static setAllCharMovedThisTurn(gameState: ImmutableGameState, playerIndex: number, movedThisTurn: boolean): ImmutableGameState {
		const player = PlayerUtils.setAllCharMovedThisTurn(gameState.get("players").get(playerIndex), movedThisTurn);
		const players = gameState.get("players").set(playerIndex, player);
		return gameState.set("players", players);
	}

	public static convertPlayerToTablePlayer(gameState: ImmutableGameState, player: ImmutablePlayerState, playerIndex: number): ImmutableGameState {
		const tablePlayer = PlayerUtils.convertPlayerToTablePlayer(player, playerIndex, gameState.get("boardWidth"), gameState.get("boardHeight"));
		const players = gameState.get("players").set(playerIndex, tablePlayer);
		return gameState.set("players", players);
	}

	public static discardHand(gameState: ImmutableGameState, playerIndex: number): ImmutableGameState {
		const player = PlayerUtils.discardHand(gameState.get("players").get(playerIndex));
		const players = gameState.get("players").set(playerIndex, player);
		return gameState.set("players", players);
	}

	public static addCardToDiscard(gameState: ImmutableGameState, playerIndex: number, card: CardType): ImmutableGameState {
		const player = PlayerUtils.addCardToDiscard(gameState.get("players").get(playerIndex), card);
		const players = gameState.get("players").set(playerIndex, player);
		return gameState.set("players", players);
	}

	public static setCharMovedThisTurn(gameState: ImmutableGameState, playerIndex: number, charIndex: number, movedThisTurn: boolean) {
		const player = PlayerUtils.setCharMovedThisTurn(gameState.get("players").get(playerIndex), charIndex, movedThisTurn);
		const players = gameState.get("players").set(playerIndex, player);
		return gameState.set("players", players);
	}
	public static allMovesTaken(gameState: ImmutableGameState, playerIndex: number): boolean {
		return PlayerUtils.allMovesTaken(gameState.get("players").get(playerIndex));
	}
}