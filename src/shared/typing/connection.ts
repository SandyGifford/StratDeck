import { Vector2 } from "@typings/vector";
import Immutalizer from "./immutalizer";

export type MoveCharsMessage = [Vector2, Vector2, Vector2];


/**
 * Immutable interfaces
 */

export type ImmutableMoveCharsMessage = Immutalizer<MoveCharsMessage>;
