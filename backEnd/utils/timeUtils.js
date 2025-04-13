
/**
 * @returns {number} Timestamp in milliseconds
 */
const startGameSession = () => {
	return Date.now();
};

/**
 * @param {number} startTime - Timestamp when the game started
 * @returns {number} Duration in milliseconds
 */
const calculateGameDuration = (startTime) => {
	const endTime = Date.now();
	return endTime - startTime;
};

/**
 * @param {number} duration - Duration in milliseconds
 * @returns {string} Formatted duration string (MM:SS.mmm)
 */
const formatDuration = (duration) => {
	const totalSeconds = Math.floor(duration / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const milliseconds = duration % 1000;

	return `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
};

/**
 * @returns {Object} Object containing start time and methods
 */
const createGameSession = () => {
	const startTime = startGameSession();

	return {
		startTime,
		getDuration: () => calculateGameDuration(startTime),
		getFormattedDuration: () =>
			formatDuration(calculateGameDuration(startTime)),
	};
};

module.exports = {
	startGameSession,
	calculateGameDuration,
	formatDuration,
	createGameSession,
};
