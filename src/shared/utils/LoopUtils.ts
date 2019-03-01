export default class LoopUtils {
	/**
	 * Creates an array of elements
	 * @param times the number of elements
	 * @param callback called once per element
	 * @returns array!
	 */
	public static mapTimes<T>(times: number, callback: (index: number) => T): T[] {
		const arr: T[] = [];

		for (let i = 0; i < times; i++) {
			arr.push(callback(i));
		}

		return arr;
	}
}