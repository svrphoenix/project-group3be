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
} = require('../controllers/reviewsController');
const router = express.Router();

router.route('/').get(getAllReviews).post(addReview);

router.route('/:id').get(getUserReview).patch(updateReview);

module.exports = router;
