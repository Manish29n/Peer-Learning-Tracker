const express = require('express');
const authMiddleware = require('../middleware/auth');
const Goal = require('../models/Goal');
const router = express.Router();

// Create a goal
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, progress, deadline } = req.body;
    const goal = new Goal({
      userId: req.user.userId,
      title,
      progress,
      deadline,
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: 'Error creating goal', error });
  }
});

// Get user's goals
router.get('/', authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error });
  }
});

module.exports = router;