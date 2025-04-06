import { Link } from "react-router";

export default function PageNotFound() {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="text-center">
				<div className="text-4xl mb-4">
					<i className="fas fa-exclamation-triangle text-red-500"></i>
				</div>
				<h1 className="text-xl font-bold mb-4">
					Page not found! Go back to home page
				</h1>
				<Link to="/">
					<button className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md cursor-pointer">
						<i className="fas fa-home mr-2"></i>Back home
					</button>
				</Link>
			</div>
		</div>
	);
}
