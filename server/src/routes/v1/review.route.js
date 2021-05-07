const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reviewValidation = require('../../validations/review.validation');
const reviewController = require('../../controllers/review.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('createReview'), validate(reviewValidation.createReview), reviewController.createReview)
  .get(reviewController.getReviews);

router
  .route('/response/:reviewId')
  .post(auth('addResponse'), validate(reviewValidation.addResponse), reviewController.addResponse);

router
  .route('/:reviewId')
  .delete(auth('deleteReview'), validate(reviewValidation.deleteReview), reviewController.deleteReview)
  .get(validate(reviewValidation.createReview), reviewController.getReview);

module.exports = router;
