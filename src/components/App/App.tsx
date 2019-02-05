import "./App.style";

import * as React from "react";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import { GameState } from "../../typings/game";
import LoopUtils from "../../utils/LoopUtils";
import Server from "../../connection/Server";

export interface AppProps {
	gameState: GameState;
}
export interface AppState {
	myPlayerIndex: number;
	newGamePlayerCount: number;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			myPlayerIndex: 0,
			newGamePlayerCount: props.gameState.playerCount,
		};
	}

	public render(): React.ReactNode {
		const { newGamePlayerCount } = this.state;

		return (
			<div className="App">
				{this.renderScreen()}
				<div className="App__newGamePanel">
					<select className="App__newGamePanel__playerCountSelect" value={newGamePlayerCount} onChange={this.onNewGamePlayerCountChange}>
						{
							LoopUtils.mapTimes(3, p => <option
								className="App__newGamePanel__playerCountSelect__option"
								key={p}
								value={p + 2}>
								{p + 2} player{p + 2 > 1 ? "s" : ""}
							</option>)
						}
					</select>
					<div className="App__newGamePanel__start" onClick={this.resetGame}>start</div>
				</div>
			</div>
		)
	}

	private renderScreen(): React.ReactNode {
		const { gameState } = this.props;
		const { myPlayerIndex } = this.state;
		const { screen, players } = gameState;

		switch (screen) {
			case "characterSelect":
				return <CharacterSelect playerIndex={myPlayerIndex} />;
			case "table":
				return <PlayTable
					playersInit={players}
					boardWidth={30}
					boardHeight={20} />;
		}
	}

	private onNewGamePlayerCountChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
		this.setState({
			newGamePlayerCount: parseInt(e.target.value, 10),
		});
	};

	private resetGame = () => {
		Server.resetGame(this.state.newGamePlayerCount);
	};
}
