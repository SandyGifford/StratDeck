import * as uuid from "uuid";
import LoopUtils from "./LoopUtils";

export default class UidUtils {
	/**
	 * Generate a random UID
	 * @param seed a seed for the UID generation, NOTE: THIS DOES NOT DO A GOOD JOB OF UTILIZING THE SEED, ONLY USE THIS FOR TEESTING
	 * @returns a uid
	 */
	public static generate(seed?: number) {
		return uuid.v4(typeof seed === "number" ? {
			random: LoopUtils.mapTimes(16, i => seed + i),
		} : undefined);
	}
}