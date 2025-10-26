import * as rot13 from "./rot13";
import type { ActionDependencies, Core } from "./types.ts";

export class Rot13GitHubAction {
	private readonly core: Core;

	public constructor({ core }: ActionDependencies) {
		this.core = core;
	}

	public run(): void {
		const input = this.core.getInput("string");

		const result = rot13.transform(input);

		this.core.setOutput("result", result);
	}
}
