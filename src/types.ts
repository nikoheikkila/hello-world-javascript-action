export interface Core {
	getInput(name: string): string;
	info(message: string): void;
	setOutput(name: string, value: unknown): void;
}

export interface Context {
	payload: Record<string, unknown>;
}

export interface GitHub {
	context: Context;
}

export type DateFn = () => Date;

export interface ActionDependencies {
	core: Core;
	github: GitHub;
	dateFn?: DateFn;
}
