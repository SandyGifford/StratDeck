import * as  React from "react";
import * as  ReactDOM from "react-dom";

import "./index.style";
import Server from "./connection/Server";
import { GameState } from "./typings/game";

import App from "./components/App/App";

Server.addConnectedListener(render);
Server.addGameUpdatedListener(render);

const target = document.createElement("div");
document.body.appendChild(target);

function render(gameState: GameState): void {
	if (!gameState) {
		Server.resetGame(3);
		return;
	}

	ReactDOM.render(
		<App gameState={gameState} />,
		target
	);
}
