import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/About";
import Score from "./pages/Score";
import PageNotFound from "./components/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="About" element={<About />} />
				<Route path="Score" element={<Score />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
