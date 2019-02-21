import GameState, { PlayerState, CardType, PlayPhase } from "@typings/game";
import PlayerUtils from "@utils/PlayerUtils";
import EventDelegate, { GenericEventListener } from "@utils/EventDelegate";
import initialGameState from "@server/initialGameState";
import { MoveCharsMessage } from "@typings/connection";

export default class GameStateManager {
	private static gameState: GameState = null;
	private static updateDelegate: EventDelegate<GameState> = new EventDelegate();
	private static resetDelegate: EventDelegate<GameState> = new EventDelegate();

	public static addUpdateListener(listener: GenericEventListener<GameState>) {
		this.updateDelegate.addEventListener(listener);
	}

	public static removeUpdateListener(listener: GenericEventListener<GameState>) {
		this.updateDelegate.removeEventListener(listener);
	}

	public static addResetListener(listener: GenericEventListener<GameState>) {
		this.resetDelegate.addEventListener(listener);
	}

	public static removeResetListener(listener: GenericEventListener<GameState>) {
		this.resetDelegate.removeEventListener(listener);
	}

	public static updateGameState(newGameState: GameState) {
		this.gameState = newGameState;
		this.updateDelegate.trigger(this.gameState);
	}

	public static resetGame(playerCount: number) {
		this.gameState = initialGameState(playerCount);
		this.resetDelegate.trigger(this.gameState);
	}

	public static updatePartialGameState(partialGameState: Partial<GameState>) {
		const newGameState: GameState = {
			...this.gameState,
		};

		Object.keys(partialGameState).forEach((key: keyof GameState) => {
			newGameState[key] = partialGameState[key];
		});

		this.updateGameState(newGameState);
	}

	public static initializePlayer(playerIndex: number, playerState: PlayerState): number {
		const { players, boardWidth, boardHeight } = this.gameState;

		players[playerIndex] = PlayerUtils.makeTablePlayer(playerState, playerIndex, boardWidth, boardHeight);

		const waitingOnPlayers = players.reduce((playerCount, player) => {
			if (player) playerCount--;
			return playerCount;
		}, players.length);
		const allPicked = waitingOnPlayers === 0;

		GameStateManager.updatePartialGameState({
			players: players,
			screen: allPicked ? "table" : "characterSelect",
		});

		return waitingOnPlayers;
	}

	public static buyCard(playerIndex: number, boughtCard: CardType): void {
		const { players } = this.gameState;

		const player = players[playerIndex];
		PlayerUtils.discardHand(player);
		PlayerUtils.addCardToDiscard(player, boughtCard);
		PlayerUtils.dealCards(player, 5);

		GameStateManager.updatePartialGameState({
			players: players,
			playPhase: "move",
		});
	}

	public static moveChars(playerIndex: number, moves: MoveCharsMessage): void {
		const { players } = this.gameState;

		const player = players[playerIndex];
		PlayerUtils.moveChars(player, moves);

		let { whosTurn } = this.gameState;
		whosTurn = (whosTurn + 1) % this.gameState.playerCount;

		GameStateManager.updatePartialGameState({
			players: players,
			whosTurn: whosTurn,
			playPhase: "buy",
		});
	}

	public static getGameState(): GameState {
		return this.gameState;
	}

	public static getPlayer(playerIndex: number): PlayerState {
		return this.gameState.players[playerIndex];
	}

	public static isPlayersTurn(playerIndex: number): boolean {
		return this.gameState.whosTurn === playerIndex;
	}

	public static getPlayPhase(): PlayPhase {
		return this.gameState.playPhase;
	}
};
