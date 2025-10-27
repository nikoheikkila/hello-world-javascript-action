export default {
	packageManager: "npm",
	testRunner: "command",
	commandRunner: {
		command: "bun test",
	},
	checkers: ["typescript"],
	mutate: ["src/**/*.ts"],
	reporters: ["clear-text", "progress"],
	thresholds: {
		high: 100,
		low: 80,
		break: 100,
	},
	timeoutMS: 60000,
	concurrency: 4,
	coverageAnalysis: "perTest",
};
