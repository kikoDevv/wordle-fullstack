const express = require("express");
const path = require("path");
const { loadWords, getRandomWord, checkGuess } = require("./utils/wordUtils");

const app = express();
const PORT = process.env.PORT || 5080;

app.use(express.json());

//---this should move to data base!!! game info---
const gameSessions = new Map();

//--generate randome id--
const generateGameId = () => Math.random().toString(36).substring(2, 15);

app.get("/api/words/random", async (req, res) => {
	try {
		const length = parseInt(req.query.length) || 5;
		const allowRepeats = req.query.allowRepeats === "true";

		const word = await getRandomWord(length, allowRepeats);

		if (!word) {
			return res.status(404).json({
				error: `No ${length}-letter words ${
					allowRepeats ? "with" : "without"
				} repeated letters found`,
			});
		}

		res.json({ word });
	} catch (error) {
		console.error("Error getting random word:", error);
		res.status(500).json({ error: "Failed to get a random word" });
	}
});

app.post("/api/words/check", async (req, res) => {
	try {
		const { guess, targetWord, gameId } = req.body;

		if (!guess) {
			return res.status(400).json({ error: "Guess is required" });
		}

		let wordToCheck;
		const guessLength = guess.length;

		console.log(
			`Check request: gameId=${gameId}, guess="${guess}" (${guessLength} letters)`
		);

		if (targetWord) {
			wordToCheck = targetWord;
			console.log(`Using provided target word: "${targetWord}"`);
		}
		else if (gameId && gameSessions.has(gameId)) {
			const session = gameSessions.get(gameId);
			wordToCheck = session.targetWord;
			console.log(
				`Using game session target word: "${wordToCheck}" (session: ${gameId})`
			);

			if (wordToCheck.length !== session.settings.wordLength) {
				console.warn(
					`Warning: Target word length ${wordToCheck.length} doesn't match settings ${session.settings.wordLength}`
				);
			}
		}
		else {
			console.log(
				`No gameId or targetWord provided, generating random word of length ${guessLength}`
			);
			wordToCheck = await getRandomWord(guessLength, true);

			if (!wordToCheck) {
				return res.status(400).json({
					error: `No target word available for ${guessLength} letters. Please start a new game.`,
				});
			}
			console.log(`Generated random word: "${wordToCheck}"`);
		}

		if (guess.length !== wordToCheck.length) {
			console.error(
				`Length mismatch: guess="${guess}" (${guess.length}) vs target="${wordToCheck}" (${wordToCheck.length})`
			);
			return res.status(400).json({
				error: `Guess length (${guess.length}) doesn't match target word length (${wordToCheck.length})`,
				guessLength: guess.length,
				targetLength: wordToCheck.length,
			});
		}

		const result = checkGuess(guess, wordToCheck);

		if (gameId && gameSessions.has(gameId)) {
			gameSessions.get(gameId).guesses.push({
				guess,
				result,
				timestamp: Date.now(),
			});
		}

		res.json({
			word: guess,
			result,
		});
	} catch (error) {
		console.error("Error checking guess:", error);
		res.status(500).json({
			error: "Failed to check guess: " + error.message,
			details: error.stack,
		});
	}
});

app.post("/api/game/start", async (req, res) => {
	try {
		const { wordLength = 5, allowRepeats = false } = req.body;

		const targetWord = await getRandomWord(wordLength, allowRepeats);

		if (!targetWord) {
			return res.status(404).json({
				error: `No ${wordLength}-letter words ${
					allowRepeats ? "with" : "without"
				} repeated letters found`,
			});
		}

		const gameId = generateGameId();
		const startTime = Date.now();

		gameSessions.set(gameId, {
			targetWord,
			startTime,
			guesses: [],
			settings: { wordLength, allowRepeats },
		});

		//--Return game ID and target word only in cheat mode, to be passed in request--
		res.json({
			gameId,
			targetWord,
		});
	} catch (error) {
		console.error("Error starting game:", error);
		res.status(500).json({ error: "Failed to start a new game" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
