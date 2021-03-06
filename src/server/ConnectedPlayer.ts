import * as Immutable from "immutable";

import GameStateManager from "./GameStateManager";
import emitTypes from "@shared/emitTypes";
import { PlayerState, CardType, DeckState, ImmutablePlayerState } from "@typings/game";
import ArrayUtils from "@utils/ArrayUtils";
import LoopUtils from "@utils/LoopUtils";
import { Vector2 } from "@typings/vector";
import CardUtils from "@utils/CardUtils";

const { fromServer, toServer } = emitTypes;

export default class ConnectedPlayer {
	private playerIndex: number;
	private playerName: string;

	constructor(private socket: SocketIO.Socket) {
		console.log(`${this.getPlayerDisplayText()} connected`);

		socket.emit(fromServer.playerConnected, GameStateManager.getGameState());

		socket.on(toServer.resetGame, this.resetGame);
		socket.on(toServer.setPlayerIndex, this.setPlayerIndex);
		socket.on(toServer.initializePlayer, this.initialize);
		socket.on(toServer.buyCard, this.buyCard);
		socket.on(toServer.moveChar, this.moveChar);
	}

	private resetGame = (playerCount: number) => {
		console.log(`${this.getPlayerDisplayText()} reset the game with ${playerCount} player${playerCount === 1 ? "" : "s"}`);

		GameStateManager.resetGame(playerCount);
	};

	private buyCard = (boughtCard: CardType) => {
		if (!this.isMyTurn()) {
			console.log(`Player ${this.getPlayerNumber()} tried to buy a card out of turn.`);
			return;
		}

		const playPhase = GameStateManager.getPlayPhase();

		if (playPhase !== "buy") {
			console.log(`Player ${this.getPlayerNumber()} tried to buy a card but play phase is ${playPhase}.`);
			return;
		}

		console.log(`Player ${this.getPlayerNumber()} bought a ${boughtCard} card.`);

		GameStateManager.buyCard(this.playerIndex, boughtCard);
		GameStateManager.setPlayPhase("move");
	};

	private moveChar = (charIndex: number, move: Vector2) => {
		if (!this.isMyTurn()) {
			console.log(`Player ${this.getPlayerNumber()} tried to move their char ${charIndex + 1} out of turn.`);
			return;
		}

		if (GameStateManager.getCharDidMoveThisTurn(this.playerIndex, charIndex)) {
			console.log(`Player ${this.getPlayerNumber()} tried to move their char ${charIndex + 1} but that char has moved already.`);
			return
		}

		const playPhase = GameStateManager.getPlayPhase();

		if (playPhase !== "move") {
			console.log(`Player ${this.getPlayerNumber()} tried to move their chars but play phase is ${playPhase}.`);
			return;
		}

		console.log(`Player ${this.getPlayerNumber()} moved char ${charIndex + 1} to (${move.x}, ${move.y}).`);

		const waitingOnChars = GameStateManager.moveChar(this.playerIndex, charIndex, move);
		const allMoved = waitingOnChars === 0;

		if (allMoved) {
			GameStateManager.setAllCharMovedThisTurn(this.playerIndex, false);
			GameStateManager.setPlayPhase("buy");
			GameStateManager.incrementTurn();
		}
	};

	private setPlayerIndex = (playerIndex: number) => {
		this.playerIndex = playerIndex;
		this.socket.emit(emitTypes.fromServer.playerIndexAssigned, playerIndex);
	};

	private initialize = (playerIndex: number, partialPlayerState: Pick<PlayerState, "chars" | "name">) => {
		console.log(`initializing player ${playerIndex + 1}`, partialPlayerState);

		const player = GameStateManager.getPlayer(playerIndex);

		if (player) {
			console.log(`Attempt to initialize player ${playerIndex + 1} failed.  Player is already initialized.`);
			return;
		}

		this.setPlayerIndex(playerIndex);

		this.playerName = partialPlayerState.name;

		let playerState: PlayerState = {
			...partialPlayerState,
			hand: [],
			deck: ArrayUtils.shuffle([
				...this.makeCards(6, "hand"),
				...this.makeCards(4, "weapon")
			]),
			discard: [],
		};

		let immutablePlayerState: ImmutablePlayerState = Immutable.fromJS(playerState);
		let waitingOnPlayers = GameStateManager.initializePlayer(playerIndex, immutablePlayerState);

		const allPicked = waitingOnPlayers === 0;
		GameStateManager.setGameScreen(allPicked ? "table" : "characterSelect")

		console.log(
			`Player ${this.getPlayerNumber()} (${partialPlayerState.name}) has selected characters, ` + (
				waitingOnPlayers === 0 ? "all players ready" : (
					`still waiting on ${waitingOnPlayers} player` + (waitingOnPlayers === 1 ? "" : "s")
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

	private makeCards(num: number, type: CardType): DeckState {
		return LoopUtils.mapTimes(num, () => CardUtils.createCard(type));
	}
}