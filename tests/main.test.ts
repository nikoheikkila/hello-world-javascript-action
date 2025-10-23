import { beforeEach, describe, expect, it } from "bun:test";
import { HelloWorldGitHubAction } from "../src/action.ts";
import { FakeCore, FakeGitHub } from "./utils.ts";

describe("Hello World GitHub Action", () => {
	const dateFn = () => new Date();
	let action: HelloWorldGitHubAction;
	let core: FakeCore;
	let github: FakeGitHub;

	beforeEach(() => {
		core = new FakeCore();
		github = new FakeGitHub();
		action = new HelloWorldGitHubAction({
			core,
			github,
			dateFn,
		});
	});

	it("greets the caller", () => {
		const name = "Niko";
		core.setInput("who-to-greet", name);

		action.run();

		expect(core.events.info).toContain(`Hello to you, ${name}!`);
	});

	it("sets current time as output", () => {
		const expectedTime = dateFn().toTimeString();

		action.run();

		const actualTime = core.getOutput("time");
		expect(actualTime).toBe(expectedTime);
	});

	it("prints out context payload for debugging", () => {
		github.setContext("payload", { key: "value" });

		action.run();

		expect(core.events.debug).toContain(
			'The event payload: {\n  "key": "value"\n}',
		);
	});
});
