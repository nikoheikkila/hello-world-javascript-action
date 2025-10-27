import { describe, it } from "bun:test";
import { assert, property, string } from "fast-check";
import { transform } from "../src/rot13.ts";

describe("Rot 13", () => {
	const isUpperCase = (letter: string) => letter === letter.toUpperCase();
	const isLowerCase = (letter: string) => letter === letter.toLowerCase();
	const isSpecialCharacter = (letter: string) => !/[A-Za-z]/.test(letter);

	it("does not change text length", () => {
		assert(property(string(), (xs) => transform(xs).length === xs.length));
	});

	it("is idempotent", () => {
		assert(property(string(), (xs) => transform(transform(xs)) === xs));
	});

	it("preserves uppercase", () => {
		assert(
			property(string().filter(isUpperCase), (xs) =>
				[...transform(xs)].every(isUpperCase),
			),
		);
	});

	it("preserves lowercase", () => {
		assert(
			property(string().filter(isLowerCase), (xs) =>
				[...transform(xs)].every(isLowerCase),
			),
		);
	});

	it("only transforms alphabetic characters", () => {
		assert(
			property(
				string().filter(isSpecialCharacter),
				(xs) => transform(xs) === xs,
			),
		);
	});
});
