import axios from "axios";

interface CheckGuessResponse {
	word: string;
	result: Array<{
		letter: string;
		result: "correct" | "misplaced" | "incorrect";
	}>;
}

interface GameConfig {
	wordLength: number;
	allowRepeats: boolean;
}

interface ScoreData {
	playerName: string;
	targetWord: string;
	guesses: number;
	duration: number; // time in milliseconds
	wordLength: number;
	uniqueLettersOnly: boolean;
	gameId?: string;
}

export const wordService = {
	//-----Get a random word from the backend based on settings----
	getRandomWord: async (
		length: number,
		allowRepeats: boolean
	): Promise<string> => {
		try {
			const response = await axios.get("/api/words/random", {
				params: { length, allowRepeats },
			});
			return response.data.word;
		} catch (error) {
			console.error("Error fetching random word:", error);
			throw error;
		}
	},

	//--Checks a guess against the target word--
	checkGuess: async (
		guess: string,
		targetWord?: string,
		gameId?: string
	): Promise<CheckGuessResponse> => {
		try {
			const response = await axios.post("/api/words/check", {
				guess,
				targetWord, // let me cheat man!
				gameId,
			});
			return response.data;
		} catch (error) {
			console.error("Error checking guess:", error);
			throw error;
		}
	},

	//---Starts a new game session with given config---
	startGame: async (
		config: GameConfig
	): Promise<{ targetWord?: string; gameId: string }> => {
		try {
			const response = await axios.post("/api/game/start", config);
			return response.data;
		} catch (error) {
			console.error("Error starting game:", error);
			throw error;
		}
	},

	//---Submit score after winning a game---
	submitScore: async (scoreData: ScoreData): Promise<{ id: string }> => {
		try {
			const response = await axios.post("/api/scores", scoreData);
			return response.data;
		} catch (error) {
			console.error("Error submitting score:", error);
			throw error;
		}
	},

	//---Get highscores with optional filtering---
	getHighscores: async (filters?: {
		wordLength?: number;
		uniqueLettersOnly?: boolean;
		sortBy?: "time" | "guesses" | "date";
		order?: "asc" | "desc";
	}) => {
		try {
			const response = await axios.get("/api/scores", { params: filters });
			return response.data;
		} catch (error) {
			console.error("Error fetching highscores:", error);
			throw error;
		}
	},
};

export default wordService;
