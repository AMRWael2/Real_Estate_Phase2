const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reward', rewardSchema);
