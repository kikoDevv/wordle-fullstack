import React, { useState, useEffect, useRef } from "react";

interface RevealingTextProps {
	text: string;
	className?: string;
	dotColor?: string;
	textColor?: string;
	onComplete?: () => void;
	showTimer?: boolean;
	timerStartTime?: number;
	stopTimer?: boolean;
}

const RevealingText: React.FC<RevealingTextProps> = ({
	text,
	className = "",
	dotColor = "bg-white",
	textColor = "text-white",
	onComplete,
	showTimer = false,
	timerStartTime,
	stopTimer = false,
}) => {
	const [dotPosition, setDotPosition] = useState(-10);
	const [visibleChars, setVisibleChars] = useState(0);
	const [animationComplete, setAnimationComplete] = useState(false);
	const [isRevealing, setIsRevealing] = useState(true);
	const [wrapperWidth, setWrapperWidth] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
	const letterCenters = useRef<number[]>([]);

	// Timer state
	const [elapsedTime, setElapsedTime] = useState(0);
	const timerRef = useRef<number | null>(null);
	const [frozenTime, setFrozenTime] = useState<number | null>(null);

	// Format timer
	const formatTime = (ms: number): string => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	useEffect(() => {
		if (stopTimer && showTimer && !frozenTime && elapsedTime > 0) {
			setFrozenTime(elapsedTime);

			if (timerRef.current !== null) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		}
	}, [stopTimer, showTimer, elapsedTime, frozenTime]);

	useEffect(() => {
		if (showTimer && timerStartTime && !stopTimer && !frozenTime) {
			const updateTimer = () => {
				const now = Date.now();
				const elapsed = now - timerStartTime;
				setElapsedTime(elapsed);
			};

			updateTimer();

			timerRef.current = window.setInterval(updateTimer, 1000);

			return () => {
				if (timerRef.current !== null) {
					clearInterval(timerRef.current);
				}
			};
		}
	}, [showTimer, timerStartTime, stopTimer, frozenTime]);

	useEffect(() => {
		if (!showTimer || !timerStartTime) {
			setFrozenTime(null);
		}
	}, [showTimer, timerStartTime]);

	useEffect(() => {
		if (!text) return;

		setDotPosition(-10);
		setVisibleChars(0);
		setAnimationComplete(false);
		setIsRevealing(true);
		setWrapperWidth(0);

		setTimeout(() => {
			const centers: number[] = [];
			letterRefs.current.forEach((span) => {
				if (span) {
					const { offsetLeft, offsetWidth } = span;
					centers.push(offsetLeft + offsetWidth / 2);
				}
			});
			letterCenters.current = centers;

			startRevealAnimation();
		}, 90);
	}, [text]);

	//----------------revealing-------------------
	const startRevealAnimation = () => {
		const centers = letterCenters.current;
		const total = centers.length;
		if (total === 0) return;

		const revealDuration = 1000;
		const interval = revealDuration / total;
		let i = 0;

		const timer = setInterval(() => {
			if (i < total) {
				const pos = centers[i];
				setDotPosition(pos);
				setWrapperWidth(pos + 10);
				setVisibleChars(i + 1);
				i++;
			} else {
				clearInterval(timer);
				setAnimationComplete(true);

				//----delay to start unreveal-----
				setTimeout(() => {
					setIsRevealing(false);
					startUnrevealAnimation();
				}, 2000);
			}
		}, interval);
	};

	//-----unreveal animation----
	const startUnrevealAnimation = () => {
		const centers = letterCenters.current;
		const total = centers.length;
		if (total === 0) return;

		const unrevealDuration = 1000;
		const interval = unrevealDuration / total;
		let i = total - 1;

		setVisibleChars(total);

		const timer = setInterval(() => {
			if (i >= 0) {
				const pos = centers[i];
				setDotPosition(pos);

				setVisibleChars(i);

				setWrapperWidth(pos + 1);
				i--;
			} else {
				clearInterval(timer);

				setVisibleChars(0);
				setWrapperWidth(0);

				if (onComplete) {
					setTimeout(() => onComplete(), 300);
				}
			}
		}, interval);
	};

	return (
		<div ref={containerRef} className={`relative ${className}`}>
			<div
				className="overflow-hidden inline-block whitespace-nowrap transition-all"
				style={{
					width: `${wrapperWidth}px`,
					transition: !isRevealing ? "width 0.2s ease" : "width 0.1s ease",
				}}
			>
				{text.split("").map((char, index) => (
					<span
						key={index}
						ref={(el) => {
							letterRefs.current[index] = el;
							return null;
						}}
						className={`inline-block transition-opacity ${textColor}`}
						style={{
							whiteSpace: "pre",
							display: "inline-block",
							width: char === " " ? "0.25em" : undefined,
							marginRight: char === " " ? "0.25em" : undefined,
						}}
					>
						{char}
					</span>
				))}
			</div>

			<div
				className={`absolute top-1/2 rounded-full transition-all ${
					dotColor || "bg-white"
				} flex items-center justify-center`}
				style={{
					left: `${dotPosition}px`,
					width:  "1.5rem",
					height:  "1.5rem",
					transform: `translateY(-60%) scale(1)`,
					boxShadow: "0 0 10px 2px black",
					transition: animationComplete ? "left 0.2s ease" : "none",
					zIndex: 1,
				}}
			>
				{showTimer && timerStartTime && (
					<span className="text-black text-[10px] font-bold">
						{formatTime(frozenTime !== null ? frozenTime : elapsedTime)}
					</span>
				)}
			</div>
		</div>
	);
};

export default RevealingText;
