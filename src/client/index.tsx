import * as  React from "react";
import * as  ReactDOM from "react-dom";

import "./index.style";
import ServerConnect from "@client/connection/ServerConnect";
import GameState from "@typings/game";
import App from "@components/App/App";

ServerConnect.addConnectedListener(render);

const target = document.createElement("div");
document.body.appendChild(target);

function render(gameState: GameState): void {
	if (!gameState) {
		ServerConnect.resetGame(2);
		return;
	}

	ReactDOM.render(
		<App
			boardHeight={20}
			boardWidth={30}
			initialGameState={gameState} />,
		target
	);
}
