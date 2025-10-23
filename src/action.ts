import type { ActionDependencies, Core, DateFn, GitHub } from "./types.ts";

export class HelloWorldGitHubAction {
	private readonly core: Core;
	private readonly github: GitHub;
	private readonly getDate: DateFn;

	public constructor({ core, github, dateFn }: ActionDependencies) {
		this.core = core;
		this.github = github;
		this.getDate = dateFn ?? (() => new Date());
	}

	public run(): void {
		this.greet();
		this.tellTime();
		this.dumpPayload();
	}

	private greet(): void {
		this.core.info(`Hello to you, ${this.name}!`);
	}

	private tellTime(): void {
		this.core.setOutput("time", this.getDate().toTimeString());
	}

	private dumpPayload(): void {
		this.core.debug(`The event payload: ${this.payload}`);
	}

	private get payload(): string {
		return JSON.stringify(this.github.context.payload, undefined, 2);
	}

	private get name(): string {
		return this.core.getInput("who-to-greet");
	}
}
