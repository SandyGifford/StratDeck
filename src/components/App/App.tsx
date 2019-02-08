import "./App.style";

import * as React from "react";

import CharacterSelect from "../CharacterSelect/CharacterSelect";
import PlayTable from "../PlayTable/PlayTable";
import { GameState } from "../../typings/game";
import LoopUtils from "../../utils/LoopUtils";
import SimpleSelect, { SimpleSelectMakeLabel, SimpleSelectChangedHandler } from "../SimpleSelect/SimpleSelect";
import SimpleButton, { SimpleButtonClickHandler } from "../SimpleButton/SimpleButton";
import PopMessage from "../PopMessage/PopMessage";

export interface AppProps {
	gameState: GameState;
}
export interface AppState {
	myPlayerIndex: number;
	selectingPlayer: boolean;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	private static readonly LS_PLAYER_INDEX_KEY = "playerIndex";

	constructor(props: AppProps) {
		super(props);

		const lastPlayerIndex = parseInt(window.sessionStorage.getItem(App.LS_PLAYER_INDEX_KEY));

		this.state = {
			myPlayerIndex: lastPlayerIndex || 0,
			selectingPlayer: true,
		};
	}

	public render(): React.ReactNode {
		return (
			<div className="App">
				<PopMessage />
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
						items={LoopUtils.mapTimes(playerCount, p => p)}
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
					return <CharacterSelect
						playerIndex={myPlayerIndex}
						alreadySelected={!!players[myPlayerIndex]} />;
				case "table":
					return <PlayTable
						playersInit={players}
						myPlayerIndex={myPlayerIndex}
						boardWidth={30}
						boardHeight={20} />;
				default:
					return null; // should never be hit
			}
		}
	}

	private makeSelectPlayerLabel: SimpleSelectMakeLabel<number> = playerIndex => {
		const player = this.props.gameState.players[playerIndex];
		if (player && player.name) return player.name;
		return `player ${playerIndex + 1}`;
	};

	private changeSelectedPlayer: SimpleSelectChangedHandler<number> = playerIndex => {
		window.sessionStorage.setItem(App.LS_PLAYER_INDEX_KEY, playerIndex + "");

		this.setState({
			myPlayerIndex: playerIndex,
		});
	};

	private startGame: SimpleButtonClickHandler = () => {
		this.setState({
			selectingPlayer: false,
		});
	};
}
