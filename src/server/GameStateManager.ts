import { CardType, PlayPhase, ImmutableGameState, ImmutablePlayerState } from "@typings/game";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import { immutableInitialGameState } from "@server/initialGameState";
import { Vector2 } from "@typings/vector";
import GameUtils from "@utils/GameUtils";
import Gameutils from "@utils/GameUtils";

export default class GameStateManager {
	private static gameState: ImmutableGameState = null;
	private static updateDelegate: EventDelegate<ImmutableGameState> = new EventDelegate();
	private static resetDelegate: EventDelegate<ImmutableGameState> = new EventDelegate();

	public static addUpdateListener(listener: GenericEventListener<ImmutableGameState>) {
		this.updateDelegate.addEventListener(listener);
	}

	public static removeUpdateListener(listener: GenericEventListener<ImmutableGameState>) {
		this.updateDelegate.removeEventListener(listener);
	}

	public static addResetListener(listener: GenericEventListener<ImmutableGameState>) {
		this.resetDelegate.addEventListener(listener);
	}

	public static removeResetListener(listener: GenericEventListener<ImmutableGameState>) {
		this.resetDelegate.removeEventListener(listener);
	}




	public static updateGameState(newGameState: ImmutableGameState) {
		this.gameState = newGameState;
		this.updateDelegate.trigger(this.gameState);
	}

	public static resetGame(playerCount: number) {
		this.gameState = immutableInitialGameState(playerCount);
		this.resetDelegate.trigger(this.gameState);
	}

	public static initializePlayer(playerIndex: number, playerState: ImmutablePlayerState): number {
		let gameState = this.gameState;
		gameState = GameUtils.convertPlayerToTablePlayer(gameState, playerState, playerIndex);

		const waitingOnPlayers = GameUtils.countUnreadyPlayers(gameState);
		const allPicked = waitingOnPlayers === 0;

		gameState = gameState.set("screen", allPicked ? "table" : "characterSelect");
		GameStateManager.updateGameState(gameState);

		return waitingOnPlayers;
	}

	public static buyCard(playerIndex: number, boughtCard: CardType): void {
		let gameState = GameUtils.addCardToDiscard(this.gameState, playerIndex, boughtCard);
		gameState = gameState.set("playPhase", "move");
		GameStateManager.updateGameState(gameState);
	}

	public static moveChar(playerIndex: number, charIndex: number, move: Vector2): void {
		let gameState = GameUtils.moveChar(this.gameState, playerIndex, charIndex, move);
		gameState = Gameutils.setCharMovedThisTurn(gameState, playerIndex, charIndex, true);
		GameStateManager.updateGameState(gameState);
	}

	public static incrementTurn(): void {
		let whosTurn = this.gameState.get("whosTurn");
		whosTurn = (whosTurn + 1) % this.gameState.get("playerCount");
		this.updateGameState(this.gameState.set("whosTurn", whosTurn));
	}

	public static getGameState(): ImmutableGameState {
		return this.gameState;
	}

	public static getPlayer(playerIndex: number): ImmutablePlayerState {
		return this.gameState.get("players").get(playerIndex);
	}

	public static isPlayersTurn(playerIndex: number): boolean {
		return this.gameState.get("whosTurn") === playerIndex;
	}

	public static getPlayPhase(): PlayPhase {
		return this.gameState.get("playPhase");
	}

	public static getCharDidMoveThisTurn(playerIndex: number, charIndex: number): boolean {
		return this.gameState.get("players").get(playerIndex).get("chars").get(charIndex).get("movedThisTurn");
	}
};
