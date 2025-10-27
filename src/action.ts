import * as z from "zod";
import * as rot13 from "./rot13";
import type { ActionDependencies, Core } from "./types.ts";

export class Rot13GitHubAction {
	private readonly core: Core;

	public constructor({ core }: ActionDependencies) {
		this.core = core;
	}

	public run(): void {
		const input = this.parseInput();

		const result = rot13.transform(input);

		this.logResult(input, result);
		this.setResult(result);
	}

	private parseInput(): string {
		const key = "string";
		const message = `input field '${key}' cannot be empty`;

		return z.string().nonempty(message).parse(this.core.getInput(key));
	}

	private logResult(input: string, result: string): void {
		this.core.info(`${input} -> ${result}`);
	}

	private setResult(result: string): void {
		this.core.setOutput("result", result);
	}
}
