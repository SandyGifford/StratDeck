import { CardType, PlayPhase, ImmutableGameState, ImmutablePlayerState, GameScreen } from "@typings/game";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import { immutableInitialGameState } from "@server/initialGameState";
import { Vector2 } from "@typings/vector";
import GameUtils from "@utils/GameUtils";
import CardUtils from "@utils/CardUtils";

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
		GameStateManager.updateGameState(gameState);

		return waitingOnPlayers;
	}

	public static setGameScreen(screen: GameScreen): void {
		GameStateManager.updateGameState(this.gameState.set("screen", screen));
	}

	public static buyCard(playerIndex: number, boughtCard: CardType): void {
		const gameState = GameUtils.addCardToDiscard(this.gameState, playerIndex, CardUtils.createImmutableCard(boughtCard));
		GameStateManager.updateGameState(gameState);
	}

	public static setPlayPhase(gamePhase: PlayPhase): void {
		GameStateManager.updateGameState(this.gameState.set("playPhase", gamePhase));
	}

	public static moveChar(playerIndex: number, charIndex: number, move: Vector2): number {
		let gameState = GameUtils.moveChar(this.gameState, playerIndex, charIndex, move);
		gameState = GameUtils.setCharMovedThisTurn(gameState, playerIndex, charIndex, true);

		const waitingOnChars = GameUtils.countUnmovedPlayers(gameState, playerIndex);

		if (waitingOnChars === 0) {
			gameState = GameUtils.discardHand(gameState, playerIndex);
			gameState = GameUtils.dealCards(gameState, playerIndex, 5)
		}

		GameStateManager.updateGameState(gameState);

		return waitingOnChars;
	}

	public static setAllCharMovedThisTurn(playerIndex: number, movedThisTurn: boolean): void {
		this.updateGameState(GameUtils.setAllCharMovedThisTurn(this.gameState, playerIndex, movedThisTurn));
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
