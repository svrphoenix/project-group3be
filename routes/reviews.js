const express = require('express');

const { validateBody, isValidId, auth } = require('../middlewares');

const {
  reviewsAddSchema,
  reviewsUpdateSchema,
} = require('../helpers/validation/reviewSchemas');
const {
  getAllReviews,
  getUserReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewsController');
const router = express.Router();

router
  .route('/')
  .get(getAllReviews)
  .post(auth, validateBody(reviewsAddSchema), addReview);

router
  .route('/:id')
  .get(auth, isValidId, getUserReview)
  .patch(auth, isValidId, validateBody(reviewsUpdateSchema), updateReview)
  .delete(auth, isValidId, deleteReview);

module.exports = router;
