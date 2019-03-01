import "jest";
import LoopUtils from "../LoopUtils";

describe("LoopUtils", () => {
	describe("mapTimes", () => {
		test("output value", () => expect(LoopUtils.mapTimes(5, i => i + 1)).toEqual([1, 2, 3, 4, 5]));
		test("times called", () => {
			const func = jest.fn();
			LoopUtils.mapTimes(100, func);
			expect(func).toBeCalledTimes(100);
		});
	});
});
