import * as z from "zod";

export const parse = (inputs: unknown) => schema().parse(inputs);

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
