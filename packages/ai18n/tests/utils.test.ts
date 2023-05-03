import path from "node:path";
import { common_base } from "../src/utils";

describe("common base", () => {
	// Tests that the function returns the common base directory for an array of multiple paths.
	it("test multiple paths", () => {
		const pathes = ["src/components/button", "src/components/input", "src/utils"].map((p) =>
			path.resolve(p),
		);
		expect(common_base(pathes)).toBe(path.resolve("src"));
	});

	// Tests that the function returns the common base directory for an array of same paths.
	it("test same paths", () => {
		const pathes = [
			"src/components/button",
			"src/components/button",
			"src/components/button",
		].map((p) => path.resolve(p));
		expect(common_base(pathes)).toBe(path.resolve("src/components"));
	});

	// Tests that the function returns an empty string when given an empty array.
	it("test empty array", () => {
		const pathes: string[] = [];
		expect(common_base(pathes)).toBe("");
	});

	// Tests that the function returns the same path when given an array with only one path.
	it("test single path", () => {
		const pathes = ["src/components/button"].map((p) => path.resolve(p));
		expect(common_base(pathes)).toBe(path.resolve("src/components"));
	});

	// Tests that the function returns the common base directory for an array of paths with subdirectories.
	it("test subdirectories", () => {
		const pathes = ["src/components/button", "src/utils/helpers", "src/utils/constants"].map(
			(p) => path.resolve(p),
		);
		expect(common_base(pathes)).toBe(path.resolve("src"));
	});

	// Tests that the function for upper paths.
	it("test other paths", () => {
		const pathes = [
			"../../src/components/button",
			"../../src/components/input",
			"../../src/utils",
		].map((p) => path.resolve(p));
		expect(common_base(pathes)).toBe(path.resolve("../../src"));
	});
});
