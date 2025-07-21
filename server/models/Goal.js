const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
  deadline: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Goal', goalSchema);