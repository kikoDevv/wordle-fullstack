import { http, HttpResponse } from "msw";

//----dummy target------
const TEST_TARGET_WORDS = {
	default: "apple",
	5: "apple",
	4: "test",
	6: "create",
};

//--------Mock API response for checking guesses-
const checkGuess = (guess: string, targetWord: string) => {
	const result = [];
	const targetLetters = targetWord.split("");

	//---check for correct positions
	for (let i = 0; i < guess.length; i++) {
		const letter = guess[i];

		if (letter === targetWord[i]) {
			result.push({ letter, result: "correct" });
			targetLetters[i] = null;
		} else {
			result.push({ letter, result: "pending" });
		}
	}

	//-----------check for misplaced letters-
	for (let i = 0; i < result.length; i++) {
		if (result[i].result === "pending") {
			const letter = result[i].letter;
			const targetIndex = targetLetters.indexOf(letter);

			if (targetIndex !== -1) {
				result[i].result = "misplaced";
				targetLetters[targetIndex] = null; // Mark as used
			} else {
				result[i].result = "incorrect";
			}
		}
	}

	return result;
};

export const handlers = [
	http.post("/api/game/start", async ({ request }) => {
		const body = await request.json();
		const { wordLength = 5 } = body;

		const targetWord =
			TEST_TARGET_WORDS[wordLength] || TEST_TARGET_WORDS.default;

		return HttpResponse.json({
			gameId: "test-game-id",
			targetWord,
		});
	}),

	//-------Handle checkGuess API call------
	http.post("/api/words/check", async ({ request }) => {
		const body = await request.json();
		const { guess, targetWord } = body;


		const wordToCheck = targetWord || TEST_TARGET_WORDS.default;

		return HttpResponse.json({
			word: guess,
			result: checkGuess(guess, wordToCheck),
		});
	}),

	http.post("/api/scores", () => {
		return HttpResponse.json({
			id: "test-score-id",
			message: "Score saved successfully",
		});
	}),
];
