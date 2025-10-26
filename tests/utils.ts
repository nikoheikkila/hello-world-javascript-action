import type { Core } from "../src/types.ts";

export type LogLevel = "debug" | "info";
type Events = Record<LogLevel, string[]>;

export class FakeCore implements Core {
	private readonly events: Events;
	private readonly inputs: Map<string, string>;
	private readonly outputs: Map<string, unknown>;

	public constructor() {
		this.events = { info: [], debug: [] };
		this.inputs = new Map();
		this.outputs = new Map();
	}

	public getInput(name: string): string {
		return this.inputs.get(name) || "";
	}

	public setInput(name: string, value: string): void {
		this.inputs.set(name, value);
	}

	public getOutput(name: string): unknown {
		return this.outputs.get(name) || "";
	}

	public setOutput(name: string, value: unknown): void {
		this.outputs.set(name, value);
	}

	public debug(message: string): void {
		this.events.debug.push(message);
	}

	public info(message: string): void {
		this.events.info.push(message);
	}
}
