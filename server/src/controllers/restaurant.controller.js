const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');
const { mongo } = require('mongoose');

const getRestaurants = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
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

module.exports = {
  getRestaurants,
  createRestaurant,
  getRestaurant,
  deleteRestaurant,
};
