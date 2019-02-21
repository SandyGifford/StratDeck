import * as Immutable from "immutable";

import GameState, { ImmutableGameState } from "@typings/game";
import LoopUtils from "@utils/LoopUtils";

const initialGameState = (playerCount: number): GameState => ({
	players: LoopUtils.mapTimes(playerCount, () => null),
	playerReadyState: LoopUtils.mapTimes(playerCount, () => false),
	screen: "characterSelect",
	playerCount: playerCount,
	playPhase: "buy",
	whosTurn: 0,
	boardHeight: 20,
	boardWidth: 30,
});

export const immutableInitialGameState = (playerCount: number): ImmutableGameState => Immutable.fromJS(initialGameState(playerCount));
export default initialGameState;
