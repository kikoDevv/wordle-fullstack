const fs = require("fs").promises;
const path = require("path");

/**
 * @returns {Promise<string[]>}
 */
const loadWords = async () => {
	try {
		const wordsPath = path.join(__dirname, "..", "data", "words.txt");
		const data = await fs.readFile(wordsPath, "utf8");
		return data.split("\n").filter((word) => word.trim().length > 0);
	} catch (error) {
		console.error("Error loading words from file:", error);
		return [];
	}
};

/**
 * @param {string} word
 * @returns {boolean}
 */
const hasRepeatedLetters = (word) => {
	const letters = new Set(word);
	return letters.size !== word.length;
};

/**
 * @param {number} length
 * @param {boolean} allowRepeats
 * @returns {Promise<string>}
 */
const getRandomWord = async (length, allowRepeats) => {
	try {
		const allWords = await loadWords();

		let filteredWords = allWords.filter((word) => word.length === length);

		if (!allowRepeats) {
			filteredWords = filteredWords.filter((word) => !hasRepeatedLetters(word));
		}

		if (filteredWords.length === 0) {
			console.log(
				`No ${length}-letter words ${
					allowRepeats ? "with" : "without"
				} repeated letters found`
			);
			return null;
		}

		const randomIndex = Math.floor(Math.random() * filteredWords.length);
		return filteredWords[randomIndex];
	} catch (error) {
		console.error("Error getting random word:", error);
		return null;
	}
};

/**
 * @param {string} guess
 * @param {string} targetWord
 * @returns {Array<{letter: string, result: string}>}
 */
const checkGuess = (guess, targetWord) => {
	if (!targetWord || typeof targetWord !== "string") {
		throw new Error("Invalid target word");
	}

	if (!guess || typeof guess !== "string") {
		throw new Error("Invalid guess");
	}

	if (guess.length !== targetWord.length) {
		console.log(
			`Length mismatch: Guess "${guess}" (${guess.length}) vs Target "${targetWord}" (${targetWord.length})`
		);
		throw new Error(
			`Guess length (${guess.length}) does not match target word length (${targetWord.length})`
		);
	}

	const result = [];
	const targetLetters = targetWord.split("");

	for (let i = 0; i < guess.length; i++) {
		const letter = guess[i];

		if (letter === targetWord[i]) {
			result.push({ letter, result: "correct" });
			targetLetters[i] = null;
		} else {
			result.push({ letter, result: "pending" });
		}
	}

	for (let i = 0; i < result.length; i++) {
		if (result[i].result === "pending") {
			const letter = result[i].letter;
			const targetIndex = targetLetters.indexOf(letter);

			if (targetIndex !== -1) {
				result[i].result = "misplaced";
				targetLetters[targetIndex] = null;
			} else {
				result[i].result = "incorrect";
			}
		}
	}

	return result;
};

module.exports = {
	loadWords,
	getRandomWord,
	hasRepeatedLetters,
	checkGuess,
};
