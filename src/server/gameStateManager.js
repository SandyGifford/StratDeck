
let gameState = null;
let io;

const gameStateManager = {
	init: (ioInit) => {
		io = ioInit;
	},
	updateGameState: (newGameState, emitEvent) => {
		gameState = newGameState;
		io.emit(emitEvent || "game state updated", gameState);
	},
	updatePartialGameState: (partialGameState, emitEvent) => {
		const newState = {
			...gameState,
		};

		Object.keys(partialGameState).forEach(key => {
			newState[key] = partialGameState[key];
		});

		gameStateManager.updateGameState(newGameState, emitEvent);
	},
	getGameState: () => {
		return gameState;
	},
};

module.exports = gameStateManager;
