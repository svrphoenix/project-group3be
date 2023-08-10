const express = require('express');
// const {
//   reviewsAddSchema,
//   reviewsUpdateSchema,
// } = require("../helpers/validation/reviewSchemas");
const {
  getAllReviews,
  getUserReview,
} = require('../controllers/reviewsController');
const router = express.Router();

router.route('/').get(getAllReviews);

router.route('/:id').get(getUserReview);

module.exports = router;
