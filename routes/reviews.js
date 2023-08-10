const express = require('express');
// const {
//   reviewsAddSchema,
//   reviewsUpdateSchema,
// } = require("../helpers/validation/reviewSchemas");
const {
  getAllReviews,
  getUserReview,
  addReview,
} = require('../controllers/reviewsController');
const router = express.Router();

router.route('/').get(getAllReviews).post(addReview);

router.route('/:id').get(getUserReview);

module.exports = router;
