const Score = require("../models/Score");
const { applyFilters } = require("../utils/filterUtils");

//--- get all the score with filter-------
const getScores = async (req, res) => {
	try {
		const query = {};

		if (req.query.wordLength) {
			query.wordLength = parseInt(req.query.wordLength);
		}

		if (req.query.uniqueLettersOnly !== undefined) {
			query.uniqueLettersOnly = req.query.uniqueLettersOnly === "true";
		}

		const sortBy = req.query.sortBy || "date";
		const order = req.query.order === "asc" ? 1 : -1;
		const sortOptions = {};
		sortOptions[sortBy] = order;

		const scores = await Score.find(query).sort(sortOptions);

		res.json(scores);
	} catch (error) {
		console.error("Error getting scores:", error);
		res.status(500).json({ error: "Failed to retrieve scores" });
	}
};

//-----Save a new score-----
const saveScore = async (req, res) => {
	try {
		const scoreData = req.body;

		// Validate required fields
		if (!scoreData.playerName || !scoreData.targetWord) {
			return res.status(400).json({ error: "Missing required score data" });
		}

		// Save score using Mongoose
		const newScore = await Score.create(scoreData);

		res.status(201).json({
			id: newScore._id,
			message: "Score saved successfully",
		});
	} catch (error) {
		console.error("Error saving score:", error);
		res.status(500).json({ error: "Failed to save score: " + error.message });
	}
};

//------get specific score by id ---------
const getScoreById = async (req, res) => {
	try {
		const { id } = req.params;
		const score = await Score.findById(id);

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
