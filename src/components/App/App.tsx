import "./App.style";

import * as React from "react";

import CharacterSelect, { SetSelectedCharacters } from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import { GameScreen, PlayerState } from "../../typings/game";

export interface AppProps { }
export interface AppState {
	screen: GameScreen;
	p1: PlayerState;
	p2: PlayerState;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			screen: "characterSelect",
			p1: {
				chars: [null, null, null],
			},
			p2: {
				chars: [null, null, null],
			},
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
		const { screen } = this.state;

		switch (screen) {
			case "characterSelect":
				return <CharacterSelect setSelectedCharacters={this.setP1Chars} />;
			case "table":
				return <PlayTable />;
		}
	}

	private setP1Chars: SetSelectedCharacters = (chars) => {
		const { p1 } = this.state;

		this.setState({
			screen: "table",
			p1: {
				...p1,
				chars: chars,
			}
		})
	};
}