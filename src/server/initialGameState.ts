import GameState from "@typings/game";
import LoopUtils from "@utils/LoopUtils";

const initialGameState = (playerCount: number): GameState => ({
	players: LoopUtils.mapTimes(playerCount, () => null),
	screen: "characterSelect",
	playerCount: playerCount,
	whosTurn: 0,
});

export default initialGameState;