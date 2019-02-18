const gameStateManager = require("./gameStateManager");


module.exports = (server) => {
	const io = require("socket.io")(server);
	gameStateManager.init(io);

	io.emit("game state reset");

	io.on("connection", socket => {
		console.log(`a user connected (${socket.handshake.address})`);

		socket.emit("connection made");

		socket.on("update game state", newGameState => {
			console.log("updating game state", newGameState);

			gameStateManager.updateGameState(newGameState);
		});

		socket.on("reset game state", newGameState => {
			console.log("resetting game", newGameState);

			gameStateManager.updateGameState(newGameState, "game state reset");
		});

		socket.on("set player state", playerInfo => {
			console.log("setting player state", playerInfo);
			const gameState = gameStateManager.getGameState();
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

			gameStateManager.updatePartialGameState({
				players: players,
				screen: allPicked ? "table" : "characterSelect",
			});
		});
	});
};
