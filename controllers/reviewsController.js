const { Review } = require('../models/review');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getAllReviews = ctrlWrapper(async (req, res) => {
  const reviews = await Review.find({}, '-createdAt -updatedAt', {
    sort: { createdAt: -1 },
  }).populate('owner', 'name avatarURL');
  res.status(200).json(reviews);
});

const getUserReview = async (req, res) => {
  const { _id } = req.user;
  const result = await Review.findOne({ owner: _id });
  const response = result
    ? { rating: result.rating, comment: result.comment }
    : {};

  res.status(200).json(response);
};

const addReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOne({ owner });

  if (result) {
    throw new HttpError(409, 'User review already exist');
  }

  const newReview = await Review.create({ ...req.body, owner });
  const { rating, comment } = newReview;
  res.status(201).json({ rating, comment });
};

const updateReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndUpdate({ owner }, req.body, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404);
  }
  const { rating, comment } = result;
  res.status(200).json({ rating, comment });
};

const deleteReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndDelete({ owner });
  if (!result) {
    throw new HttpError(404);
  }
  res.status(200).json({ message: 'Review deleted' });
};

module.exports = {
  getAllReviews: ctrlWrapper(getAllReviews),
  getUserReview: ctrlWrapper(getUserReview),
  addReview: ctrlWrapper(addReview),
  updateReview: ctrlWrapper(updateReview),
  deleteReview: ctrlWrapper(deleteReview),
};
