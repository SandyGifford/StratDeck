import "./App.style";

import * as React from "react";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import { GameState } from "../../typings/game";
import Server from "../../connection/Server";
import LoopUtils from "../../utils/LoopUtils";
import SimpleSelect, { SimpleSelectMakeLabel, SimpleSelectChangedHandler } from "../SimpleSelect/SimpleSelect";
import SimpleButton, { SimpleButtonClickHandler } from "../SimpleButton/SimpleButton";

export interface AppProps {
	gameState: GameState;
}
export interface AppState {
	myPlayerIndex: number;
	selectingPlayer: boolean;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			myPlayerIndex: 0,
			selectingPlayer: true,
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
		const { myPlayerIndex, selectingPlayer } = this.state;
		const { screen, players, playerCount } = gameState;

		if (selectingPlayer) {
			return <div className="App_playerPicker">
				<div className="App_playerPicker__header">which player are you?</div>
				<div className="App_playerPicker__content">
					<SimpleSelect
						className="App_playerPicker__content__select"
						items={LoopUtils.mapTimes(playerCount, p => p + 1)}
						makeLabel={this.makeSelectPlayerLabel}
						value={myPlayerIndex}
						onChange={this.changeSelectedPlayer} />
					<SimpleButton
						className="App_playerPicker__content__start"
						onClick={this.startGame}>
						start game
					</SimpleButton>
				</div>
			</div>
		} else {
			switch (screen) {
				case "characterSelect":
					return <CharacterSelect playerIndex={myPlayerIndex} />;
				case "table":
					return <PlayTable
						playersInit={players}
						boardWidth={30}
						boardHeight={20} />;
				default:
					return null; // should never be hit
			}
		}
	}

	private makeSelectPlayerLabel: SimpleSelectMakeLabel<number> = playerNumber => {
		const playerIndex = playerNumber - 1;
		const player = this.props.gameState.players[playerIndex];
		if (player && player.name) return player.name;
		return `player ${playerNumber}`;
	};

	private changeSelectedPlayer: SimpleSelectChangedHandler<number> = playerNumber => {
		this.setState({
			myPlayerIndex: playerNumber - 1,
		});
	};

	private startGame: SimpleButtonClickHandler = () => {
		this.setState({
			selectingPlayer: false,
		});
	};
}
