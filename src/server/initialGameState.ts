import GameState from "@typings/game";
import LoopUtils from "@utils/LoopUtils";

const initialGameState = (playerCount: number): GameState => ({
	players: LoopUtils.mapTimes(playerCount, () => null),
	playerReadyState: LoopUtils.mapTimes(playerCount, () => false),
	screen: "characterSelect",
	playerCount: playerCount,
	whosTurn: 0,
	boardHeight: 20,
	boardWidth: 30,
});

export default initialGameState;