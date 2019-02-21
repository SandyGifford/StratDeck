import { Server } from "http";

import GameStateManager from "@server/GameStateManager";
import emitTypes from "@shared/emitTypes";
import ConnectedPlayer from "./ConnectedPlayer";
import { ImmutableGameState } from "@typings/game";

const { fromServer } = emitTypes;

export default (server: Server) => {
	const io: SocketIO.Server = require("socket.io")(server);

	GameStateManager.addResetListener((gameState: ImmutableGameState) => io.emit(fromServer.gameReset, gameState.toJS()));
	GameStateManager.addUpdateListener((gameState: ImmutableGameState) => io.emit(fromServer.gameStateUpdated, gameState.toJS()));

	io.emit(fromServer.gameReset);

	io.on("connection", socket => {
		new ConnectedPlayer(socket);
	});
};
