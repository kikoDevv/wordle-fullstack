import React, { useState, useEffect } from "react";
import Button from "./btns/Button";

interface ScoreModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (playerName: string) => void;
	gameStats: {
		guesses: number;
		wordLength: number;
		allowRepeats: boolean;
		timeTaken: number;
		targetWord: string;
	};
}

const ScoreModal: React.FC<ScoreModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	gameStats,
}) => {
	const [playerName, setPlayerName] = useState("");
	const [error, setError] = useState<string | null>(null);

	// Reset form when modal opens
	useEffect(() => {
		if (isOpen) {
			setPlayerName("");
			setError(null);
		}
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!playerName.trim()) {
			setError("Please enter your name");
			return;
		}
		onSubmit(playerName);
	};

	const formatTime = (ms: number): string => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-neutral-800 p-6 rounded-lg max-w-md w-full">
				<h2 className="text-2xl font-bold text-center mb-4 text-white">
					Congratulations!
				</h2>

				<div className="mb-6 bg-neutral-700 p-4 rounded-lg">
					<p className="text-white mb-2">
						You guessed the word:{" "}
						<span className="font-bold text-green-400">
							{gameStats.targetWord}
						</span>
					</p>
					<p className="text-white mb-2">
						Tries: <span className="font-bold">{gameStats.guesses}</span>
					</p>
					<p className="text-white mb-2">
						Time:{" "}
						<span className="font-bold">{formatTime(gameStats.timeTaken)}</span>
					</p>
					<p className="text-white mb-2">
						Word Length:{" "}
						<span className="font-bold">{gameStats.wordLength}</span>
					</p>
					<p className="text-white">
						Repeated Letters:{" "}
						<span className="font-bold">
							{gameStats.allowRepeats ? "Allowed" : "Not Allowed"}
						</span>
					</p>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="playerName" className="block text-white mb-2">
							Enter your name to save your score:
						</label>
						<input
							type="text"
							id="playerName"
							value={playerName}
							onChange={(e) => setPlayerName(e.target.value)}
							className="w-full p-2 rounded border border-neutral-600 bg-neutral-700 text-white"
							maxLength={20}
						/>
						{error && <p className="text-red-500 mt-1">{error}</p>}
					</div>

					<div className="flex justify-between">
						<Button
							text="Skip"
							onClick={onClose}
							className="bg-neutral-600 hover:bg-neutral-500"
						/>
						<Button
							text="Save Score"
							onClick={handleSubmit}
							className="bg-green-600 hover:bg-green-500"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ScoreModal;
