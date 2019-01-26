export default interface GameState {
	screen: GameScreen;
}

export type GameScreen = "table" | "characterSelect";