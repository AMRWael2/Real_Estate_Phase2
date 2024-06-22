const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    type: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String },
    feedbackType: { type: String, required: true },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
