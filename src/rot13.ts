const key = 13;
const middle = "M";

export const transform = (text: string): string =>
	text.replace(/[A-Za-z]/g, letter);

const letter = (letter: string): string => {
	const rotation = letter.toUpperCase() <= middle ? key : -key;

	return String.fromCharCode(letter.charCodeAt(0) + rotation);
};
