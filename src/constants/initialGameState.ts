import { GameState } from "../typings/game";

const initialGameState: GameState = {
	players: [],
	screen: "characterSelect",
	playerCount: 2,
	whosTurn: 0,
};

export default initialGameState;