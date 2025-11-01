import * as input from "./input.ts";
import * as rot13 from "./rot13.ts";
import type { ActionDependencies, Core } from "./types.ts";

export class Rot13GitHubAction {
	private readonly core: Core;

	public constructor({ core }: ActionDependencies) {
		this.core = core;
	}

	public run(): void {
		const { string } = this.parseInputs();

		const result = rot13.transform(string);

		this.logResult(string, result);
		this.setResult(result);
	}

	private parseInputs() {
		return input.parse({
			string: this.core.getInput("string"),
		});
	}

	private logResult(input: string, result: string): void {
		this.core.info(`${input} -> ${result}`);
	}

	private setResult(result: string): void {
		this.core.setOutput("result", result);
	}
}
