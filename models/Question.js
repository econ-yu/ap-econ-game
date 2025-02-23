const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['policy', 'diagram'],
    required: true
  },
  action: {
    type: String,
    required: true
  },
  target: {
    type: String,
    required: true
  },
  correctEffect: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'hard'],
    default: 'easy'
  },
  correctRate: {
    type: Number,
    default: 0
  },
  totalAttempts: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Question', questionSchema);