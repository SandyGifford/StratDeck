import { PlayerState } from "./game";

export interface SetPlayerStateMessage {
	playerIndex: number,
	playerState: PlayerState,
}