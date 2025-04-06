interface ButtonProps {
	text: string;
	onClick?: () => void;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className = "" }) => {
	return (
		<button
			onClick={onClick}
			className={`bg-neutral-600 px-3 py-1 rounded-full font-medium cursor-pointer border-none m-1 hover:bg-neutral-400 ${className}`}
		>
			{text}
		</button>
	);
};

export default Button;
