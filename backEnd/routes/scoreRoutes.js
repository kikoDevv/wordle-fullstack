const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");

// GET /api/scores - Get all scores with optional filtering
router.get("/", scoreController.getScores);

// POST /api/scores - Save a new score
router.post("/", scoreController.saveScore);

// GET /api/scores/:id - Get a specific score by ID
router.get("/:id", scoreController.getScoreById);

module.exports = router;
