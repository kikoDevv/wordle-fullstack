import Button from "../components/btns/Button";
import React, { useState, useEffect } from "react";
import SlideSelector from "../components/btns/SlideSelector";
import SubmitButton from "../components/btns/SubmitButton";
import RepeatLetterToggle from "../components/btns/RepeatToggle";
import CheatModeToggle from "../components/btns/CheatToggle";
import ScoreModal from "../components/ScoreModal";
import { wordService } from "../services/api/wordService";
import RevealingText from "../components/RevealingText";

import Revv from "../components/Revv";

export default function Home() {
	//-------State for the current input value------
	const [typedValue, setTypedValue] = useState("");
	//-------State for the current characters-----
	const [words, setWords] = useState<string[]>([]);
	//--------State to store all submitted entries------
	const [submissions, setSubmissions] = useState<string[][]>([]);

	//-----Game config states------
	const [wordLength, setWordLength] = useState(5);
	const [allowRepeats, setAllowRepeats] = useState(false);
	const [isCheatMode, setIsCheatMode] = useState(false);
	const [gameId, setGameId] = useState<string | null>(null);
	const [targetWord, setTargetWord] = useState<string | null>(null);

	const [correctWordsCollection, setCorrectWordsCollection] = useState<any[]>(
		[]
	);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	//---State for game completion and score submission-----
	const [gameStartTime, setGameStartTime] = useState<number>(Date.now());
	const [gameWon, setGameWon] = useState(false);
	const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
	const [gameStats, setGameStats] = useState({
		guesses: 0,
		wordLength: 5,
		allowRepeats: false,
		timeTaken: 0,
		targetWord: "",
	});
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	//---animation refresh keys---
	const [messageAnimationKey, setMessageAnimationKey] = useState(0);
	const [messageType, setMessageType] = useState<
		"welcome" | "error" | "success"
	>("welcome");
	const [messageText, setMessageText] = useState(
		"May fortune smile upon you !"
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Limit input to current wordLength by taking only the first N characters
		const input = e.target.value;
		const limitedInput = input.slice(0, wordLength);
		setTypedValue(limitedInput);
	};

	useEffect(() => {
		const characters = typedValue.split("").filter((char) => char !== " ");
		setWords(characters);
	}, [typedValue]);

	//-------Clear success message with some delay-------
	useEffect(() => {
		if (successMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [successMessage]);

	//-------Message animation completion handler-------
	const handleMessageAnimationComplete = () => {
		// Only clear error and success messages, keep welcome message
		if (messageType !== "welcome") {
			setTimeout(() => {
				setMessageText("good luck!1 (: ");
				setMessageType("welcome");
				setMessageAnimationKey((prev) => prev + 1);
			}, 300);
		}
	};

	//----------------------Start a new game------------------------------
	const startNewGame = async () => {
		setIsSubmitting(true);
		setError(null);
		setSuccessMessage(null);

		// Show welcome message
		setMessageText("May fortune smile upon you! ");
		setMessageType("welcome");
		setMessageAnimationKey((prev) => prev + 1);

		setGameWon(false);

		try {
			const response = await wordService.startGame({
				wordLength,
				allowRepeats,
			});

			setGameId(response.gameId);
			setGameStartTime(Date.now());

			if (isCheatMode && response.targetWord) {
				setTargetWord(response.targetWord);
				console.log("Cheat mode ON - Target word:", response.targetWord);
			} else {
				setTargetWord(null);
			}

			setSubmissions([]);
			setCorrectWordsCollection([]);
			setTypedValue("");
		} catch (err) {
			const errorMsg = "Failed to start a new game. Please try again. ";
			setError(errorMsg);
			setMessageText(errorMsg);
			setMessageType("error");
			setMessageAnimationKey((prev) => prev + 1);
			console.error("Error starting new game:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		startNewGame();
	}, []);

	const checkIfWon = (result: Array<{ letter: string; result: string }>) => {
		return result.every((item) => item.result === "correct");
	};

	//-------onSubmit do this-------
	const handleSubmit = async () => {
		if (words.length > 0) {
			setIsSubmitting(true);
			setError(null);

			try {
				const guess = words.join("");

				//--Check if the guess length matches the current word length setting--
				if (guess.length !== wordLength) {
					const errorMsg = `Your guess must be ${wordLength} letters long!  `;
					setError(errorMsg);
					setMessageText(errorMsg);
					setMessageType("error");
					setMessageAnimationKey((prev) => prev + 1);
					setIsSubmitting(false);
					return;
				}

				const response = await wordService.checkGuess(
					guess,
					isCheatMode ? targetWord : undefined,
					gameId || undefined
				);

				const newSubmission = [...words];
				setSubmissions([...submissions, newSubmission]);
				setTypedValue("");

				const updatedCollections = [...correctWordsCollection, response.result];
				setCorrectWordsCollection(updatedCollections);

				// Check if the player has won
				const hasWon = checkIfWon(response.result);
				if (hasWon) {
					const gameEndTime = Date.now();
					const gameDuration = gameEndTime - gameStartTime;

					setGameWon(true);
					setGameStats({
						guesses: updatedCollections.length,
						wordLength: wordLength,
						allowRepeats: allowRepeats,
						timeTaken: gameDuration,
						targetWord: guess,
					});
					setIsScoreModalOpen(true);
				}
			} catch (err: any) {
				let errorMessage = "Failed to check your guess. Please try again.";
				if (err.response && err.response.data && err.response.data.error) {
					errorMessage = err.response.data.error;
				} else if (err.message) {
					errorMessage = err.message;
				}

				if (errorMessage.includes("length doesn't match")) {
					errorMessage += " Starting a new game...";
					setTimeout(() => {
						startNewGame();
					}, 2000);
				}

				setError(errorMessage);
				setMessageText(errorMessage);
				setMessageType("error");
				setMessageAnimationKey((prev) => prev + 1);
				console.error("Error submitting guess:", err);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	//----key press for enter or return-------
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isSubmitting && words.length > 0) {
			handleSubmit();
		}
	};

	const handleLengthChange = (length: number) => {
		setWordLength(length);
		startNewGame();
	};

	const handleRepeatsChange = (isAllowed: boolean) => {
		setAllowRepeats(isAllowed);
		startNewGame();
	};

	const handleCheatModeChange = (enabled: boolean) => {
		setIsCheatMode(enabled);
		startNewGame();
	};

	const handleScoreSubmit = async (playerName: string) => {
		try {
			setIsSubmitting(true);
			await wordService.submitScore({
				playerName,
				targetWord: gameStats.targetWord,
				guesses: gameStats.guesses,
				duration: gameStats.timeTaken,
				wordLength: gameStats.wordLength,
				uniqueLettersOnly: !gameStats.allowRepeats,
				gameId: gameId || undefined,
			});

			const successMsg = `Score saved successfully for ${playerName}!`;
			setSuccessMessage(successMsg);
			setMessageText(successMsg);
			setMessageType("success");
			setMessageAnimationKey((prev) => prev + 1);

			setIsScoreModalOpen(false);
			// Start a new game after submission
			setTimeout(() => {
				startNewGame();
			}, 3000);
		} catch (err) {
			const errorMsg = "Failed to save your score. Please try again.";
			setError(errorMsg);
			setMessageText(errorMsg);
			setMessageType("error");
			setMessageAnimationKey((prev) => prev + 1);
			console.error("Error saving score:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCloseScoreModal = () => {
		setIsScoreModalOpen(false);
		// Start a new game after closing without saving
		startNewGame();
	};

	//-----------------------------Root-----------------------------------------
	return (
		<div className="h-screen flex flex-col">
			<div className="flex-grow flex items-center justify-center">
				<div>
					{/*---------------Upper section with fixed positioning-------------*/}
					<div className="flex justify-center">
						<RevealingText
							key={messageAnimationKey}
							text={messageText}
							className={`font-medium text-xl ${
								messageType === "welcome" ? "font-extrabold text-2xl pr-15" : ""
							} ${messageType === "error" ? "pr-15" : ""}`}
							dotColor={
								messageType === "error"
									? "bg-red-500"
									: messageType === "success"
									? "bg-green-500"
									: "bg-white"
							}
							textColor={
								messageType === "error"
									? "text-red-400"
									: messageType === "success"
									? "text-green-400"
									: "text-white"
							}
							onComplete={handleMessageAnimationComplete}
						/>
					</div>
					{/*------------------lower section----------------*/}
					{submissions.length > 0 && (
						<div className="grid bg-neutral-700 rounded-3xl mb-1 flex-wrap py-4">
							{correctWordsCollection.map((wordFeedback, subIndex) => (
								<div key={subIndex} className="flex justify-center my-0.5">
									{wordFeedback.map((charInfo, charIndex) => (
										<h1
											key={`sub-${subIndex}-char-${charIndex}`}
											className={`font-extrabold px-4 py-2 mx-0.5 rounded-xl ${
												charInfo.result === "correct"
													? "bg-green-500"
													: charInfo.result === "misplaced"
													? "bg-amber-300"
													: "bg-red-400"
											}`}
										>
											{charInfo.letter}
										</h1>
									))}
								</div>
							))}
						</div>
					)}

					{/*------------------Lower section--------------------*/}
					<div className="bg-neutral-700 rounded-3xl">
						<div className="flex justify-center">
							{words.map((char, index) => (
								<h1
									key={index}
									className="font-medium text-3xl text-center flex items-center justify-center min-h-12 mx-0.5 min-w-12 bg-neutral-600 rounded-xl mt-1.5"
								>
									{char}
								</h1>
							))}
						</div>
						<div className="w-full">
							<input
								type="input"
								placeholder="Type the words here or make any changes before starting the game"
								className="w-full p-4 border-none outline-none"
								value={typedValue}
								onChange={handleInputChange}
								onKeyDown={handleKeyPress}
							/>
						</div>
						{/* //-------------buttons------------------ */}
						<div className="flex px-2 py-2">
							<RepeatLetterToggle
								onChange={handleRepeatsChange}
								defaultActive={allowRepeats}
							/>

							<CheatModeToggle
								onChange={handleCheatModeChange}
								defaultActive={isCheatMode}
							/>
							<SlideSelector
								onLengthChange={handleLengthChange}
								defaultLength={wordLength}
							/>

							<Button text="New game" onClick={startNewGame} />
							<SubmitButton
								onClick={handleSubmit}
								disabled={words.length === 0 || isSubmitting}
								isSubmitting={isSubmitting}
								className="pl-20"
							/>
						</div>
					</div>
				</div>

				{/* Score submission modal */}
				<ScoreModal
					isOpen={isScoreModalOpen}
					onClose={handleCloseScoreModal}
					onSubmit={handleScoreSubmit}
					gameStats={gameStats}
				/>
			</div>

			<div className="py-4">
				<p className="text-center text-xs text-gray-500">
					© 2025 KikoDevv. Inspired by ChatGPT UI. All rights reserved.
				</p>
			</div>
		</div>
	);
}
