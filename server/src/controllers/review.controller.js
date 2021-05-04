const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reviewService } = require('../services');
const { mongo } = require('mongoose');

const getReviews = catchAsync(async (req, res) => {});

module.exports = {
  getReviews,
};
