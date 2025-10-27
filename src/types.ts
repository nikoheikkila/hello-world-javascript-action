export interface Core {
	getInput(name: string): string;
	setOutput(name: string, value: unknown): void;
	info(message: string): void;
}

export interface ActionDependencies {
	core: Core;
}
