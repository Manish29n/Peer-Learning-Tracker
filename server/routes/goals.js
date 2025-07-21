const express = require('express');
const authMiddleware = require('../middleware/auth');
const Goal = require('../models/Goal');
const router = express.Router();

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

router.get('/', authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.userId });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals', error });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, progress, deadline } = req.body;
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, progress, deadline },
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: 'Error updating goal', error });
  }
});

module.exports = router;