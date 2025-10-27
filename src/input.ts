import * as z from "zod";
import type { Core } from "./types.ts";

const schema = z.strictObject({
	string: z.string().nonempty(`input field 'string' cannot be empty`),
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
