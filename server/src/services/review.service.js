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
const getRestaurantByUser = async (id) => {
  return Restaurant.findById(id);
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

module.exports = {
  getReviewsByRestaurantId,
  createReview,
  getReviewById,
  getRestaurantByUser,
  // updateReviewById,
  deleteReviewById,
};
