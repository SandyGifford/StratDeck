import * as Immutable from "immutable";
import { ImmutalizerList } from "@typings/immutalizer";

export default class ArrayUtils {
	/**
	 * Shuffles the values in an array
	 * @param array an array
	 * @returns an array made up of the elements of array in random order
	 */
	public static shuffle<T>(array: T[]): T[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// TODO: rewrite this as a proper immutable function
	/**
	 * Shuffles the values in an Immutable LIst
	 * @param list an Immutable List
	 * @returns an Immutable List made up of the elements of list in random order
	 */
	public static shuffleImmutable<T>(list: ImmutalizerList<T[]>): ImmutalizerList<T[]> {
		// ughhh
		return Immutable.fromJS(this.shuffle(list.toJS()));
	}

	public static removeAtIndex<T>(array: T[], index: number, size = 1): T[] {
		return array.slice(0, index).concat(array.slice(index + size));
	}

	// TODO: positive I can do this in better time
	/**
	 * Checks (with strict equals) if all values in array are unique
	 * @param arr an array
	 * @returns true if all values in array are unique, otherwise false
	 */
	public static hasOnlyUniqueValues<T>(arr: T[]): boolean {
		return arr.every((val, index) => {
			const trimmed = this.removeAtIndex(arr, index);
			return !trimmed.includes(val);
		});
	}
}