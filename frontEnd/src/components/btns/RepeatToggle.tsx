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

	const handleToggle = () => {
		const newState = !isActive;
		setIsActive(newState);
		if (onChange) onChange(newState);
	};

	return (
		<button
			onClick={handleToggle}
			className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium cursor-pointer border-none m-1 transition-colors duration-200
        ${
					isActive
						? "bg-emerald-600 text-white"
						: "bg-neutral-600 hover:bg-neutral-500"
				} ${className}`}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={`transition-transform duration-300 ${
					isActive ? "rotate-180" : ""
				}`}
			>
				<path
					d="M17 3L21 7L17 11M3 12V10C3 8.89543 3.89543 8 5 8H21M7 21L3 17L7 13M21 12V14C21 15.1046 20.1046 16 19 16H3"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			{isActive ? "Repeats On" : "Word Repeats"}
		</button>
	);
};

export default RepeatLetterToggle;
