export default {
	packageManager: "npm",
	testRunner: "command",
	commandRunner: {
		command: "bun test",
	},
	checkers: ["typescript"],
	mutate: ["src/**/*.ts", "!src/main.ts"],
	reporters: ["clear-text", "progress"],
	htmlReporter: {
		fileName: "reports/mutation/index.html",
	},
	thresholds: {
		high: 100,
		low: 80,
		break: 100,
	},
	timeoutMS: 60000,
	concurrency: 4,
	coverageAnalysis: "off",
};
