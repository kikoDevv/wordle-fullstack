import { describe, it, expect } from "vitest";
import { wordService } from "../../services/api/wordService";
import { server } from "../setup";
import { http, HttpResponse } from "msw";

describe("wordService API Integration Tests", () => {
	it("should fetch a random word with specified parameters", async () => {
		server.use(
			http.get("/api/words/random", () => {
				return HttpResponse.json({
					word: "test",
				});
			})
		);

		const word = await wordService.getRandomWord(4, false);
		expect(word).toBe("test");
	});

	it("should check a guess against the target word", async () => {
		const response = await wordService.checkGuess("react", "apple");

		expect(response).toHaveProperty("word", "react");
		expect(response).toHaveProperty("result");
		expect(response.result).toBeInstanceOf(Array);

		//------fonfirm all feedbaks--a is misplaced, e is misplaced, rest are incorrect----
		const aResult = response.result.find((item) => item.letter === "a");
		expect(aResult?.result).toBe("misplaced");

		const eResult = response.result.find((item) => item.letter === "e");
		expect(eResult?.result).toBe("misplaced");

		const rResult = response.result.find((item) => item.letter === "r");
		expect(rResult?.result).toBe("incorrect");
	});

	it("should start a new game session", async () => {
		const config = { wordLength: 5, allowRepeats: false };
		const response = await wordService.startGame(config);

		expect(response).toHaveProperty("gameId", "test-game-id");
		expect(response).toHaveProperty("targetWord", "apple");
	});

	it("should submit a score", async () => {
		const scoreData = {
			playerName: "TestPlayer",
			targetWord: "apple",
			guesses: 3,
			duration: 45000,
			wordLength: 5,
			uniqueLettersOnly: true,
		};

		const response = await wordService.submitScore(scoreData);
		expect(response).toHaveProperty("id", "test-score-id");
	});

	it("should handle api errors correctly", async () => {
		server.use(
			http.post("/api/game/start", () => {
				return new HttpResponse(null, {
					status: 500,
					statusText: "Internal Server Error",
				});
			})
		);

		try {
			await wordService.startGame({ wordLength: 5, allowRepeats: false });
		} catch (error) {
			expect(error).toBeDefined();
		}
	});
});
