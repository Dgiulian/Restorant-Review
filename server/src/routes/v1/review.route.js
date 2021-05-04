const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
//const reviewValidation = require('../../validations/review.validation');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

router.route('/restaurant/:restaurantId/review').get(reviewController.getReviews);

//router

module.exports = router;
