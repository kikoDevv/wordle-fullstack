import Button from "../components/Button";
import React, { useState, useEffect } from "react";
import { GetFeedback } from "../services/api/targetWord.js";

export default function Home() {
	//-------State for the current input value------
	const [typedValue, setTypedValue] = useState("");
	//-------State for the current characters-----
	const [words, setWords] = useState<string[]>([]);
	//--------State to store all submitted entries------
	const [submissions, setSubmissions] = useState<string[][]>([]);

	const [correctWordsCollection, setCorrectWordsCollection] = useState<any[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTypedValue(e.target.value);
	};

	useEffect(() => {
		const characters = typedValue.split("").filter((char) => char !== " ");
		setWords(characters);
	}, [typedValue]);
	//-------onSubmit do this-------
	const handleSubmit = () => {
		if (words.length > 0) {
			const targetWord = "hellow";

			const newSubmission = [...words];

			const correctWordIs = GetFeedback(newSubmission.join(""), targetWord);
			console.log("correctWordIs--->:", correctWordIs);

			// Update submissions state
			setSubmissions([...submissions, newSubmission]);
			setTypedValue("");

			// save all of the corrected words with the feedback
			setCorrectWordsCollection([...correctWordsCollection, correctWordIs])

		}
	};
	// console.log("correct words collection-->", correctWordsCollection);
	//----key press for enter or return-------
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div>
				{submissions.length > 0 && (
					<div className="grid bg-neutral-700 rounded-2xl mb-1 py-1 flex-wrap">
						{submissions.map((submission, subIndex) => (
							<div key={subIndex} className="flex justify-center mb-1">
								{submission.map((char, charIndex) => (
									<h1
										key={`sub-${subIndex}-char-${charIndex}`}
										className="font-extrabold px-4 py-2 mx-0.5 bg-amber-300 rounded-xl"
									>
										{char}
									</h1>
								))}
							</div>
						))}
					</div>
				)}

				<div className="bg-neutral-700 rounded-2xl w-dvh">
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
					<div className="flex px-2 py-2">
						<Button text="Repeat words" />
						<Button text="Words lenght" />
						<Button text="New game" />
						<Button text="cheat" />
						<button
							onClick={handleSubmit}
							className="ml-auto bg-yellow-50 text-black px-3 py-1 rounded-full font-bold"
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
