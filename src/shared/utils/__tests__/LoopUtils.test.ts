import "jest";
import LoopUtils from "../LoopUtils";

describe("LoopUtils", () => {
	test("mapTimes", () => {
		expect(LoopUtils.mapTimes(5, i => i + 1)).toEqual([1, 2, 3, 4, 5]);
	});
});
