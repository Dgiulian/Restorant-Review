const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');
const { mongo } = require('mongoose');

const getRestaurants = catchAsync(async (req, res) => {
  const { rating = 0 } = req.query;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const filter = {};
  if (rating) {
    filter.rating = { $gte: rating };
  }

  const result = await restaurantService.queryRestaurants(filter, options);
  res.send(result);
});

const createRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.createRestaurant({ ...req.body, owner: req.user._id });

  res.status(httpStatus.CREATED).send(restaurant);
});

const getRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.getRestaurantById(req.params.restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  res.send(restaurant);
});

const deleteRestaurant = catchAsync(async (req, res) => {
  // Validate owner
  const { restaurantId } = req.params;
  const restaurant = await restaurantService.getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  if (!mongo.ObjectID(restaurant.owner._id).equals(req.user._id)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not Restaurant owner');
  }
  await restaurantService.deleteRestaurantById(restaurantId);
  res.status(httpStatus.NO_CONTENT).send();
});

const updateRestaurant = catchAsync(async (req, res) => {
  const { restaurantId } = req.params;
  const restaurant = await restaurantService.getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  if (!mongo.ObjectID(restaurant.owner._id).equals(req.user._id)) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not Restaurant owner');
  }
  const updatedRestaurant = await restaurantService.updateRestaurantById(req.params.restaurantId, req.body);
  res.send(updatedRestaurant);
});

module.exports = {
  getRestaurants,
  createRestaurant,
  getRestaurant,
  deleteRestaurant,
  updateRestaurant,
};
