const fs = require("fs").promises;
const path = require("path");
const connectDB = require("../config/db");
const Score = require("../models/Score");
require("dotenv").config();

const scoresFilePath = path.join(__dirname, "..", "data", "scores.json");

const migrateScores = async () => {
	try {
		// Connect to MongoDB
		await connectDB();
		console.log("Connected to MongoDB. Starting migration...");

		// Read scores from JSON file
		const jsonData = await fs.readFile(scoresFilePath, "utf8");
		const scores = JSON.parse(jsonData);

		if (!scores || !Array.isArray(scores) || scores.length === 0) {
			console.log("No scores found to migrate or invalid JSON data");
			process.exit(0);
		}

		console.log(`Found ${scores.length} scores to migrate.`);

		// Import scores to MongoDB
		let importedCount = 0;
		let skippedCount = 0;

		for (const score of scores) {
			try {
				const { id, ...scoreData } = score;


				const newScore = new Score(scoreData);
				await newScore.save();

				importedCount++;
				console.log(
					`Imported score for ${score.playerName} (${importedCount}/${scores.length})`
				);
			} catch (err) {
				skippedCount++;
				console.error(`Failed to import score ID ${score.id}: ${err.message}`);
			}
		}

		console.log("\nMigration Summary:");
		console.log(`Total scores found: ${scores.length}`);
		console.log(`Successfully imported: ${importedCount}`);
		console.log(`Skipped/Failed: ${skippedCount}`);
		console.log("\nMigration complete!");

		process.exit(0);
	} catch (error) {
		console.error("Migration failed:", error);
		process.exit(1);
	}
};

migrateScores();
