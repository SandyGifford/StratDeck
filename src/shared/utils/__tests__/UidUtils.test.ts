import "jest";

import UidUtils from "../UidUtils";
import ArrayUtils from "../ArrayUtils";
import LoopUtils from "../LoopUtils";


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
