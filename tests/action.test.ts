import { beforeEach, describe, expect, it } from "bun:test";
import { Rot13GitHubAction } from "../src/action.ts";
import { FakeCore } from "./utils.ts";

describe("ROT-13 Transformer", () => {
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

	it("fails with input exceeding maximum length", () => {
		const input = "*".repeat(1048577);
		core.setInput("string", input);

		expect(() => action.run()).toThrowError(
			/input field 'string' cannot exceed 1048576 characters/i,
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
		["Héllo", "Uéyyb"],
		["🔒 secret", "🔒 frperg"],
		["Тест", "Тест"],
		["مرحبا", "مرحبا"],
		["こんにちは", "こんにちは"],
	])("transforms %s to %s", (input, expectedResult) => {
		core.setInput("string", input);

		action.run();

		const actualResult = core.getOutput("result");
		expect(actualResult).toBe(expectedResult);
		expect(core.eventsOf("info")).toContain(`${input} -> ${expectedResult}`);
	});
});
