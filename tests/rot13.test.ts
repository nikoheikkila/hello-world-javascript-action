import { describe, expect, it } from "bun:test";
import fc from "fast-check";
import { transform } from "../src/rot13";

fc.configureGlobal({ baseSize: "large" });

const allLetters = /[a-zA-Z]/;
const upperCaseLetters = /[A-Z]/;
const lowerCaseLetters = /[a-z]/;

const isLetter = (char: string) => allLetters.test(char);
const isUpperCase = (char: string) => upperCaseLetters.test(char);
const isLowerCase = (char: string) => lowerCaseLetters.test(char);

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

	it("preserves character type", () => {
		fc.assert(
			fc.property(fc.string(), (text) => {
				const result = transform(text);

				return [...text].every((char, i) => {
					const transformed = result[i] ?? "";
					return isLetter(char) ? isLetter(transformed) : char === transformed;
				});
			}),
		);
	});

	it("preserves case", () => {
		fc.assert(
			fc.property(fc.string(), (text) => {
				const result = transform(text);

				return [...text].every((char, i) => {
					const transformed = result[i] ?? "";
					if (isUpperCase(char)) return isUpperCase(transformed);
					if (isLowerCase(char)) return isLowerCase(transformed);
					return true;
				});
			}),
		);
	});

	it("only transforms alphabetic characters", () => {
		fc.assert(
			fc.property(
				fc.string().filter((s) => !allLetters.test(s)),
				(nonAlphabetic) => transform(nonAlphabetic) === nonAlphabetic,
			),
		);
	});

	it("is its own inverse", () => {
		fc.assert(
			fc.property(
				fc.string().filter((s) => s.length > 0 && allLetters.test(s)),
				(text) => transform(transform(text)) === text,
			),
		);
	});
});
