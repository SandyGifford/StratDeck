import * as  React from "react";
import * as  ReactDOM from "react-dom";

import "./index.style";
import Server from "./connection/Server";
import { GameState } from "./typings/game";

import App from "./components/App/App";

Server.addConnectedListener(render);
Server.addGameUpdatedListener(render);
Server.addGameResetListener(render);

const target = document.createElement("div");
document.body.appendChild(target);

function render(gameState: GameState): void {
	if (!gameState) {
		Server.resetGame();
		return;
	}

	function updateGameState(newGameState: Partial<GameState>) {
		Server.updateGameState({
			...gameState,
			...newGameState,
		})
	}

	ReactDOM.render(
		<App
			gameState={gameState}
			updateGameState={updateGameState} />,
		target
	);
}
