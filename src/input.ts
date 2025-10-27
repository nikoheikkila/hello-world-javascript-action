import * as z from "zod";
import type { Core } from "./types.ts";

const schema = z.strictObject({
	string: z.string().nonempty(`input field 'string' cannot be empty`),
});

export class ActionInputs {
	public constructor(private readonly core: Core) {}

	public parse(): z.infer<typeof schema> {
		return schema.parse(this.inputs);
	}

	private get inputs(): Record<string, string> {
		return {
			string: this.core.getInput("string"),
		};
	}
}
