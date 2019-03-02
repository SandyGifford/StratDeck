import "jest";

import ArrayUtils from "@utils/ArrayUtils";

describe("Arrayutils", () => {
	describe("createCard", () => {
		test("single values", () => {
			expect(ArrayUtils.hasOnlyUniqueValues([0])).toBe(true);
			expect(ArrayUtils.hasOnlyUniqueValues([3])).toBe(true);
			expect(ArrayUtils.hasOnlyUniqueValues([-5])).toBe(true);
		});

		test("unique values", () => {
			expect(ArrayUtils.hasOnlyUniqueValues([1, 2, 3, 4, 5])).toBe(true);
			expect(ArrayUtils.hasOnlyUniqueValues([-1, 0, 3, -4, 5])).toBe(true);
		});

		test("non-unique values", () => {
			expect(ArrayUtils.hasOnlyUniqueValues([1, 1, 1, 1, 1, 1])).toBe(false);
			expect(ArrayUtils.hasOnlyUniqueValues([1, -1, 1, -1, 1, -1])).toBe(false);
			expect(ArrayUtils.hasOnlyUniqueValues([1, 2, 3, 3, 5])).toBe(false);
		});
	});
});
