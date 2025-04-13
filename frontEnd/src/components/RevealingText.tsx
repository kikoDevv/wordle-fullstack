import React, { useState, useEffect, useMemo } from "react";

interface RevealingTextProps {
	text: string;
	className?: string;
	dotColor?: string;
	textColor?: string;
	onComplete?: () => void;
}

const RevealingText: React.FC<RevealingTextProps> = ({
	text,
	className = "",
	dotColor = "bg-white",
	textColor = "text-white",
	onComplete,
}) => {
	const [dotPosition, setDotPosition] = useState(-10);
	const [visibleChars, setVisibleChars] = useState(0);
	const [animationComplete, setAnimationComplete] = useState(false);


	const letterPositions = useMemo(() => {
		const startPosition = -1;
		const totalWidth = 90;
		const positions: number[] = [];


		const charCount = text.length;
		const charWidth = totalWidth / Math.max(1, charCount);

		for (let i = 0; i < charCount; i++) {
			positions.push(startPosition + i * charWidth + 3);
		}
		return positions;
	}, [text]);

	const finalDotPosition = useMemo(() => {
		if (letterPositions.length === 0) return 95;

		const lastLetterPos = letterPositions[letterPositions.length - 1];
		return lastLetterPos + 16.4; //------>Position dot just after the last letter
	}, [letterPositions]);

	useEffect(() => {
		setDotPosition(-10);
		setVisibleChars(0);
		setAnimationComplete(false);

		//-----Animation settings - consistent speed------
		const dotAnimationDuration = 1000;

		const animateDot = () => {
			const startTime = Date.now();
			const startPos = -5;
			const endPos = 105;

			const animate = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(elapsed / dotAnimationDuration, 1);

				const newPosition = startPos + (endPos - startPos) * progress;
				setDotPosition(newPosition);

				let visibleCount = 0;
				for (let i = 0; i < letterPositions.length; i++) {
					if (newPosition >= letterPositions[i]) {
						visibleCount = i + 1;
					} else {
						break;
					}
				}
				setVisibleChars(visibleCount);

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					setTimeout(() => {
						setDotPosition(finalDotPosition);
						setAnimationComplete(true);
						if (onComplete) {
							onComplete();
						}
					}, 300);
				}
			};

			requestAnimationFrame(animate);
		};

		//-----Start animation after a short delay--------
		const timeout = setTimeout(animateDot, 300);

		return () => {
			clearTimeout(timeout);
		};
	}, [text, letterPositions, onComplete, finalDotPosition]);

	return (
		<div className={`relative ${className}`}>
			{/*-----Render each character-----------------------------*/}
			<div className={`${textColor}`}>
				{text.split('').map((char, index) => (
					<span
						key={index}
						className="transition-opacity duration-75"
						style={{
							opacity: index < visibleChars ? 1 : 0,
							display: "inline-block",
							whiteSpace: "pre",
							visibility: char === ' ' ? 'visible' : undefined // Make spaces take up space
						}}
					>
						{char}
					</span>
				))}
			</div>

			{/* Dot that slides */}
			<div
				className="rounded-full bg-white"
				style={{
					width: "20px",
					height: "20px",
					position: "absolute",
					left: `${dotPosition}%`,
					top: "50%",
					transform: "translateY(-50%)",
					boxShadow: "0 0 8px rgba(255,255,255,0.7)",
					transition: "none",
					zIndex: 1,
				}}
			/>
		</div>
	);
};

export default RevealingText;
