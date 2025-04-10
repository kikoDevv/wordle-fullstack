import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/btns/Button";

export default function Score() {
	const [activeTab, setActiveTab] = useState("all-time");

	//---pram data whitch is fake right now----
	const scoreData = {
		"all-time": [
			{
				id: 1,
				rank: 1,
				name: "Alex",
				avatar: "A",
				score: 9850,
				wordLength: 6,
				attempts: 3,
				date: "2023-11-15",
			},
			{
				id: 2,
				rank: 2,
				name: "Morgan",
				avatar: "M",
				score: 8720,
				wordLength: 5,
				attempts: 2,
				date: "2023-10-22",
			},
			{
				id: 3,
				rank: 3,
				name: "Taylor",
				avatar: "T",
				score: 7650,
				wordLength: 7,
				attempts: 4,
				date: "2023-09-30",
			},
			{
				id: 4,
				rank: 4,
				name: "Jamie",
				avatar: "J",
				score: 6340,
				wordLength: 5,
				attempts: 3,
				date: "2023-11-02",
			},
			{
				id: 5,
				rank: 5,
				name: "Casey",
				avatar: "C",
				score: 5980,
				wordLength: 6,
				attempts: 5,
				date: "2023-10-18",
			},
		],
		weekly: [
			{
				id: 6,
				rank: 1,
				name: "Jordan",
				avatar: "J",
				score: 4250,
				wordLength: 5,
				attempts: 2,
				date: "2023-11-12",
			},
			{
				id: 7,
				rank: 2,
				name: "Riley",
				avatar: "R",
				score: 3980,
				wordLength: 6,
				attempts: 3,
				date: "2023-11-14",
			},
			{
				id: 2,
				rank: 3,
				name: "Morgan",
				avatar: "M",
				score: 3720,
				wordLength: 5,
				attempts: 2,
				date: "2023-11-13",
			},
		],
		today: [
			{
				id: 8,
				rank: 1,
				name: "Quinn",
				avatar: "Q",
				score: 2150,
				wordLength: 6,
				attempts: 4,
				date: "2023-11-15",
			},
			{
				id: 1,
				rank: 2,
				name: "Alex",
				avatar: "A",
				score: 1950,
				wordLength: 5,
				attempts: 3,
				date: "2023-11-15",
			},
		],
	};

	//------------scores for the active tab----------
	const scores = scoreData[activeTab as keyof typeof scoreData];

	return (
		<div className="h-screen flex items-center justify-center select-none">
			<div className="w-dvh px-4">
				<div className="bg-neutral-700 rounded-3xl mb-6 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-700">
					{/*----head-----*/}
					<div className="bg-neutral-800 p-6 text-center">
						<h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
						<p className="text-neutral-400">
							All the saved data in out data base
						</p>
					</div>

					{/*-----tab section------- */}
					<div className="bg-neutral-800 border-t border-neutral-600">
						<div className="flex">
							<button
								className={`flex-1 py-4 text-center font-medium transition-colors duration-200 cursor-pointer ${
									activeTab === "all-time"
										? "text-teal-400 border-b-2 border-teal-400"
										: "text-neutral-400 hover:text-neutral-200"
								}`}
								onClick={() => setActiveTab("all-time")}
							>
								All Time
							</button>
							<button
								className={`flex-1 py-4 text-center font-medium transition-colors duration-200 cursor-pointer ${
									activeTab === "weekly"
										? "text-teal-400 border-b-2 border-teal-400"
										: "text-neutral-400 hover:text-neutral-200"
								}`}
								onClick={() => setActiveTab("weekly")}
							>
								Weekly
							</button>
							<button
								className={`flex-1 py-4 text-center font-medium transition-colors duration-200 cursor-pointer ${
									activeTab === "today"
										? "text-teal-400 border-b-2 border-teal-400"
										: "text-neutral-400 hover:text-neutral-200"
								}`}
								onClick={() => setActiveTab("today")}
							>
								Today
							</button>
						</div>
					</div>

					{/*------score section--------*/}
					<div className="p-4">
						<div className="overflow-hidden rounded-xl">
							{/*---table header------- */}
							<div className="grid grid-cols-12 gap-2 bg-neutral-800 py-3 px-4 font-medium text-sm text-neutral-300">
								<div className="col-span-1">#</div>
								<div className="col-span-3">Player</div>
								<div className="col-span-2 text-right">Score</div>
								<div className="col-span-2 text-center">Length</div>
								<div className="col-span-2 text-center">Attempts</div>
								<div className="col-span-2 text-right">Date</div>
							</div>

							{/*------scores------*/}
							<div className="divide-y divide-neutral-600">
								{scores.map((score) => (
									<div
										key={score.id}
										className="grid grid-cols-12 gap-2 py-3 px-4 items-center hover:bg-neutral-600 transition-colors duration-150"
									>
										<div className="col-span-1">
											{score.rank === 1 && (
												<span className="text-yellow-400 text-xl">🏆</span>
											)}
											{score.rank === 2 && (
												<span className="text-gray-300 text-xl">🥈</span>
											)}
											{score.rank === 3 && (
												<span className="text-amber-600 text-xl">🥉</span>
											)}
											{score.rank > 3 && (
												<span className="text-neutral-400">{score.rank}</span>
											)}
										</div>
										<div className="col-span-3 flex items-center">
											<div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center mr-2 font-bold">
												{score.avatar}
											</div>
											<span className="font-medium">{score.name}</span>
										</div>
										<div className="col-span-2 text-right font-bold">
											{score.score.toLocaleString()}
										</div>
										<div className="col-span-2 text-center">
											<span className="bg-neutral-700 px-2 py-1 rounded-md text-sm">
												{score.wordLength} letters
											</span>
										</div>
										<div className="col-span-2 text-center">
											<div className="flex justify-center">
												{Array.from({ length: score.attempts }).map((_, i) => (
													<div
														key={i}
														className="w-2 h-2 rounded-full bg-amber-400 mx-0.5"
													></div>
												))}
											</div>
											<div className="text-xs text-neutral-400 mt-1">
												{score.attempts} tries
											</div>
										</div>
										<div className="col-span-2 text-right text-neutral-400 text-sm">
											{score.date}
										</div>
									</div>
								))}
							</div>
							<div className="flex justify-center bg-neutral-800 py-3 px-4 font-medium text-sm text-neutral-300">
								<p>See how you rank against other players</p>
							</div>
						</div>

						{/*----fallback--------*/}
						{scores.length === 0 && (
							<div className="bg-neutral-800 rounded-xl p-8 text-center">
								<p className="text-neutral-400 mb-4">
									No scores available for this period.
								</p>
							</div>
						)}

						{/*-------footer---------*/}
						<div className="mt-6 text-center">
							<div className="flex justify-center gap-4">
								<Link to="/">
									<Button text="Play Game" />
								</Link>
								<Link to="/about">
									<Button text="About" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
