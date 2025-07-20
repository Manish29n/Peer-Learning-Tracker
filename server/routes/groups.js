const express = require('express');
const authMiddleware = require('../middleware/auth');
const Group = require('../models/Group');
const User = require('../models/User');
const router = express.Router();

// Get all groups
router.get('/', authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error });
  }
});

// Get user groups
router.get('/mygroups', authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.userId });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error });
  }
});

// Join a group
router.post('/join/:groupId', authMiddleware, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const user = await User.findById(req.user.userId);
    if (!user.groups.includes(req.params.groupId)) {
      user.groups.push(req.params.groupId);
      group.members.push(req.user.userId);
      await user.save();
      await group.save();
    }
    res.json({ message: 'Joined group' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining group', error });
  }
});

module.exports = router;