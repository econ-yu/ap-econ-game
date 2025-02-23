const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'player'],
    default: 'player'
  },
  highScore: {
    type: Number,
    default: 0
  },
  questionHistory: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    correct: Boolean,
    timestamp: Date
  }]
});

module.exports = mongoose.model('User', userSchema);