// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
	commandRunner: {
		command: "bun test",
	},
	checkers: ["typescript"],
	mutate: ["src/**/*.ts"],
	reporters: ["clear-text", "progress"],
	thresholds: {
		high: 100,
		low: 100,
		break: 100,
	},
};

export default config;
