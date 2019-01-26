import "./App.style";

import * as React from "react";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import GameState from "../../typings/game";

export interface AppProps { }
export interface AppState {
	gameState: GameState;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			gameState: {
				screen: "characterSelect",
			}
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
		const { screen } = this.state.gameState;

		switch (screen) {
			case "characterSelect":
				return <CharacterSelect />;
			case "table":
				return <PlayTable />;
		}
	}
}