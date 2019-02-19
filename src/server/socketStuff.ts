import { Server } from "http";

import GameStateManager from "@server/GameStateManager";
import emitTypes from "@shared/emitTypes";
import ConnectedPlayer from "./ConnectedPlayer";

const { fromServer } = emitTypes;

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);

	GameStateManager.addResetListener(gameState => io.emit(fromServer.gameReset, gameState));
	GameStateManager.addUpdateListener(gameState => io.emit(fromServer.gameStateUpdated, gameState));

	io.emit(fromServer.gameReset);

	io.on("connection", socket => {
		new ConnectedPlayer(socket);
	});
};
