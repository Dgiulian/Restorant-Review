const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReview = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    rating: Joi.number().min(1).max(5),
    restaurant: Joi.string().required(),
  }),
};

const getReviews = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

const updateReview = {
  params: Joi.object().keys({
    reviewId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string().required(),
      rating: Joi.number().min(1).max(5),
    })
    .min(1),
};

const deleteReview = {
  params: Joi.object().keys({
    reviewId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};
