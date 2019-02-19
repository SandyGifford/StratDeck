import GameStateManager from "./GameStateManager";
import emitTypes from "@shared/emitTypes";
import { PlayerState, CardType } from "@typings/game";

const { fromServer, toServer } = emitTypes;

export default class ConnectedPlayer {
	private playerIndex: number;

	constructor(private socket: SocketIO.Socket) {
		console.log(`a user connected (${this.getAddress()})`);

		socket.emit(fromServer.playerConnected, GameStateManager.getGameState());

		socket.on(toServer.resetGame, this.resetGame);
		socket.on(toServer.initializePlayer, this.initialize);
		socket.on(toServer.takeTurn, this.takeTurn);
	}

	private resetGame = (playerCount: number) => {
		const playerNumber = this.getPlayerNumber();
		console.log(`${this.getAddress()} ${playerNumber ? `(player ${playerNumber}) ` : ""}reset the game with ${playerCount} player${playerCount === 1 ? "" : "s"}`);

		GameStateManager.resetGame(playerCount);
	};

	private takeTurn = (boughtCard: CardType) => {
		if (!this.isMyTurn()) {
			console.log(`Player ${this.getPlayerNumber()} tried to take a turn illegally.`);
			return;
		}

		console.log(`Player ${this.getPlayerNumber()} took a turn and bought a ${boughtCard} card.`);

		GameStateManager.takeTurn(this.playerIndex, boughtCard);
	};

	private initialize = (playerIndex: number, playerState: PlayerState) => {
		console.log(`initializing player ${playerIndex + 1}`, playerState);

		const player = GameStateManager.getPlayer(playerIndex);

		if (player) {
			console.log(`Attempt to initialize player ${playerIndex + 1} failed.  Player is already initialized.`);
			return;
		}

		this.playerIndex = playerIndex;
		const waitinOnCount = GameStateManager.initializePlayer(playerIndex, playerState);

		console.log(
			`Player ${this.getPlayerNumber()} (${playerState.name}) has selected characters, ` + (
				waitinOnCount === 0 ? "all players ready" : (
					`still waiting on ${waitinOnCount} player` + (waitinOnCount === 1 ? "" : "s")
				)
			)
		);
	}

	private getPlayerNumber(): number {
		return this.playerIndex + 1;
	}

	private isMyTurn(): boolean {
		return GameStateManager.isPlayersTurn(this.playerIndex);
	}

	private getAddress(): string {
		return this.socket.handshake.address;
	}
}