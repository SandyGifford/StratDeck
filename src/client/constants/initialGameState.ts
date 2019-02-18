import GameState from "@shared/typing/game";
import LoopUtils from "@client/utils/LoopUtils";

const initialGameState = (playerCount: number): GameState => ({
	players: LoopUtils.mapTimes(playerCount, () => null),
	screen: "characterSelect",
	playerCount: playerCount,
	whosTurn: 0,
});

export default initialGameState;