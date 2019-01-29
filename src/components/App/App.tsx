import "./App.style";

import * as React from "react";

import CharacterSelect, { SetPlayerCharacters } from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import { GameScreen, PlayerState } from "../../typings/game";
import LoopUtils from "../../utils/LoopUtils";

export interface AppProps { }
export interface AppState {
	screen: GameScreen;
	players: PlayerState[];
}

export default class App extends React.PureComponent<AppProps, AppState> {
	private static readonly NUMBER_OF_PLAYERS = 2;

	constructor(props: AppProps) {
		super(props);
		this.state = {
			screen: "characterSelect",
			players: LoopUtils.mapTimes(App.NUMBER_OF_PLAYERS, (): PlayerState => ({ chars: [null, null, null] })),
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

	private setCharacters: SetPlayerCharacters = (playerChars) => {
		const { players } = this.state;

		const newPlayers = [...players];

		newPlayers.forEach((player, index) => player.chars = playerChars[index]);

		this.setState({
			players: newPlayers,
			screen: "table",
		});
	};
}