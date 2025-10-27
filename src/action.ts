import { ActionInputs } from "./input.ts";
import * as rot13 from "./rot13.ts";
import type { ActionDependencies, Core } from "./types.ts";

export class Rot13GitHubAction {
	private readonly core: Core;
	private readonly inputs: ActionInputs;

	public constructor({ core }: ActionDependencies) {
		this.core = core;
		this.inputs = new ActionInputs(core);
	}

	public run(): void {
		const { string } = this.inputs.parse();

		const result = rot13.transform(string);

		this.logResult(string, result);
		this.setResult(result);
	}

	private logResult(input: string, result: string): void {
		this.core.info(`${input} -> ${result}`);
	}

	private setResult(result: string): void {
		this.core.setOutput("result", result);
	}
}
