const express = require('express');

const isValidId = require('../helpers/validation/isValidateById');
// const { validateBody } = require('../helpers/validation/validateBody'); //Victoria-Panayoti
// потрібна ще authenticate
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

router.route('/').get(getAllReviews).post(addReview); //authenticate, validateBody(reviewsAddSchema)

//потрібна authenticate для всіх запиів по id
router
  .route('/:id')
  .get(isValidId, getUserReview)
  .patch(isValidId, updateReview) //validateBody(reviewsUpdateSchema)
  .delete(isValidId, deleteReview);

module.exports = router;
