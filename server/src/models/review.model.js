const mongoose = require('mongoose');
const Restaurant = require('./restaurant.model');
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
reviewSchema.post('save', async (doc, next) => {
  const restaurantId = doc.restaurant;
  await updateRestaurantRating(restaurantId);
  next();
});
reviewSchema.post('remove', async (doc, next) => {
  const restaurantId = doc.restaurant;
  await updateRestaurantRating(restaurantId);
  next();
});

async function updateRestaurantRating(restaurantId) {
  const [result] = await Review.aggregate([
    { $match: { restaurant: { $eq: restaurantId } } },
    { $group: { _id: 'restaurant', average: { $avg: '$rating' } } },
  ]);
  await Restaurant.findByIdAndUpdate(restaurantId, { rating: result.average });
}

reviewSchema.plugin(toJSON);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
