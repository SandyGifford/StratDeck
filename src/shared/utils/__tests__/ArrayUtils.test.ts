import "jest";

import ArrayUtils from "../Arrayutils";

describe("Arrayutils", () => {
	test("createCard", () => {
		expect(ArrayUtils.hasOnlyUniqueValues([0])).toBe(true);
		expect(ArrayUtils.hasOnlyUniqueValues([3])).toBe(true);
		expect(ArrayUtils.hasOnlyUniqueValues([-5])).toBe(true);
		expect(ArrayUtils.hasOnlyUniqueValues([1, 2, 3, 4, 5])).toBe(true);
		expect(ArrayUtils.hasOnlyUniqueValues([1, 1, 1, 1, 1, 1])).toBe(false);
		expect(ArrayUtils.hasOnlyUniqueValues([1, -1, 1, -1, 1, -1])).toBe(false);
		expect(ArrayUtils.hasOnlyUniqueValues([1, 2, 3, 3, 5])).toBe(false);
	});
});
