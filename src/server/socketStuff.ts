import { Server } from "http";

import GameState from "@typings/game";
import GameStateManager from "@server/gameStateManager";
import emitTypes from "@shared/emitTypes";
import { SetPlayerStateMessage } from "@typings/connection";
import initialGameState from "./initialGameState";

const { fromServer, toServer } = emitTypes;

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);
	GameStateManager.init(io);

	io.emit(fromServer.gameReset);

	io.on("connection", socket => {
		console.log(`a user connected (${socket.handshake.address})`);

		socket.emit(fromServer.playerConnected, GameStateManager.getGameState());

		socket.on(toServer.updateGameState, (newGameState: GameState) => {
			console.log("updating game state", newGameState);

			GameStateManager.updateGameState(newGameState);
		});

		socket.on(toServer.resetGame, (playerCount: number) => {
			console.log(`resetting game with ${playerCount} players`);

			GameStateManager.updateGameState(initialGameState(playerCount), fromServer.gameReset);
		});

		socket.on("set player state", (playerInfo: SetPlayerStateMessage) => {
			console.log("setting player state", playerInfo);

			GameStateManager.setPlayerState(playerInfo.playerIndex, playerInfo.playerState);
		});
	});
};
