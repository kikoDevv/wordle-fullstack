import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/Home";
import { server } from "../setup";
import { http, HttpResponse } from "msw";

const renderHome = () => {
	return render(
		<MemoryRouter>
			<Home />
		</MemoryRouter>
	);
};

const findTextInContainer = (container, text) => {
	const elements = Array.from(container.querySelectorAll("*"));
	return elements.some(
		(element) =>
			element.textContent && element.textContent.match(new RegExp(text, "i"))
	);
};

describe("Wordle Game Integration Tests", () => {
	beforeEach(() => {
		server.resetHandlers();

		server.use(
			http.post("/api/game/start", () => {
				return HttpResponse.json({
					gameId: "test-game-id",
					targetWord: "apple",
				});
			})
		);
	});

	it("should start a new game on initial render", async () => {
		const { container } = renderHome();

		await waitFor(
			() => {
				expect(findTextInContainer(container, "fortune smile")).toBeTruthy();
			},
			{ timeout: 2000 }
		);
	});

	it("should allow submitting a guess and show feedback", async () => {
		server.use(
			http.post("/api/words/check", () => {
				return HttpResponse.json({
					word: "react",
					result: [
						{ letter: "r", result: "incorrect" },
						{ letter: "e", result: "misplaced" },
						{ letter: "a", result: "misplaced" },
						{ letter: "c", result: "incorrect" },
						{ letter: "t", result: "incorrect" },
					],
				});
			})
		);

		renderHome();
		const user = userEvent.setup();

		await waitFor(
			() => {
				expect(screen.getByPlaceholderText(/get ready/i)).toBeInTheDocument();
			},
			{ timeout: 2000 }
		);

		const input = screen.getByPlaceholderText(/get ready/i);
		await user.type(input, "react");

		await user.keyboard("{Enter}");
		await waitFor(
			() => {
				const letterAElements = screen.getAllByText("a");
				expect(letterAElements.length).toBeGreaterThan(0);

				// At least one of them should have the amber class
				const amberLetter = letterAElements.find((el) =>
					el.className.includes("bg-amber-300")
				);
				expect(amberLetter).toBeDefined();
			},
			{ timeout: 2000 }
		);
	});

	it("should handle winning the game and score submission", async () => {
		server.use(
			http.post("/api/words/check", () => {
				return HttpResponse.json({
					word: "apple",
					result: [
						{ letter: "a", result: "correct" },
						{ letter: "p", result: "correct" },
						{ letter: "p", result: "correct" },
						{ letter: "l", result: "correct" },
						{ letter: "e", result: "correct" },
					],
				});
			}),
			http.post("/api/scores", () => {
				return HttpResponse.json({
					id: "test-score-id",
					message: "Score saved successfully",
				});
			})
		);

		const { container } = renderHome();
		const user = userEvent.setup();

		await waitFor(
			() => {
				expect(screen.getByPlaceholderText(/get ready/i)).toBeInTheDocument();
			},
			{ timeout: 2000 }
		);

		const input = screen.getByPlaceholderText(/get ready/i);
		await user.type(input, "apple");

		await user.keyboard("{Enter}");

		await waitFor(
			() => {
				expect(findTextInContainer(container, "congratulations")).toBeTruthy();
			},
			{ timeout: 3000 }
		);

		await waitFor(
			() => {
				expect(
					screen.getByPlaceholderText(/enter your name/i)
				).toBeInTheDocument();
			},
			{ timeout: 3000 }
		);

		const nameInput = screen.getByPlaceholderText(/enter your name/i);
		await user.type(nameInput, "TestPlayer");

		await user.keyboard("{Enter}");

		await waitFor(
			() => {
				expect(
					findTextInContainer(container, "score saved successfully")
				).toBeTruthy();
			},
			{ timeout: 3000 }
		);
	});

	it("should handle cheat mode activation", async () => {
		const { container } = renderHome();
		const user = userEvent.setup();

		await waitFor(
			() => {
				expect(screen.getByText(/cheat mode$/i)).toBeInTheDocument();
			},
			{ timeout: 2000 }
		);

		const cheatToggle = screen.getByText(/cheat mode$/i);
		await user.click(cheatToggle);

		await waitFor(
			() => {
				expect(
					findTextInContainer(container, "psst.*target word")
				).toBeTruthy();
			},
			{ timeout: 2000 }
		);
	});

	it("should validate input length matches word length", async () => {
		const { container } = renderHome();
		const user = userEvent.setup();

		await waitFor(
			() => {
				expect(screen.getByPlaceholderText(/get ready/i)).toBeInTheDocument();
			},
			{ timeout: 2000 }
		);

		const input = screen.getByPlaceholderText(/get ready/i);
		await user.type(input, "abc");

		await user.keyboard("{Enter}");

		await waitFor(
			() => {
				expect(findTextInContainer(container, "5 letters long")).toBeTruthy();
			},
			{ timeout: 2000 }
		);
	});
});
