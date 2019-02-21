import { CardType, PlayPhase, ImmutableGameState, ImmutablePlayerState } from "@typings/game";
import PlayerUtils from "@utils/PlayerUtils";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import { immutableInitialGameState } from "@server/initialGameState";
import { ImmutableCharPositions } from "@typings/connection";

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
		let players = this.gameState.get("players");
		const boardWidth = this.gameState.get("boardWidth");
		const boardHeight = this.gameState.get("boardHeight");

		players = players.set(playerIndex, PlayerUtils.makeTablePlayer(playerState, playerIndex, boardWidth, boardHeight));

		const waitingOnPlayers = players.reduce((playerCount, player) => {
			if (player) playerCount--;
			return playerCount;
		}, players.size);

		const allPicked = waitingOnPlayers === 0;

		let gameState = this.gameState;
		gameState = gameState.set("players", players);
		gameState = gameState.set("screen", allPicked ? "table" : "characterSelect");

		GameStateManager.updateGameState(gameState);

		return waitingOnPlayers;
	}

	public static buyCard(playerIndex: number, boughtCard: CardType): void {
		const players = this.gameState.get("players");
		const player = players.get(playerIndex);

		PlayerUtils.addCardToDiscard(player, boughtCard);

		let gameState = this.gameState;
		gameState = gameState.set("players", players);
		gameState = gameState.set("playPhase", "move");

		GameStateManager.updateGameState(gameState);
	}

	public static moveChars(playerIndex: number, moves: ImmutableCharPositions): void {
		const players = this.gameState.get("players");
		let whosTurn = this.gameState.get("whosTurn");
		const player = players.get(playerIndex);

		PlayerUtils.moveChars(player, moves);
		PlayerUtils.discardHand(player);
		PlayerUtils.dealCards(player, 5);

		whosTurn = (whosTurn + 1) % this.gameState.get("playerCount");

		let gameState = this.gameState;
		gameState = gameState.set("players", players);
		gameState = gameState.set("whosTurn", whosTurn);
		gameState = gameState.set("playPhase", "buy");

		GameStateManager.updateGameState(gameState);
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
};
