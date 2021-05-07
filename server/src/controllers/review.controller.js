const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewService, restaurantService } = require('../services');

const { mongo } = require('mongoose');

const getReviews = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reviewService.getReviewsByRestaurantId(restaurantId, options);
  res.status(httpStatus.OK).send(result);
});

const createReview = catchAsync(async (req, res) => {
  const reviewBody = { ...req.body, user: req.user._id, restaurant: mongo.ObjectID(req.body.restaurant) };
  const review = await reviewService.createReview(reviewBody);
  res.status(httpStatus.CREATED).send(review);
});

const getReview = catchAsync(async (req, res) => {
  const review = await reviewService.getReviewById(req.params.reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  res.send(review);
});

const deleteReview = catchAsync(async (req, res) => {
  // If 'user' can only delete its own review
  // If owner can only delete reviews for the Restaurant
  // If admin can delete any review
  const { user } = req;
  const review = await reviewService.getReviewById(req.params.reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }
  switch (user.role) {
    case 'user': {
      if (mongo.ObjectID(review.user) !== mongo.ObjectID(user.id)) {
        new ApiError(httpStatus.FORBIDDEN, 'Not allowed to delete review');
      } else {
        break;
      }
    }
    case 'owner': {
      if (mongo.ObjectID(review.owner) !== mongo.ObjectID(user.id)) {
        new ApiError(httpStatus.FORBIDDEN, 'Not allowed to delete review');
      } else {
        break;
      }
    }
    case 'admin': {
      break;
    }
    default:
      new ApiError(httpStatus.FORBIDDEN, 'Not allowed to delete review');
  }
  await reviewService.deleteReviewById(req.params.reviewId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const addResponse = catchAsync(async (req, res) => {
  const { user } = req;
  const review = await reviewService.getReviewById(req.params.reviewId);
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  const restaurant = await restaurantService.getRestaurantById(review.restaurant);

  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }

  if (!restaurant.owner.equals(user.id)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Cannot add response to review');
  }
  const response = await reviewService.addResponse(req.params.reviewId, { response: req.body.text });

  res.status(httpStatus.OK).send(response);
});

module.exports = {
  getReviews,
  createReview,
  getReview,
  deleteReview,
  addResponse,
};
