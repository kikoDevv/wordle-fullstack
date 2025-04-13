# Controllers Directory

This directory contains the controller functions that handle the application logic:

- `wordController.js` - Handles random word selection based on user settings (length, unique letters)
- `scoreController.js` - Processes score submissions and retrieves highscores
- `gameController.js` - Manages game state and validates guesses (for VG option to prevent cheating)

Controllers should follow the single responsibility principle and communicate with models to interact with the database.
