import Button from "../components/btns/Button.js";
import React, { useState, useEffect } from "react";
import { GetFeedback } from "../services/api/targetWord.js";
import SlideSelector from "../components/btns/SlideSelector.js";
import SubmitButton from "../components/btns/SubmitButton.js";
import RepeatLetterToggle from "../components/btns/RepeatToggle.js";
import CheatModeToggle from "../components/btns/CheatToggle.js";

export default function Home() {
	//-------State for the current input value------
	const [typedValue, setTypedValue] = useState("");
	//-------State for the current characters-----
	const [words, setWords] = useState<string[]>([]);
	//--------State to store all submitted entries------
	const [submissions, setSubmissions] = useState<string[][]>([]);

	const [correctWordsCollection, setCorrectWordsCollection] = useState<any[]>(
		[]
	);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedValue(e.target.value);
	};

	useEffect(() => {
		const characters = typedValue.split("").filter((char) => char !== " ");
		setWords(characters);
	}, [typedValue]);
	//-------onSubmit do this-------
	// Modified handleSubmit to handle submission state
	const handleSubmit = () => {
		if (words.length > 0) {
			setIsSubmitting(true);

			// Simulate a slight delay for the submission process
			setTimeout(() => {
				const targetWord = "hellow";

				const newSubmission = [...words];

				const correctWordIs = GetFeedback(newSubmission.join(""), targetWord);
				console.log("correctWordIs--->:", correctWordIs);

				// Update submissions state
				setSubmissions([...submissions, newSubmission]);
				setTypedValue("");

				// save all of the corrected words with the feedback
				setCorrectWordsCollection([...correctWordsCollection, correctWordIs]);
				setIsSubmitting(false);
			}, 500);
		}
	};
	// console.log("correct words collection-->", correctWordsCollection);
	//----key press for enter or return-------
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !isSubmitting && words.length > 0) {
			handleSubmit();
		}
	};

	//-----------------------------Root-----------------------------------------
	return (
		<div className="h-screen flex items-center justify-center">
			<div>
				{/*---------------Upper section-------------*/}
				{submissions.length > 0 && (
					<div className="grid bg-neutral-700 rounded-3xl mb-1  flex-wrap py-4">
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
				{submissions.length == 0 && (
					<h1 className="place-self-center font-extrabold text-2xl mb-5">
					May fortune smile upon you
					</h1>
				)}
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
							placeholder="Type the worlds here or make any changes before starting the game"
							className="w-full p-4 border-none outline-none"
							value={typedValue}
							onChange={handleInputChange}
							onKeyDown={handleKeyPress}
						/>
					</div>
					{/* //-------------buttons------------------ */}
					<div className="flex px-2 py-2">
						<RepeatLetterToggle
							onChange={(allowed) => {
								console.log("Repeat letters allowed:", allowed);
							}}
						/>

						<CheatModeToggle
							onChange={(enabled) => {
								console.log("Cheat mode enabled:", enabled);
							}}
						/>
						<SlideSelector
							onLengthChange={(length) => {
								console.log(`Selected word length: ${length}`);
							}}
							defaultLength={5}
						/>

						<Button text="New game" />
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
	);
}
