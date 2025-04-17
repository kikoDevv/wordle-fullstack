const fs = require("fs").promises;
const path = require("path");

const scoresFilePath = path.join(__dirname, "..", "data", "scores.json");

const initializeScoresFile = async () => {
	try {
		await fs.access(scoresFilePath);
	} catch (error) {
		await fs.writeFile(scoresFilePath, JSON.stringify([], null, 2));
	}
};

//--Get all scores from the file--
const getAllScores = async () => {
	await initializeScoresFile();

	try {
		const data = await fs.readFile(scoresFilePath, "utf8");
		return JSON.parse(data);
	} catch (error) {
		console.error("Error reading scores file:", error);
		return [];
	}
};

//--Save a new score to the file-----
const saveScore = async (scoreData) => {
	await initializeScoresFile();

	try {
		const {
			playerName,
			targetWord,
			guesses,
			duration,
			wordLength,
			uniqueLettersOnly,
			gameId,
		} = scoreData;

		if (
			!playerName ||
			!targetWord ||
			guesses === undefined ||
			duration === undefined
		) {
			throw new Error("Missing required score data");
		}

		const scores = await getAllScores();

		const newScore = {
			id: generateId(),
			playerName,
			targetWord,
			guesses,
			duration,
			wordLength: wordLength || targetWord.length,
			uniqueLettersOnly:
				uniqueLettersOnly !== undefined ? uniqueLettersOnly : false,
			gameId,
			date: new Date().toISOString(),
		};

		scores.push(newScore);
        console.log("new score----->", newScore, "all scores------>", scores);

		await fs.writeFile(scoresFilePath, JSON.stringify(scores, null, 2));

		return newScore;
	} catch (error) {
		console.error("Error saving score:", error);
		throw error;
	}
};

//--Generate ID for a score-------
const generateId = () => {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
};

module.exports = {
	getAllScores,
	saveScore,
};
