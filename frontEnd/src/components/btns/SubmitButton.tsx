import React from "react";

interface SubmitButtonProps {
	onClick: () => void;
	disabled?: boolean;
	isSubmitting?: boolean;
	className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
	onClick,
	disabled = false,
	isSubmitting = false,
	className = "",
}) => {
	const handleClick = () => {
		if (disabled || isSubmitting) return;
		onClick();
	};

	// style based on different state of the btn
	let iconStyle = "";
	if (disabled) {
		iconStyle = "text-white";
	} else if (isSubmitting) {
		iconStyle = "text-green-700";
	} else {
		iconStyle = "text-white hover:text-white";
	}

	return (
		<button
			onClick={handleClick}
			disabled={disabled || isSubmitting}
			className={`ml-auto bg-transparent border-none outline-none
                       transition-all duration-200 ${className}`}
			aria-label="Submit"
		>
			<div className={`flex items-center justify-center ${iconStyle}`}>
				{isSubmitting ? (
					//--confirmation state with cloud icon in circle--
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-10 h-10 text-amber-400 animate-[pulse_0.75s_ease-in-out_infinite]"
					>
						<path
							fillRule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm2.5 9c-.19 0-.37.03-.55.08a2.5 2.5 0 00-4.9 0 2.25 2.25 0 00-1.3 4.05h6.5a2 2 0 00.25-3.99c0-.05 0-.09-.01-.14z"
							clipRule="evenodd"
						/>
					</svg>
				) : disabled ? (
					//---disabled state with hourglass/waiting icon--
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-10 h-10 cursor-not-allowed"
					>
						<path
							fillRule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5A.75.75 0 0010.5 7.5H9zm1.5 3a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-3.75a.75.75 0 01-.75-.75zM9 15a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 019 15z"
							clipRule="evenodd"
						/>
					</svg>
				) : (
					//--ready to submit state with upward arrow--
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-10 h-10 hover:scale-110 transition-transform cursor-pointer"
					>
						<path
							fillRule="evenodd"
							d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</div>
		</button>
	);
};

export default SubmitButton;
