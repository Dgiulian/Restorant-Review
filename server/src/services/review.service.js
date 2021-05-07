const httpStatus = require('http-status');
const { Review } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for reviews
 * @param {Object} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getReviewsByRestaurantId = async (restaurantId) => {
  const reviews = await Review.findMany({ restaurant: restaurantId });
  return reviews;
};

/**
 * Create a review
 * @param {Object} reviewBody
 * @returns {Promise<Review>}
 */
const createReview = async (reviewBody) => {
  const review = await Review.create(reviewBody);
  return review;
};

/**
 * Get review by id
 * @param {ObjectId} id
 * @returns {Promise<Review>}
 */
const getReviewById = async (id) => {
  return Review.findById(id);
};

/**
 * Get restaurant by user
 * @param {ObjectId} userId
 * @returns {Promise<Restaurant>}
 */
const getReviewByUser = async (id) => {
  return Review.find({ user: id });
};

/**
 * Delete review by id
 * @param {ObjectId} reviewId
 * @returns {Promise<Review>}
 */
const deleteReviewById = async (reviewId) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  await review.remove();
  return review;
};

const addResponse = async (reviewId, body) => {
  return Review.findByIdAndUpdate(reviewId, { ...body, response_date: new Date() }, { new: true });
};

module.exports = {
  getReviewsByRestaurantId,
  createReview,
  getReviewById,
  getReviewByUser,
  // updateReviewById,
  deleteReviewById,
  addResponse,
};
