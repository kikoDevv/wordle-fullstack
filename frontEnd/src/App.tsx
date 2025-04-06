import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Score from "./pages/Score";
import PageNotFound from "./components/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow pt-16">
					{" "}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="About" element={<About />} />
						<Route path="Score" element={<Score />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;
