import { describe, expect, it } from "bun:test";
import fc from "fast-check";
import { transform } from "../src/rot13";

describe("Rot 13", () => {
	it("handles empty string", () => {
		expect(transform("")).toBe("");
	});

	it.each([
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
			fc.property(fc.string(), (xs) => transform(xs).length === xs.length),
		);
	});

	it("is idempotent", () => {
		fc.assert(
			fc.property(fc.string(), (xs) => transform(transform(xs)) === xs),
		);
	});
});
