import { Vector2 } from "@typings/vector";
import Immutalizer from "./immutalizer";

export type CharPositions = [Vector2, Vector2, Vector2];


/**
 * Immutable interfaces
 */

export type ImmutableCharPositions = Immutalizer<CharPositions>;
