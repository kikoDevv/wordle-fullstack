import React, { useState } from "react";

interface CheatModeToggleProps {
	onChange?: (isEnabled: boolean) => void;
	defaultActive?: boolean;
	className?: string;
}

const CheatModeToggle: React.FC<CheatModeToggleProps> = ({
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
										? "bg-amber-600 text-white"
										: "bg-neutral-600 hover:bg-neutral-500"
								} ${className}`}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={`transition-all duration-300 ${
					isActive ? "scale-110 filter drop-shadow-md" : ""
				}`}
			>
				<path
					d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12 5V3M12 21V19M5 12H3M21 12H19M18.364 5.636L16.95 7.05M7.05 16.95L5.636 18.364M18.364 18.364L16.95 16.95M7.05 7.05L5.636 5.636"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={isActive ? "opacity-100" : "opacity-60"}
				/>
			</svg>
			{isActive ? "Cheat Mode On" : "Cheat Mode"}
		</button>
	);
};

export default CheatModeToggle;
