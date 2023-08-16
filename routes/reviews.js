const express = require('express');

const { validateBody, auth } = require('../middlewares');

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

router.route('/').get(getAllReviews);

router
  .route('/own')
  .get(auth, getUserReview)
  .post(auth, validateBody(reviewsAddSchema), addReview)
  .patch(auth, validateBody(reviewsUpdateSchema), updateReview)
  .delete(auth, deleteReview);

module.exports = router;
