# A very Fullstack chatGPT UI inspired wordle game.

A full-featured Wordle game implementation with React frontend and Express
backend. A combination of custom-built and pre-existing React components, redesigned and repurposed to fulfill the project’s requirements.
 This application allows users to play the classic word-guessing game
with various customization options and high score tracking.

## Features

- **Core Wordle Gameplay**: Guess the secret word
- **Real-time Feedback**: Color-coded feedback for correct letters and positions
- **Customizable Word Length**: Play with words from 3 to 8 letters
- **Letter Repetition Toggle**: Choose to play with or without repeated letters
- **Cheat Mode**: Optional mode that reveals the target word for practice
- **Score Tracking**: High scores saved to MongoDB database
- **Leaderboard**: Server-side rendered view of top scores
- **Score Filtering**: Filter scores by word length and letter repetition
  settings

## Technology Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Testing**: Vitest, Testing Library, MSW (Mock Service Worker)
- **View Engine**: Pug for server-side rendered pages

## Getting Started

### Prerequisites

- Node.js v18 or newer
- MongoDB running locally or remote connection

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd wordle-fullstack
```

2. Install dependencies:

```bash
npm install
```

This will automatically install dependencies for both frontend and backend.

### Running the Application in dev Mode

1. Start the backend server:

```bash
npm run dev:backend
```

2. In a separate terminal, start the frontend dev server:

```bash
npm run dev:frontend
```

The frontend will be available at http://localhost:5173 with full hot-reloading
capabilities.

## Testing
Run the test suite with:

```bash
npm test
```

This runs integration tests that verify:

- API functionality
- Game flow and mechanics
- Score submission
- Input validation

## How to Play
There is cute looking dot that will tell you everyting, no worry.

## License
ISC

## Author
KikoDevv
