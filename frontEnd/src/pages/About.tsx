import Button from "../components/btns/Button";
import { Link } from "react-router-dom";

export default function About() {
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-dvh px-4">
				<div className="bg-neutral-700 rounded-3xl mb-6 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-700">
					<div className="bg-neutral-800 p-6 text-center">
						<h1 className="text-3xl font-bold mb-2">About Wordle</h1>
						<p className="text-neutral-400">
							The word-guessing game you'll love
						</p>
					</div>

					<div className="p-6">
						<div className="grid gap-8">
							<div>
								<h2 className="text-xl font-bold mb-3 flex items-center">
									<svg
										className="w-6 h-6 mr-2 text-teal-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
									How To Play
								</h2>
								<div className="bg-neutral-800 rounded-xl p-4">
									<ol className="list-decimal list-inside space-y-2 ml-2">
										<li>Guess the word in six tries or less</li>
										<li>Each guess must be a valid word</li>
										<li>Color feedback shows how close your guess was:</li>
									</ol>

									<div className="flex flex-wrap gap-3 my-4 justify-center">
										<div className="flex items-center">
											<span className="inline-block w-6 h-6 rounded bg-green-500 mr-2"></span>
											<span>Correct letter and position</span>
										</div>
										<div className="flex items-center">
											<span className="inline-block w-6 h-6 rounded bg-amber-300 mr-2"></span>
											<span>Correct letter, wrong position</span>
										</div>
										<div className="flex items-center">
											<span className="inline-block w-6 h-6 rounded bg-red-400 mr-2"></span>
											<span>Letter not in the word</span>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h2 className="text-xl font-bold mb-3 flex items-center">
									<svg
										className="w-6 h-6 mr-2 text-teal-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
									Game Features
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="bg-neutral-800 p-4 rounded-xl">
										<h3 className="font-semibold mb-2">
											Word Length Selection
										</h3>
										<p className="text-neutral-300">
											Choose word lengths from 3 to 8 letters to vary difficulty
										</p>
									</div>
									<div className="bg-neutral-800 p-4 rounded-xl">
										<h3 className="font-semibold mb-2">
											Repeat Letters Toggle
										</h3>
										<p className="text-neutral-300">
											Enable or disable words with repeated letters
										</p>
									</div>
									<div className="bg-neutral-800 p-4 rounded-xl">
										<h3 className="font-semibold mb-2">Cheat Mode</h3>
										<p className="text-neutral-300">
											Get hints when you're stuck (for casual play)
										</p>
									</div>
									<div className="bg-neutral-800 p-4 rounded-xl">
										<h3 className="font-semibold mb-2">Score Tracking</h3>
										<p className="text-neutral-300">
											Track your performance and share with friends
										</p>
									</div>
								</div>
							</div>

							<div className="mt-4 text-center">
								<p className="text-neutral-400 text-sm mb-4">
									Version 1.0 • Created by KikoDevv
								</p>
								<div className="flex justify-center gap-4">
									<Link to="/">
										<Button text="Start Playing" />
									</Link>
									<Link to="/score">
										<Button text="View Scores" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
