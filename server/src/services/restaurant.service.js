const httpStatus = require('http-status');
const { Restaurant } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for restaurants
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRestaurants = async (filter, options) => {
  const restaurants = await Restaurant.paginate(filter, options);
  return restaurants;
};

/**
 * Create a restaurant
 * @param {Object} restaurantBody
 * @returns {Promise<Restaurant>}
 */
const createRestaurant = async (restaurantBody) => {
  /*  if (await Restaurant.isEmailTaken(restaurantBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  } */
  const restaurant = await Restaurant.create(restaurantBody);
  return restaurant;
};

/**
 * Get restaurant by id
 * @param {ObjectId} id
 * @returns {Promise<Restaurant>}
 */
const getRestaurantById = async (id) => {
  return Restaurant.findById(id).populate('reviews');
};

/**
 * Get restaurant by owner
 * @param {ObjectId} id
 * @returns {Promise<Restaurant>}
 */
const getRestaurantByOnwer = async (id) => {
  return Restaurant.find({ owner: id }).populate('reviews');
};

/**
 * Update restaurant by id
 * @param {ObjectId} restaurantId
 * @param {Object} updateBody
 * @returns {Promise<Restaurant>}
 */
const updateRestaurantById = async (restaurantId, updateBody) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

/**
 * Delete restaurant by id
 * @param {ObjectId} restaurantId
 * @returns {Promise<Restaurant>}
 */
const deleteRestaurantById = async (restaurantId) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  await restaurant.remove();
  return restaurant;
};

module.exports = {
  queryRestaurants,
  createRestaurant,
  getRestaurantById,
  getRestaurantByOnwer,
  updateRestaurantById,
  deleteRestaurantById,
};
