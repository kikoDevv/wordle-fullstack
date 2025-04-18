import Button from "../components/btns/Button";
import React, { useState, useEffect } from "react";
import SlideSelector from "../components/btns/SlideSelector";
import SubmitButton from "../components/btns/SubmitButton";
import RepeatLetterToggle from "../components/btns/RepeatToggle";
import CheatModeToggle from "../components/btns/CheatToggle";
import { wordService } from "../services/api/wordService";
import RevealingText from "../components/RevealingText";

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

	const [correctWordsCollection, setCorrectWordsCollection] = useState<
		Array<
			Array<{
				letter: string;
				result: string;
			}>
		>
	>([]);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	//---State for game completion and score submission-----
	const [gameStartTime, setGameStartTime] = useState<number>(Date.now());
	const [gameWon, setGameWon] = useState(false);
	const [showScoreSection, setShowScoreSection] = useState(false);
	const [nameInputMode, setNameInputMode] = useState(false);
	const [nameInputError, setNameInputError] = useState<string | null>(null);
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
		"welcome" | "error" | "success" | "congrats"
	>("welcome");
	const [messageText, setMessageText] = useState(
		"May fortune smile upon you !"
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		if (nameInputMode) {
			setTypedValue(input);
			if (nameInputError) setNameInputError(null);
		} else {
			const limitedInput = input.slice(0, wordLength);
			setTypedValue(limitedInput);
		}
	};

	useEffect(() => {
		if (!nameInputMode) {
			const characters = typedValue.split("").filter((char) => char !== " ");
			setWords(characters);
		}
	}, [typedValue, nameInputMode]);

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
		if (messageType !== "welcome") {
			const delay = messageType === "congrats" ? 1500 : 300;

			setTimeout(() => {
				setMessageText("good luck!1 (: ");
				setMessageType("welcome");
				setMessageAnimationKey((prev) => prev + 1);
			}, delay);
		}
	};

	// Format time for display
	const formatTime = (ms: number): string => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	//----------------------Start a new game------------------------------
	const startNewGame = async () => {
		setIsSubmitting(true);
		setError(null);
		setSuccessMessage(null);
		setShowScoreSection(false);
		setNameInputMode(false);
		setNameInputError(null);

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
		if (nameInputMode) {
			// Handle score submission when in name input mode
			if (!typedValue.trim()) {
				setNameInputError("Please enter your name");
				return;
			}

			try {
				setIsSubmitting(true);
				await wordService.submitScore({
					playerName: typedValue.trim(),
					targetWord: gameStats.targetWord,
					guesses: gameStats.guesses,
					duration: gameStats.timeTaken,
					wordLength: gameStats.wordLength,
					uniqueLettersOnly: !gameStats.allowRepeats,
					gameId: gameId || undefined,
				});

				const successMsg = `Score saved successfully for ${typedValue.trim()}!`;
				setSuccessMessage(successMsg);
				setMessageText(successMsg);
				setMessageType("success");
				setMessageAnimationKey((prev) => prev + 1);

				setShowScoreSection(false);
				setNameInputMode(false);
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
			return;
		}

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
					isCheatMode ? targetWord || undefined : undefined,
					gameId || undefined
				);

				const newSubmission = [...words];
				setSubmissions([...submissions, newSubmission]);
				setTypedValue("");

				const updatedCollections = [...correctWordsCollection, response.result];
				setCorrectWordsCollection(updatedCollections);

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

					setMessageText(`Congratulations! You guessed the word-->${guess}<--`);
					setMessageType("congrats");
					setMessageAnimationKey((prev) => prev + 1);

					setShowScoreSection(true);
					setNameInputMode(true);
					setTypedValue("");
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
		if (e.key === "Enter" && !isSubmitting) {
			if (nameInputMode || words.length > 0) {
				handleSubmit();
			}
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

	const skipScoreSubmission = () => {
		setShowScoreSection(false);
		setNameInputMode(false);
		// Start a new game
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
							} ${messageType === "error" ? "pr-15" : ""} ${
								messageType === "congrats"
									? "font-extrabold text-2xl pr-15"
									: ""
							}`}
							dotColor={
								messageType === "error"
									? "bg-red-500"
									: messageType === "success"
									? "bg-green-500"
									: messageType === "congrats"
									? "bg-green-500"
									: "bg-white"
							}
							textColor={
								messageType === "error"
									? "text-red-400"
									: messageType === "success"
									? "text-green-400"
									: messageType === "congrats"
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
									{wordFeedback.map(
										(
											charInfo: { letter: string; result: string },
											charIndex: number
										) => (
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
										)
									)}
								</div>
							))}
						</div>
					)}

					{/*------------------Lower section--------------------*/}
					<div className="bg-neutral-700 rounded-3xl">
						<div className="flex justify-center">
							{!nameInputMode &&
								words.map((char, index) => (
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
								placeholder={
									nameInputMode
										? "Enter your name to save your score"
										: "Type the words here or make any changes before starting the game"
								}
								className="w-full p-4 border-none outline-none"
								value={typedValue}
								onChange={handleInputChange}
								onKeyDown={handleKeyPress}
							/>
							{nameInputError && nameInputMode && (
								<p className="text-red-500 p-2 text-center">{nameInputError}</p>
							)}
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
			</div>

			<div className="py-4">
				<p className="text-center text-xs text-gray-500">
					© 2025 KikoDevv. Inspired by ChatGPT UI. All rights reserved.
				</p>
			</div>
		</div>
	);
}
