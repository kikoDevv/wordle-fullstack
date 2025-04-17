const mongoose = require("mongoose");

// Define Score Schema
const ScoreSchema = new mongoose.Schema({
	playerName: {
		type: String,
		required: [true, "Player name is required"],
		trim: true,
	},
	targetWord: {
		type: String,
		required: [true, "Target word is required"],
		trim: true,
	},
	guesses: {
		type: Number,
		required: [true, "Number of guesses is required"],
		min: [1, "Must have at least one guess"],
	},
	duration: {
		type: Number,
		required: [true, "Game duration is required"],
		min: [0, "Duration cannot be negative"],
	},
	wordLength: {
		type: Number,
		required: [true, "Word length is required"],
		min: [3, "Word length must be at least 3"],
	},
	uniqueLettersOnly: {
		type: Boolean,
		default: false,
	},
	gameId: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

//----static methods for the Score model---
ScoreSchema.statics.getAllScores = async function () {
	return await this.find().sort({ date: -1 });
};

ScoreSchema.statics.saveScore = async function (scoreData) {
	return await this.create(scoreData);
};

const Score = mongoose.model("Score", ScoreSchema);
module.exports = Score;
