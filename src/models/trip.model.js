const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  days: {
    type: Number,
    required: [true, 'Number of days is required'],
    min: [1, 'Minimum 1 day'],
    max: [30, 'Maximum 30 days']
  },
  budgetType: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: [true, 'Budget type is required']
  },
  interests: [{
    type: String,
    enum: ['Food', 'Culture', 'Adventure', 'Shopping', 'Nature', 'Nightlife']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trip', tripSchema);