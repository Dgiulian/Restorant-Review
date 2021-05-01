const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');

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

module.exports = {
  getRestaurants,
  createRestaurant,
};
