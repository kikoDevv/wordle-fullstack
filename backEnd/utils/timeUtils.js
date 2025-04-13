
/**
 * @returns {number}
 */
const startGameSession = () => {
	return Date.now();
};

/**
 * @param {number} startTime
 * @returns {number}
 */
const calculateGameDuration = (startTime) => {
	const endTime = Date.now();
	return endTime - startTime;
};

/**
 * @param {number} duration
 * @returns {string}
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
 * @returns {Object}
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
