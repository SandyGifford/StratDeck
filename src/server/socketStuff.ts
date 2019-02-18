import { Server } from "http";

import GameState from "@typings/game";
import GameStateManager from "@server/gameStateManager";
import emitTypes from "@shared/emitTypes";
import { SetPlayerStateMessage } from "@typings/connection";

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);
	GameStateManager.init(io);

	io.emit(emitTypes.fromServer.gameReset);

	io.on("connection", socket => {
		console.log(`a user connected (${socket.handshake.address})`);

		socket.emit(emitTypes.fromServer.playerConnected, GameStateManager.getGameState());

		socket.on(emitTypes.toServer.updateGameState, (newGameState: GameState) => {
			console.log("updating game state", newGameState);

			GameStateManager.updateGameState(newGameState);
		});

		socket.on(emitTypes.toServer.resetGame, (newGameState: GameState) => {
			console.log("resetting game", newGameState);

			GameStateManager.updateGameState(newGameState, "game state reset");
		});

		socket.on("set player state", (playerInfo: SetPlayerStateMessage) => {
			console.log("setting player state", playerInfo);

			GameStateManager.setPlayerState(playerInfo.playerIndex, playerInfo.playerState);
		});
	});
};
