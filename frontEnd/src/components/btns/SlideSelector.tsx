import React, { useState, useEffect } from "react";
import Button from "./Button";

interface SlideSelectorProps {
	onLengthChange: (length: number) => void;
	defaultLength?: number;
	minLength?: number;
	maxLength?: number;
}

const SlideSelector: React.FC<SlideSelectorProps> = ({
	onLengthChange,
	defaultLength = 5,
	minLength = 3,
	maxLength = 8,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [wordLength, setWordLength] = useState(defaultLength);
	const [isSliding, setIsSliding] = useState(false);
	const [hasSelected, setHasSelected] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newLength = parseInt(e.target.value, 10);
		setWordLength(newLength);
		onLengthChange(newLength);
		setIsSliding(true);
		setHasSelected(true);
	};

	useEffect(() => {
		if (isSliding) {
			const timer = setTimeout(() => {
				setIsExpanded(false);
				setIsSliding(false);
			}, 500); // Close after 1 second of no sliding activity

			return () => clearTimeout(timer);
		}
	}, [wordLength, isSliding]);

	return (
		<div className="relative inline-block">
			<Button
				text={hasSelected ? `Word Length: ${wordLength}` : "Word Length"}
				onClick={handleToggle}
				className=" flex items-center justify-between"
			/>

			{isExpanded && (
				<div className="absolute top-full left-0 mt-2 p-4 bg-neutral-700 rounded-lg shadow-lg z-10 min-w-[250px]">
					<div className="flex items-center justify-between mb-2">
						<span className="text-white">{minLength}</span>
						<span className="text-white font-bold text-lg">{wordLength}</span>
						<span className="text-white">{maxLength}</span>
					</div>

					<input
						type="range"
						min={minLength}
						max={maxLength}
						value={wordLength}
						onChange={handleLengthChange}
						className="w-full h-2 bg-neutral-500 rounded-lg appearance-none cursor-pointer"
					/>
				</div>
			)}
		</div>
	);
};

export default SlideSelector;
