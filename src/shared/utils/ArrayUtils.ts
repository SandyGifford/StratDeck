import * as Immutable from "immutable";
import { ImmutalizerList } from "@typings/immutalizer";

export default class ArrayUtils {
	public static shuffle<T>(arr: T[]): T[] {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}
	public static shuffleImmutable<T>(arr: ImmutalizerList<T[]>): ImmutalizerList<T[]> {
		// ughhh
		return Immutable.fromJS(this.shuffle(arr.toJS()));
	}
}