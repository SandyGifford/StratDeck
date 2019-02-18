console.clear();

const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

let gameState = null;

function updateGameState(newGameState) {
	gameState = newGameState;
	io.emit("game state updated", gameState);
}

io.on("connection", socket => {
	console.log(`a user connected (${socket.handshake.address})`);

	socket.emit("connection made", gameState);

	socket.on("update game state", newGameState => {
		console.log("updating game state", newGameState);

		updateGameState(newGameState);
	});

	socket.on("reset game state", newGameState => {
		console.log("resetting game", newGameState);

		updateGameState(newGameState);
	});

	socket.on("set player state", playerInfo => {
		console.log("setting player state", playerInfo);
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

		updateGameState({
			...gameState,
			players: players,
			screen: allPicked ? "table" : "characterSelect",
		});
	});
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../dist/index.html")));
app.get("/assets/*", (req, res) => res.sendFile(path.join(__dirname, "../dist", req.url)));
app.get("/build/*", (req, res) => res.sendFile(path.join(__dirname, "../dist", req.url)));


server.listen(3000, "0.0.0.0");
