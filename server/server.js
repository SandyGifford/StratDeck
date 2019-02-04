console.clear();

const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const SocketWrench = require("./SocketWrenchServer");

SocketWrench(io, {
	testEvent: (data, resolve) => {
		resolve();
	}
});

let gameState = null;

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../dist/index.html")));
app.get("/assets/*", (req, res) => res.sendFile(path.join(__dirname, "../dist", req.url)));
app.get("/build/*", (req, res) => res.sendFile(path.join(__dirname, "../dist", req.url)));

io.on("connection", socket => {
	console.log(`a user connected (${socket.handshake.address})`);

	socket.emit("connection made", gameState);

	socket.on("update game state", newGameState => {
		console.log("updating game state", newGameState);

		gameState = newGameState;
		io.emit("game state updated", gameState);
	});

	socket.on("reset game state", (initialGameState) => {
		console.log("resetting game state");

		gameState = initialGameState;
		io.emit("game state reset", gameState);
	});
});


server.listen(3000);
