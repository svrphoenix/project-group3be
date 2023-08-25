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
  .all(auth)
  .get(getUserReview)
  .post(validateBody(reviewsAddSchema), addReview)
  .patch(validateBody(reviewsUpdateSchema), updateReview)
  .delete(deleteReview);

module.exports = router;
