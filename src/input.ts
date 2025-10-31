import * as z from "zod";
import type { Core } from "./types.ts";

const schema = z.strictObject({
	string: z
		.string()
		.min(1, `input field 'string' cannot be empty`)
		.max(1048576, `input field 'string' cannot exceed 1048576 characters`),
});

export class ActionInputs {
	public constructor(private readonly core: Core) {}

	public parse(): z.infer<typeof schema> {
		return schema.decode(this.inputs);
	}

	private get inputs() {
		return {
			string: this.core.getInput("string"),
		};
	}
}
