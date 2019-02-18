export default class LoopUtils {
	public static mapTimes<T>(times: number, callback: (index: number) => T): T[] {
		const arr: T[] = [];

		for (let i = 0; i < times; i++) {
			arr.push(callback(i));
		}

		return arr;
	}
}