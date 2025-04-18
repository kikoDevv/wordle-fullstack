import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import PageNotFound from "./components/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<Header />{" "}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="About" element={<About />} />
					<Route path="Scores" element={<Navigate to="/scores" replace />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
