import React, { useState, useEffect } from "react";
import { wordService } from "../services/api/wordService";

interface Score {
	id: string;
	playerName: string;
	targetWord: string;
	guesses: number;
	duration: number;
	wordLength: number;
	uniqueLettersOnly: boolean;
	date: string;
}

const Scores: React.FC = () => {
	const [scores, setScores] = useState<Score[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filter, setFilter] = useState({
		sortBy: "date",
		order: "desc" as "asc" | "desc",
		wordLength: undefined as number | undefined,
		uniqueLettersOnly: undefined as boolean | undefined,
	});

	const formatTime = (ms: number): string => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString() + " " + date.toLocaleTimeString();
	};

	const loadScores = async () => {
		setLoading(true);
		try {
			const result = await wordService.getHighscores(filter);
			setScores(result);
			setError(null);
		} catch (err) {
			console.error("Error fetching scores:", err);
			setError("Failed to load scores. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadScores();
	}, [filter]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter((prev) => ({
			...prev,
			sortBy: e.target.value as "date" | "time" | "guesses",
		}));
	};

	const handleOrderChange = () => {
		setFilter((prev) => ({
			...prev,
			order: prev.order === "asc" ? "desc" : "asc",
		}));
	};

	const handleWordLengthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value =
			e.target.value === "all" ? undefined : parseInt(e.target.value);
		setFilter((prev) => ({ ...prev, wordLength: value }));
	};

	const handleLetterToggleChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const value = e.target.value;
		setFilter((prev) => ({
			...prev,
			uniqueLettersOnly: value === "all" ? undefined : value === "unique",
		}));
	};

	return (
		<div className="max-w-6xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">Wordle High Scores</h1>

			{/* Filters */}
			<div className="bg-neutral-700 p-4 rounded-lg mb-6">
				<h2 className="text-xl font-semibold mb-3">Filters</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div>
						<label className="block mb-1">Sort by</label>
						<select
							value={filter.sortBy}
							onChange={handleSortChange}
							className="w-full p-2 bg-neutral-600 rounded"
						>
							<option value="date">Date</option>
							<option value="guesses">Guesses</option>
							<option value="time">Time</option>
						</select>
					</div>

					<div>
						<label className="block mb-1">Order</label>
						<button
							onClick={handleOrderChange}
							className="w-full p-2 bg-neutral-600 rounded flex items-center justify-center gap-2"
						>
							{filter.order === "asc" ? "↑ Ascending" : "↓ Descending"}
						</button>
					</div>

					<div>
						<label className="block mb-1">Word Length</label>
						<select
							value={filter.wordLength || "all"}
							onChange={handleWordLengthChange}
							className="w-full p-2 bg-neutral-600 rounded"
						>
							<option value="all">All Lengths</option>
							<option value="4">4 Letters</option>
							<option value="5">5 Letters</option>
							<option value="6">6 Letters</option>
							<option value="7">7 Letters</option>
							<option value="8">8 Letters</option>
						</select>
					</div>

					<div>
						<label className="block mb-1">Letters</label>
						<select
							value={
								filter.uniqueLettersOnly === undefined
									? "all"
									: filter.uniqueLettersOnly
									? "unique"
									: "repeats"
							}
							onChange={handleLetterToggleChange}
							className="w-full p-2 bg-neutral-600 rounded"
						>
							<option value="all">All Games</option>
							<option value="unique">Unique Letters Only</option>
							<option value="repeats">With Repeated Letters</option>
						</select>
					</div>
				</div>
			</div>

			{error && (
				<div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>
			)}

			{loading ? (
				<div className="text-center p-8">Loading scores...</div>
			) : scores.length === 0 ? (
				<div className="bg-neutral-700 rounded-lg p-6 text-center">
					<p className="text-xl">No scores found</p>
					<p className="text-gray-400 mt-2">
						Try adjusting your filters or play some games first!
					</p>
				</div>
			) : (
				<div className="overflow-x-auto">
					<table className="w-full bg-neutral-700 rounded-lg overflow-hidden">
						<thead>
							<tr className="bg-neutral-600">
								<th className="p-3 text-left">Player</th>
								<th className="p-3 text-left">Word</th>
								<th className="p-3 text-left">Guesses</th>
								<th className="p-3 text-left">Time</th>
								<th className="p-3 text-left">Length</th>
								<th className="p-3 text-left">Settings</th>
								<th className="p-3 text-left">Date</th>
							</tr>
						</thead>
						<tbody>
							{scores.map((score) => (
								<tr
									key={score.id}
									className="border-t border-neutral-600 hover:bg-neutral-600"
								>
									<td className="p-3">{score.playerName}</td>
									<td className="p-3 font-mono">{score.targetWord}</td>
									<td className="p-3">{score.guesses}</td>
									<td className="p-3">{formatTime(score.duration)}</td>
									<td className="p-3">{score.wordLength}</td>
									<td className="p-3">
										{score.uniqueLettersOnly
											? "Unique Letters"
											: "Repeats Allowed"}
									</td>
									<td className="p-3">{formatDate(score.date)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default Scores;
