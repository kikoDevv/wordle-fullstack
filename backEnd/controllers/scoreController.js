const Score = require("../models/Score");
const { applyFilters } = require("../utils/filterUtils");

//--- get all the score with filter-------
const getScores = async (req, res) => {
	try {
		const allScores = await Score.getAllScores();

		const { wordLength, uniqueLettersOnly, sortBy, order } = req.query;
		const filteredScores = applyFilters(allScores, {
			wordLength,
			uniqueLettersOnly,
			sortBy: sortBy || "time",
			order: order || "asc",
		});

		res.json(filteredScores);
	} catch (error) {
		console.error("Error getting scores:", error);
		res.status(500).json({ error: "Failed to retrieve scores" });
	}
};

//-----Save a new score-----
const saveScore = async (req, res) => {
	try {
		const scoreData = req.body;

		if (!scoreData.playerName || !scoreData.targetWord) {
			return res.status(400).json({ error: "Missing required score data" });
		}

		const newScore = await Score.saveScore(scoreData);
		res
			.status(201)
			.json({ id: newScore.id, message: "Score saved successfully" });
	} catch (error) {
		console.error("Error saving score:", error);
		res.status(500).json({ error: "Failed to save score: " + error.message });
	}
};

//------get specific score by id ---------
const getScoreById = async (req, res) => {
	try {
		const { id } = req.params;
		const allScores = await Score.getAllScores();
		const score = allScores.find((score) => score.id === id);

		if (!score) {
			return res.status(404).json({ error: "Score not found" });
		}

		res.json(score);
	} catch (error) {
		console.error("Error getting score by ID:", error);
		res.status(500).json({ error: "Failed to retrieve score" });
	}
};

module.exports = {
	getScores,
	saveScore,
	getScoreById,
};
