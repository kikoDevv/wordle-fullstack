
// @param {string} guess
// @param {string} correctWord
// @returns {Array}



//--------------func to compare each latter and give feedback------------
function GetFeedback(guess, correctWord) {
	guess = guess.toUpperCase();
	correctWord = correctWord.toUpperCase();

	const letterFrequency = {};
	for (const letter of correctWord) {
		letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
	}

	const result = guess.split("").map((letter) => ({
		letter,
		result: "incorrect",
	}));

	for (let i = 0; i < guess.length; i++) {
		if (i < correctWord.length && guess[i] === correctWord[i]) {
			result[i].result = "correct";
			letterFrequency[guess[i]]--;
		}
	}

	for (let i = 0; i < guess.length; i++) {
		if (
			result[i].result !== "correct" &&
			letterFrequency[guess[i]] &&
			letterFrequency[guess[i]] > 0
		) {
			result[i].result = "misplaced";
			letterFrequency[guess[i]]--;
		}
	}

	return result;
}

export { GetFeedback };
