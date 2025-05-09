import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const [hideSlideBtn, setHideSlideBtn] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		setHideSlideBtn(!hideSlideBtn);
	};

	useEffect(() => {
		const mainContent = document.getElementById("root");
		if (mainContent) {
			if (isOpen) {
				mainContent.style.marginLeft = "256px";
				mainContent.style.transition = "margin-left 0.3s ease-in-out";
			} else {
				mainContent.style.marginLeft = "0";
			}
		}

		return () => {
			if (mainContent) {
				mainContent.style.marginLeft = "0";
			}
		};
	}, [isOpen]);

	return (
		<div>
			{!hideSlideBtn && (
				<button
					onClick={toggleSidebar}
					className="fixed z-10 text-white cursor-pointer mt-5 ml-5"
					aria-label="Toggle sidebar"
				>
					{isOpen ? (
						<svg
							width="32"
							height="32"
							fill="currentColor"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.75 6C2.75 4.20508 4.20508 2.75 6 2.75H18C19.7949 2.75 21.25 4.20508 21.25 6V18C21.25 19.7949 19.7949 21.25 18 21.25H6C4.20508 21.25 2.75 19.7949 2.75 18V6Z"
								strokeWidth="1"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8.75 21.25V2.75"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</button>
			)}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity duration-300 lg:hidden"
					onClick={toggleSidebar}
					aria-hidden="true"
				/>
			)}

			<div
				className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 text-white shadow-lg transition-transform duration-300 ease-in-out transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} z-40 overflow-y-auto`}
			>
				<div className="flex justify-between px-6 py-5 border-b border-gray-700">
					<h2 className="text-xl font-bold">Wordle Game</h2>
					<button
						onClick={toggleSidebar}
						className=" text-white cursor-pointer"
						aria-label="Toggle sidebar"
					>
						{isOpen ? (
							<svg
								width="32"
								height="32"
								fill="currentColor"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M2.75 6C2.75 4.20508 4.20508 2.75 6 2.75H18C19.7949 2.75 21.25 4.20508 21.25 6V18C21.25 19.7949 19.7949 21.25 18 21.25H6C4.20508 21.25 2.75 19.7949 2.75 18V6Z"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8.75 21.25V2.75"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
					</button>
				</div>

				<nav className="mt-5">
					<ul className="space-y-1">
						<li>
							<Link
								to="/"
								onClick={toggleSidebar}
								className="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors duration-200 rounded-lg mx-2"
							>
								<svg
									className="w-5 h-5 mr-3"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
								Play
							</Link>
						</li>
						<li>
							<a
								href="http://localhost:5080/scores"
								onClick={toggleSidebar}
								className="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors duration-200 rounded-lg mx-2"
								target="_self"
							>
								<svg
									className="w-5 h-5 mr-3"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
								Scores
							</a>
						</li>
						<li>
							<Link
								to="About"
								onClick={toggleSidebar}
								className="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors duration-200 rounded-lg mx-2"
							>
								<svg
									className="w-5 h-5 mr-3"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								About
							</Link>
						</li>
						<li>
							<Link
								to="Setting"
								onClick={toggleSidebar}
								className="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors duration-200 rounded-lg mx-2"
							>
								<svg
									className="w-5 h-5 mr-3"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								Setting
							</Link>
						</li>
					</ul>
				</nav>

				{/*-------Footer section-----------*/}
				<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 mt-auto">
					<p className="text-sm text-gray-400 text-center">
					Version 1.0 • KikoDevv
					</p>
				</div>
			</div>
		</div>
	);
}
