export default class NumberUtils {
	/**
	 * Clamps a number between two values
	 * @param num a number
	 * @param min a number
	 * @param max a number
	 * @returns min if num < min, max if num > max, else num
	 */
	public static clamp(num: number, min: number, max: number): number {
		if (min > max) throw "min cannot be more than max";

		return Math.min(Math.max(num, min), max);
	}
}