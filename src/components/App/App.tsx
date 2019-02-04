import "./App.style";

import * as React from "react";

import CharacterSelect, { SetPlayers } from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import { GameState } from "../../typings/game";

export type UpdateGameState = (gameState: Partial<GameState>) => void;

export interface AppProps {
	gameState: GameState;
	updateGameState: UpdateGameState;
}
export interface AppState { }

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			screen: "characterSelect",
			players: [],
		};
	}

	public render(): React.ReactNode {
		return (
			<div className="App">
				{this.renderScreen()}
			</div>
		)
	}

	private renderScreen(): React.ReactNode {
		const { gameState } = this.props;
		const { screen, players } = gameState;

		switch (screen) {
			case "characterSelect":
				return <CharacterSelect setPlayerCharacters={this.setCharacters} numberOfPlayers={gameState.playerCount} />;
			case "table":
				return <PlayTable
					playersInit={players}
					boardWidth={30}
					boardHeight={20} />;
		}
	}

	private setCharacters: SetPlayers = (newPlayers) => {
		const { updateGameState } = this.props;

		updateGameState({
			players: newPlayers,
			screen: "table",
		});
	};
}