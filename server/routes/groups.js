const express = require('express');
const authMiddleware = require('../middleware/auth');
const Group = require('../models/Group');
const User = require('../models/User');
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching groups', error });
  }
});

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

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const group = new Group({ name, members: [req.user.userId] });
    await group.save();
    await User.findByIdAndUpdate(req.user.userId, { $push: { groups: group._id } });
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ message: 'Error creating group', error });
  }
});

router.post('/leave/:groupId', authMiddleware, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    const user = await User.findById(req.user.userId);
    if (user.groups.includes(req.params.groupId)) {
      user.groups = user.groups.filter(id => id.toString() !== req.params.groupId);
      group.members = group.members.filter(id => id.toString() !== req.user.userId);
      await user.save();
      await group.save();
    }
    res.json({ message: 'Left group' });
  } catch (error) {
    res.status(500).json({ message: 'Error leaving group', error });
  }
});

module.exports = router;