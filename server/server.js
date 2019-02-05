console.clear();

const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const SocketWrench = require("./SocketWrenchServer");

let gameState = null;

function updateGameState(newGameState) {
	gameState = newGameState;
	io.emit("game state updated", gameState);
}

SocketWrench(io, {
	getGameState: (data, resolve) => {
		resolve(gameState);
	},
	setPlayerState: (data, resolve) => {
		const players = gameState.players;
		players[data.playerIndex] = data.playerState;
		const allPicked = players.every(player => !player);

		updateGameState({
			...gameState, 
			players: players,
		});

		resolve();
	}
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../dist/index.html")));
app.get("/assets/*", (req, res) => res.sendFile(path.join(__dirname, "../dist", req.url)));
app.get("/build/*", (req, res) => res.sendFile(path.join(__dirname, "../dist", req.url)));

io.on("update game state", newGameState => {
	console.log("updating game state", newGameState);

	gameState = newGameState;
	io.emit("game state updated", gameState);
});

io.on("connection", socket => {
	console.log(`a user connected (${socket.handshake.address})`);

	socket.emit("connection made", gameState);

	socket.on("update game state", newGameState => {
		console.log("updating game state", newGameState);

		updateGameState(newGameState);
	});
});


server.listen(3000);
