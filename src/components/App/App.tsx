import "./App.style";

import * as React from "react";

import CharacterSelect, { SetPlayers } from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import { GameScreen, PlayerState } from "../../typings/game";
import LoopUtils from "../../utils/LoopUtils";

export interface AppProps { }
export interface AppState {
	screen: GameScreen;
	players: PlayerState[];
}

export default class App extends React.PureComponent<AppProps, AppState> {
	private static readonly NUMBER_OF_PLAYERS = 4;

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
		const { screen, players } = this.state;

		switch (screen) {
			case "characterSelect":
				return <CharacterSelect setPlayerCharacters={this.setCharacters} numberOfPlayers={App.NUMBER_OF_PLAYERS} />;
			case "table":
				return <PlayTable
					playersInit={players}
					boardWidth={30}
					boardHeight={20} />;
		}
	}

	private setCharacters: SetPlayers = (newPlayers) => {
		this.setState({
			players: newPlayers,
			screen: "table",
		});
	};
}