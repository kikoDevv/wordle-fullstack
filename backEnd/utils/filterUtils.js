/**
 * @param {Array<Object>} highscores
 * @param {number} wordLength
 * @returns {Array<Object>}
 */

const filterByWordLength = (highscores, wordLength) => {
	if (!wordLength || wordLength <= 0) {
		return highscores;
	}

	return highscores.filter((score) => score.wordLength === wordLength);
};

/**
 * @param {Array<Object>} highscores
 * @param {boolean} uniqueLettersOnly
 * @returns {Array<Object>}
 */
const filterByUniqueLetters = (highscores, uniqueLettersOnly) => {
	if (uniqueLettersOnly === undefined || uniqueLettersOnly === null) {
		return highscores;
	}

	return highscores.filter(
		(score) => score.uniqueLettersOnly === uniqueLettersOnly
	);
};

/**
 * @param {Array<Object>} highscores
 * @param {string} sortBy
 * @param {string} order
 * @returns {Array<Object>}
 */
const sortHighscores = (highscores, sortBy = "time", order = "asc") => {
	const sortedScores = [...highscores];

	sortedScores.sort((a, b) => {
		let comparison = 0;

		switch (sortBy) {
			case "time":
				comparison = a.duration - b.duration;
				break;
			case "guesses":
				comparison = a.guesses.length - b.guesses.length;
				break;
			case "date":
				comparison = new Date(a.date) - new Date(b.date);
				break;
			default:
				comparison = a.duration - b.duration;
		}

		return order === "asc" ? comparison : -comparison;
	});

	return sortedScores;
};

/**
 * @param {Array<Object>} highscores
 * @param {Object} options
 * @param {number} options.wordLength
 * @param {boolean} options.uniqueLettersOnly
 * @param {string} options.sortBy
 * @param {string} options.order
 * @returns {Array<Object>}
 */
const applyFilters = (highscores, options = {}) => {
	const {
		wordLength,
		uniqueLettersOnly,
		sortBy = "time",
		order = "asc",
	} = options;

	let filteredScores = highscores;

	if (wordLength) {
		filteredScores = filterByWordLength(
			filteredScores,
			parseInt(wordLength, 10)
		);
	}

	if (uniqueLettersOnly !== undefined) {
		const uniqueLettersBool =
			uniqueLettersOnly === "true" || uniqueLettersOnly === true;
		filteredScores = filterByUniqueLetters(filteredScores, uniqueLettersBool);
	}

	return sortHighscores(filteredScores, sortBy, order);
};

/**
 * @param {Object} filters - Filter settings
 * @returns {string} URL query parameters string
 */
const createQueryString = (filters = {}) => {
	const params = new URLSearchParams();

	Object.entries(filters).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			params.append(key, value);
		}
	});

	return params.toString();
};

module.exports = {
	filterByWordLength,
	filterByUniqueLetters,
	sortHighscores,
	applyFilters,
	createQueryString,
};
