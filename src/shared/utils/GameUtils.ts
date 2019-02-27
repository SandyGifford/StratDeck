import { ImmutableGameState } from "@typings/game";
import { Vector2 } from "@typings/vector";
import PlayerUtils from "./PlayerUtils";

export default class Gameutils {
	public static moveChar(gameState: ImmutableGameState, playerIndex: number, charIndex: number, move: Vector2): ImmutableGameState {
		const players = PlayerUtils.moveCharInPlayers(gameState.get("players"), playerIndex, charIndex, move);
		return gameState.set("players", players);
	}
}