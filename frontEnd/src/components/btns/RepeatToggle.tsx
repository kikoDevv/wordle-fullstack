import React, { useState } from "react";

interface RepeatLetterToggleProps {
	onChange?: (isAllowed: boolean) => void;
	defaultActive?: boolean;
	className?: string;
}

const RepeatLetterToggle: React.FC<RepeatLetterToggleProps> = ({
	onChange,
	defaultActive = false,
	className = "",
}) => {
	const [isActive, setIsActive] = useState(defaultActive);
	const [isAnimating, setIsAnimating] = useState(false);

	const handleToggle = () => {
		setIsAnimating(true);
		// Animation timing matches the CSS transition duration
		setTimeout(() => setIsAnimating(false), 500);

		const newState = !isActive;
		setIsActive(newState);
		if (onChange) onChange(newState);
	};

	return (
		<button
			onClick={handleToggle}
			className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium cursor-pointer border-none m-1 transition-all duration-300 ease-in-out
        ${
					isActive
						? "bg-emerald-600 text-white"
						: "bg-neutral-600 hover:bg-neutral-500"
				} ${className} ${isAnimating ? "scale-100" : ""}`}
		>
			<div
				className={`transition-all duration-300 transform ${
					isAnimating ? "animate-[spin_0.5s_ease-out] scale-110" : ""
				}`}
			>
				{isActive ? (
					// Active state - repeats allowed icon
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={isAnimating ? "animate-pulse" : ""}
					>
						<path
							d="M17 3L21 7L17 11M3 12V10C3 8.89543 3.89543 8 5 8H21M7 21L3 17L7 13M21 12V14C21 15.1046 20.1046 16 19 16H3"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				) : (
					// Inactive state - no repeats icon
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={isAnimating ? "animate-pulse" : ""}
					>
						<path
							d="M18 3L22 7L18 11"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M2 7H22"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M6 21L2 17L6 13"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M22 17H2"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<path
							d="M4 3L20 21"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</div>
			<span className={`${isAnimating ? "animate-pulse" : ""}`}>
				{isActive ? "Repeats On" : "No Repeats"}
			</span>
		</button>
	);
};

export default RepeatLetterToggle;
