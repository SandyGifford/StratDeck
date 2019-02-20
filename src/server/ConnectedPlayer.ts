import GameStateManager from "./GameStateManager";
import emitTypes from "@shared/emitTypes";
import { PlayerState, CardType } from "@typings/game";
import ArrayUtils from "@utils/ArrayUtils";
import LoopUtils from "@utils/LoopUtils";
import PlayerUtils from "@utils/PlayerUtils";

const { fromServer, toServer } = emitTypes;

export default class ConnectedPlayer {
	private playerIndex: number;
	private playerName: string;

	constructor(private socket: SocketIO.Socket) {
		console.log(`${this.getPlayerDisplayText()} connected`);

		socket.emit(fromServer.playerConnected, GameStateManager.getGameState());

		socket.on(toServer.resetGame, this.resetGame);
		socket.on(toServer.initializePlayer, this.initialize);
		socket.on(toServer.takeTurn, this.takeTurn);
	}

	private resetGame = (playerCount: number) => {
		console.log(`${this.getPlayerDisplayText()} reset the game with ${playerCount} player${playerCount === 1 ? "" : "s"}`);

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

	private initialize = (playerIndex: number, partialPlayerState: Pick<PlayerState, "chars" | "name">) => {
		console.log(`initializing player ${playerIndex + 1}`, partialPlayerState);

		const player = GameStateManager.getPlayer(playerIndex);

		if (player) {
			console.log(`Attempt to initialize player ${playerIndex + 1} failed.  Player is already initialized.`);
			return;
		}

		this.playerIndex = playerIndex;
		this.playerName = partialPlayerState.name;

		const playerState: PlayerState = {
			...partialPlayerState,
			hand: [],
			deck: ArrayUtils.shuffle([
				...this.makeCards(6, "hand"),
				...this.makeCards(4, "weapon")
			]),
			discard: [],
		};

		PlayerUtils.dealCards(playerState, 5);

		const waitinOnCount = GameStateManager.initializePlayer(playerIndex, playerState);

		console.log(
			`Player ${this.getPlayerNumber()} (${partialPlayerState.name}) has selected characters, ` + (
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

	private getPlayerDisplayText(): string {
		return this.getNumberedPlayerText() + `(${typeof this.playerName === "string" ? `${this.playerName} @ ` : ""}${this.getAddress()})`
	}

	private getNumberedPlayerText(noTrailingSpace?: boolean): string {
		const playerNumber = this.getPlayerNumber();
		return playerNumber ? `player ${playerNumber}${noTrailingSpace ? "" : " "}` : ""
	}

	private getAddress(): string {
		return this.socket.handshake.address;
	}

	private makeCards(num: number, type: CardType): CardType[] {
		return LoopUtils.mapTimes(num, () => type);
	}
}