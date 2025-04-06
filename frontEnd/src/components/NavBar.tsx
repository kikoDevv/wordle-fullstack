import { Link } from "react-router";
export default function navBar() {
	return (
		<ul className="flex bg-amber-500 justify-around font-bold py-5">
			<li>
				<Link to="/" className="cursor-pointer">
					Play
				</Link>
			</li>
			<li>
				<Link to="About" className="cursor-pointer">
					About
				</Link>
			</li>
			<li>
				<Link to="Score" className="cursor-pointer">
					Score
				</Link>
			</li>
			<li>
				<Link to="Setting" className="cursor-pointer">
					setting
				</Link>
			</li>
		</ul>
	);
}
