export default class NumberUtils {
	public static clamp(num: number, min: number, max: number): number {
		if (min > max) throw "min cannot be more than max";

		return Math.min(Math.max(num, min), max);
	}
}