import { beforeEach, describe, expect, it } from "bun:test";
import { Rot13GitHubAction } from "../src/action.ts";
import { FakeCore } from "./utils.ts";

describe("Hello World GitHub Action", () => {
	let action: Rot13GitHubAction;
	let core: FakeCore;

	beforeEach(() => {
		core = new FakeCore();
		action = new Rot13GitHubAction({
			core,
		});
	});

	it("fails with empty string input", () => {
		core.setInput("string", "");

		expect(() => action.run()).toThrowError(
			/input field 'string' cannot be empty/i,
		);
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
	])("transforms %s to %s", (input, expectedResult) => {
		core.setInput("string", input);

		action.run();

		const actualResult = core.getOutput("result");
		expect(actualResult).toBe(expectedResult);
		expect(core.eventsOf("info")).toContain(`${input} -> ${expectedResult}`);
	});
});
