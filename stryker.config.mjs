// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
	packageManager: "npm",
	testRunner: "command",
	commandRunner: {
		command: "bun test tests/rot13.test.ts",
	},
	mutate: ["src/rot13/index.ts"],
	reporters: ["html", "clear-text", "progress"],
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
