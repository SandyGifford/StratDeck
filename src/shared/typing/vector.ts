import Immutalizer from "./immutalizer";

export interface Vector2 {
	x: number;
	y: number;
}


/**
 * Immutable interfaces
 */

export type ImmutableVector2 = Immutalizer<Vector2>;
