const key = 13;
const middle = "M";

export function transform(text: string): string {
	return text.replace(/[A-Za-z]/g, letter);
}

function letter(letter: string): string {
	const rotation = letter.toUpperCase() <= middle ? key : -key;

	return String.fromCharCode(letter.charCodeAt(0) + rotation);
}
