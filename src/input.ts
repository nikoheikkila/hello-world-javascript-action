import * as z from "zod";
import type { ActionInputs } from "./types.ts";

export const parse = (inputs: ActionInputs): ActionInputs => {
	const { data, success, error } = schema().safeDecode(inputs);

	return success ? data : raiseError(error);
};

const schema = () => {
	const minSize = 1;
	const maxSize = 1024 * 1024;

	return z.strictObject({
		string: z
			.string()
			.min(minSize, "input field 'string' cannot be empty")
			.max(maxSize, `input field 'string' cannot exceed ${maxSize} characters`),
	});
};

const raiseError = (error: z.ZodError) => {
	throw new Error(z.prettifyError(error));
};
