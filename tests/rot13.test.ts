import { describe, expect, it } from "bun:test";
import fc from "fast-check";
import { transform } from "../src/rot13";

const isUpperCase = (letter: string) => letter === letter.toUpperCase();
const isLowerCase = (letter: string) => letter === letter.toLowerCase();
const isSpecialCharacter = (letter: string) => !/[A-Za-z]/.test(letter);

describe("Rot 13", () => {
	it.each([
		["", ""],
		["A", "N"],
		["M", "Z"],
		["N", "A"],
		["Z", "M"],
		["a", "n"],
		["m", "z"],
		["n", "a"],
		["z", "m"],
		["HELLO", "URYYB"],
		["WORLD", "JBEYQ"],
		["ROT13", "EBG13"],
		["123", "123"],
		["!@#$%", "!@#$%"],
		["Hello, World!", "Uryyb, Jbeyq!"],
	])("transforms %s to %s", (input, expected) => {
		expect(transform(input)).toBe(expected);
	});

	it("does not change text length", () => {
		fc.assert(
			fc.property(fc.string(), (text) => {
				return transform(text).length === text.length;
			}),
		);
	});

	it("is idempotent", () => {
		fc.assert(
			fc.property(fc.string(), (text) => {
				return transform(transform(text)) === text;
			}),
		);
	});

	it("preserves uppercase", () => {
		fc.assert(
			fc.property(fc.string().filter(isUpperCase), (text) => {
				return [...transform(text)].every(isUpperCase);
			}),
		);
	});

	it("preserves lowercase", () => {
		fc.assert(
			fc.property(fc.string().filter(isLowerCase), (text) => {
				return [...transform(text)].every(isLowerCase);
			}),
		);
	});

	it("only transforms alphabetic characters", () => {
		fc.assert(
			fc.property(
				fc.string().filter(isSpecialCharacter),
				(nonAlphabetic) => transform(nonAlphabetic) === nonAlphabetic,
			),
		);
	});
});
