/**
 * @param {Array} scores - Array of score objects
 * @param {Object} filters - Filter criteria
 * @param {number} [filters.wordLength] - Filter by word length
 * @param {boolean} [filters.uniqueLettersOnly] - Filter by unique letters setting
 * @param {string} [filters.sortBy='time'] - Sort by 'time', 'guesses', or 'date'
 * @param {string} [filters.order='asc'] - Sort order 'asc' or 'desc'
 * @returns {Array} - Filtered and sorted scores
 */
const applyFilters = (scores, filters) => {
	let filteredScores = [...scores];

	if (filters.wordLength !== undefined) {
		filteredScores = filteredScores.filter(
			(score) => score.wordLength === parseInt(filters.wordLength, 10)
		);
	}

	if (filters.uniqueLettersOnly !== undefined) {
		const uniqueLettersValue =
			typeof filters.uniqueLettersOnly === "string"
				? filters.uniqueLettersOnly === "true"
				: filters.uniqueLettersOnly;

		filteredScores = filteredScores.filter(
			(score) => score.uniqueLettersOnly === uniqueLettersValue
		);
	}

	//--Apply sorting---
	const sortBy = filters.sortBy || "time";
	const order = filters.order || "asc";

	filteredScores.sort((a, b) => {
		let comparison = 0;

		switch (sortBy) {
			case "time":
				comparison = a.duration - b.duration;
				break;
			case "guesses":
				comparison = a.guesses - b.guesses;
				break;
			case "date":
				comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
				break;
			default:
				comparison = a.duration - b.duration;
		}

		return order === "asc" ? comparison : -comparison;
	});

	return filteredScores;
};

module.exports = {
	applyFilters,
};
