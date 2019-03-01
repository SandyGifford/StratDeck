import "jest";

import UidUtils from "@utils/UidUtils";
import ArrayUtils from "@utils/ArrayUtils";
import LoopUtils from "@utils/LoopUtils";


describe("UidUtils", () => {
	describe("generate", () => {
		test("unseeded", () => {
			const uids = LoopUtils.mapTimes(100, () => UidUtils.generate());
			expect(ArrayUtils.hasOnlyUniqueValues(uids)).toBe(true);
		});

		test("seeded", () => {
			const seededUids = LoopUtils.mapTimes(100, () => UidUtils.generate(5));
			seededUids.forEach(uid => expect(uid).toBe(seededUids[0]));
		});
	});
});
