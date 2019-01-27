import "./App.style";

import * as React from "react";

import CharacterSelect, { SetSelectedCharacters } from "../CharacterSelect/CharacterSelect";
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
				p1: {
					chars: [null, null, null],
				},
				p2: {
					chars: [null, null, null],
				},
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
				return <CharacterSelect setSelectedCharacters={this.setP1Chars} />;
			case "table":
				return <PlayTable />;
		}
	}

	private setP1Chars: SetSelectedCharacters = (chars) => {
		const { gameState } = this.state;

		this.setState({
			gameState: {
				...gameState,
				screen: "table",
				p1: {
					...gameState.p1,
					chars: chars,
				}
			}
		})
	};
}