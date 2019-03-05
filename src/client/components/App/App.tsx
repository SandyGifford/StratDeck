import "./App.style";

import * as React from "react";
import { ImmutableGameState } from "@typings/game";
import PopMessage from "@components/PopMessage/PopMessage";
import SimpleSelect, { SimpleSelectMakeLabel, SimpleSelectChangedHandler } from "@components/SimpleSelect/SimpleSelect";
import LoopUtils from "@utils/LoopUtils";
import SimpleButton, { SimpleButtonClickHandler } from "@components/SimpleButton/SimpleButton";
import CharacterSelect from "@components/CharacterSelect/CharacterSelect";
import PlayTable from "@components/PlayTable/PlayTable";
import ServerConnect, { PlayerIndexAssignedEventHandler } from "@client/connection/ServerConnect";


export interface AppProps {
	initialGameState: ImmutableGameState;
	boardWidth: number;
	boardHeight: number;
}
export interface AppState {
	gameState: ImmutableGameState;
	myPlayerIndex: number;
	selectingPlayer: boolean;
}

export default class App extends React.PureComponent<AppProps, AppState> {
	private static readonly LS_PLAYER_INDEX_KEY = "playerIndex";

	constructor(props: AppProps) {
		super(props);

		this.state = {
			...this.getDefaultState(),
			gameState: props.initialGameState,
		};
	}

	public componentDidMount() {
		ServerConnect.addGameUpdatedListener(this.gameStateUpdated);
		ServerConnect.addGameResetListener(this.gameReset);
		ServerConnect.addPlayerIndexAssignedListener(this.playerIndexAssigned);
	}

	public componentWillUnmount() {
		ServerConnect.removeGameUpdatedListener(this.gameStateUpdated);
		ServerConnect.removeGameResetListener(this.gameReset);
		ServerConnect.removePlayerIndexAssignedListener(this.playerIndexAssigned);
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
		const { boardHeight, boardWidth } = this.props;
		const { myPlayerIndex, selectingPlayer, gameState } = this.state;
		const screen = gameState.get("screen");
		const players = gameState.get("players");
		const playerCount = gameState.get("playerCount");

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
						boardWidth={boardWidth}
						boardHeight={boardHeight}
						playerIndex={myPlayerIndex}
						alreadySelected={!!players.get(myPlayerIndex)} />;
				case "table":
					return <PlayTable
						gameState={gameState}
						myPlayerIndex={myPlayerIndex} />;
				default:
					return null; // should never be hit
			}
		}
	}

	private gameReset = (gameState: ImmutableGameState): void => {
		this.setState({
			...this.getDefaultState(),
			gameState: gameState,
		});
	};

	private gameStateUpdated = (gameState: ImmutableGameState): void => {
		this.setState({
			gameState: gameState,
		});
	};

	private getLastPlayerIndex(): number {
		return parseInt(window.sessionStorage.getItem(App.LS_PLAYER_INDEX_KEY));
	}

	private getDefaultState(): AppState {
		return {
			gameState: null,
			myPlayerIndex: this.getLastPlayerIndex() || 0,
			selectingPlayer: true,
		}
	}

	private playerIndexAssigned: PlayerIndexAssignedEventHandler = playerIndex => {
		this.setState({
			myPlayerIndex: playerIndex,
		});
	};

	private makeSelectPlayerLabel: SimpleSelectMakeLabel<number> = playerIndex => {
		const player = this.state.gameState.get("players").get(playerIndex);
		if (player) {
			return player.get("name");
		}

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
