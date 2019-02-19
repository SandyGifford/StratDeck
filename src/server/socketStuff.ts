import { Server } from "http";

import { CardType, PlayerState } from "@typings/game";
import GameStateManager from "@server/gameStateManager";
import emitTypes from "@shared/emitTypes";

const { fromServer, toServer } = emitTypes;

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);

	GameStateManager.addResetListener(gameState => io.emit(fromServer.gameReset, gameState));
	GameStateManager.addUpdateListener(gameState => io.emit(fromServer.gameStateUpdated, gameState));

	io.emit(fromServer.gameReset);

	io.on("connection", socket => {
		console.log(`a user connected (${socket.handshake.address})`);

		let connectedPlayerIndex: number = null;

		function isMyTurn(): boolean {
			return GameStateManager.isPlayersTurn(connectedPlayerIndex);
		}

		socket.emit(fromServer.playerConnected, GameStateManager.getGameState());

		socket.on(toServer.resetGame, (playerCount: number) => {
			console.log(`resetting game with ${playerCount} players`);

			GameStateManager.resetGame(playerCount);
		});

		socket.on(toServer.initializePlayer, (playerIndex: number, playerState: PlayerState) => {
			console.log(`initializing player ${playerIndex + 1}`, playerState);

			const player = GameStateManager.getPlayer(playerIndex);

			if (player) {
				console.log(`Attempt to initialize player ${playerIndex + 1} failed.  Player is already initialized.`);
				return;
			}

			connectedPlayerIndex = playerIndex;
			const waitinOnCount = GameStateManager.initializePlayer(playerIndex, playerState);

			console.log(
				`Player ${playerIndex + 1} (${playerState.name}) has selected characters, ` + (
					waitinOnCount === 0 ? "all players ready" : (
						`still waiting on ${waitinOnCount} player` + (waitinOnCount === 1 ? "" : "s")
					)
				)
			);
		});

		socket.on(toServer.takeTurn, (boughtCard: CardType) => {
			if (!isMyTurn()) {
				console.log(`Player ${connectedPlayerIndex + 1} tried to take a turn illegally.`);
				return;
			}

			console.log(`Player ${connectedPlayerIndex + 1} took a turn and bought a ${boughtCard} card.`);

			GameStateManager.takeTurn(connectedPlayerIndex, boughtCard);
		});
	});
};
