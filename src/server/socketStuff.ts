import { Server } from "http";

import GameStateManager from "@server/GameStateManager";
import emitTypes from "@shared/emitTypes";
import ConnectedPlayer from "./ConnectedPlayer";
import { ImmutableGameState } from "@typings/game";

const { fromServer } = emitTypes;

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);

	GameStateManager.addResetListener((gameState: ImmutableGameState) => {
		const jsGS = gameState.toJS();
		console.log("resetting game state", jsGS);
		io.emit(fromServer.gameReset, jsGS);
	});
	GameStateManager.addUpdateListener((gameState: ImmutableGameState) => {
		const jsGS = gameState.toJS();
		console.log("updating game state", jsGS);
		io.emit(fromServer.gameStateUpdated, jsGS);
	});

	io.emit(fromServer.gameReset);

	io.on("connection", socket => {
		new ConnectedPlayer(socket);
	});
};
