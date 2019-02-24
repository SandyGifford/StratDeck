import * as  React from "react";
import * as  ReactDOM from "react-dom";

import "./index.style";
import ServerConnect from "@client/connection/ServerConnect";
import { ImmutableGameState } from "@typings/game";
import App from "@components/App/App";

ServerConnect.addConnectedListener(render);
ServerConnect.addGameResetListener(render);

const target = document.createElement("div");
document.body.appendChild(target);

function render(gameState: ImmutableGameState): void {
	if (!gameState || gameState.isEmpty()) {
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
