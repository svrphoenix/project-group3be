const { Review } = require('../models/review');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getAllReviews = ctrlWrapper(async (req, res) => {
  const reviews = await Review.find({}, '-createdAt -updatedAt', {
    sort: { createdAt: -1 },
  }).populate('owner', 'name avatarURL');
  res.status(200).json(reviews);
});

const getUserReview = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  const result = await Review.findOne({ owner: _id });
  const response = result
    ? { rating: result.rating, comment: result.comment }
    : { rating: null, comment: null };

  res.status(200).json(response);
});

const addReview = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newReview = await Review.create({ ...req.body, owner });
  if (!newReview) {
    throw new HttpError(500, 'Failed to create a review');
  }
  const { rating, comment } = newReview;
  res.status(201).json({ rating, comment });
});

const updateReview = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndUpdate({ owner }, req.body, {
    new: true,
  });
  const response = result
    ? { rating: result.rating, comment: result.comment }
    : { rating: null, comment: null };

  res.status(200).json(response);
});

const deleteReview = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndDelete({ owner });
  const message = result ? 'Review deleted' : 'Review not found';

  res.status(200).json({ message });
});

module.exports = {
  getAllReviews,
  getUserReview,
  addReview,
  updateReview,
  deleteReview,
};
