import { describe, it } from "bun:test";
import { assert, property, string } from "fast-check";
import { transform } from "../src/rot13.ts";

type Predicate = (s: string) => boolean;

describe("ROT-13 transformation", () => {
	it("does not change text length", () => {
		const preservesLength: Predicate = (s) => transform(s).length === s.length;

		assert(property(string(), preservesLength));
	});

	it("is its own inverse", () => {
		const isItsOwnInverse: Predicate = (s) => transform(transform(s)) === s;

		assert(property(string(), isItsOwnInverse));
	});

	it("preserves uppercase", () => {
		const isUpperCase: Predicate = (s) => s === s.toUpperCase();
		const preservesUpperCase: Predicate = (s) =>
			[...transform(s)].every(isUpperCase);

		assert(property(string().filter(isUpperCase), preservesUpperCase));
	});

	it("preserves lowercase", () => {
		const isLowerCase: Predicate = (s) => s === s.toLowerCase();
		const preservesLowercase: Predicate = (s) =>
			[...transform(s)].every(isLowerCase);

		assert(property(string().filter(isLowerCase), preservesLowercase));
	});

	it("only transforms alphabetic characters", () => {
		const isSpecialCharacter: Predicate = (s) => !/[A-Za-z]/.test(s);
		const skipsTransformation: Predicate = (s) => transform(s) === s;

		assert(property(string().filter(isSpecialCharacter), skipsTransformation));
	});
});
