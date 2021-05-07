const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const reviewSchema = mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  response: {
    type: String,
    required: false,
    trim: true,
    default: null,
  },
  response_date: {
    type: Date,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

reviewSchema.plugin(toJSON);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
