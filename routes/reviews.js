const express = require('express');
// const {
//   reviewsAddSchema,
//   reviewsUpdateSchema,
// } = require("../helpers/validation/reviewSchemas");
const {
  getAllReviews,
  getUserReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewsController');
const router = express.Router();

router.route('/').get(getAllReviews).post(addReview);

router
  .route('/:id')
  .get(getUserReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = router;
