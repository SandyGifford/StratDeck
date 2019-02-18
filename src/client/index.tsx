import * as  React from "react";
import * as  ReactDOM from "react-dom";

import "./index.style";
import Server from "@client/connection/Server";
import GameState from "@shared/typing/game";
import App from "@components/App/App";

Server.addConnectedListener(render);
Server.addGameUpdatedListener(render);
Server.addGameResetListener(render);

const target = document.createElement("div");
document.body.appendChild(target);

function render(gameState: GameState): void {
	if (!gameState) {
		Server.resetGame(2);
		return;
	}

	ReactDOM.render(
		<App gameState={gameState} />,
		target
	);
}
