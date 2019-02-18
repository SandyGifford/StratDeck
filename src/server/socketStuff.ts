import { Server } from "http";

import GameState from "@typings/game";
import GameStateManager from "@server/gameStateManager";

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);
	GameStateManager.init(io);

	io.emit("game state reset");

	io.on("connection", socket => {
		console.log(`a user connected (${socket.handshake.address})`);

		socket.emit("connection made");

		socket.on("update game state", (newGameState: GameState) => {
			console.log("updating game state", newGameState);

			GameStateManager.updateGameState(newGameState);
		});

		socket.on("reset game state", (newGameState: GameState) => {
			console.log("resetting game", newGameState);

			GameStateManager.updateGameState(newGameState, "game state reset");
		});

		socket.on("set player state", (playerInfo) => {
			console.log("setting player state", playerInfo);
			const gameState = GameStateManager.getGameState();
			const { playerIndex, playerState } = playerInfo;
			const { players } = gameState;

			players[playerIndex] = playerState;

			const waitingOnPlayers = players.reduce((playerCount, player) => {
				if (player) playerCount--;
				return playerCount;
			}, players.length);
			const allPicked = waitingOnPlayers === 0;

			console.log(
				`Player ${playerIndex + 1} (${playerState.name}) has selected characters, ` + (
					allPicked ? "all players ready" : (
						`still waiting on ${waitingOnPlayers} player` + (waitingOnPlayers === 1 ? "" : "s")
					)
				)
			);

			GameStateManager.updatePartialGameState({
				players: players,
				screen: allPicked ? "table" : "characterSelect",
			});
		});
	});
};
