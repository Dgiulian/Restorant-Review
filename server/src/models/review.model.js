const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const reviewSchema = mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
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
  },
  response: {
    type: String,
    required: false,
    trim: true,
  },
  response_date: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

reviewSchema.plugin(toJSON);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
