const { Review } = require('../models/review');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getAllReviews = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  const reviews = await Review.find({}, '-createdAt -updatedAt', {
    skip,
    limit,
    sort: { createdAt: -1 },
  }).populate('owner', 'name avatarURL');
  res.status(200).json(reviews);
});

const getUserReview = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.find({ owner }).populate(
    'owner',
    'name avatarURL'
  );
  if (!result) {
    throw new HttpError(404, 'Not found.🤷‍♀️');
  }
  res.status(200).json(result);
});

const addReview = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const id = await Review.findOne({ owner });
  if (id) {
    throw new HttpError(
      409,
      'You have already left a review, unfortunately you can only leave one review from user😒🤔'
    );
  }
  const newReview = await Review.create({ ...req.body, owner });
  res.status(201).json(newReview);
});

const updateReview = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndUpdate({ owner }, req.body, {
    new: true,
  }).populate('owner', 'name avatarURL');
  if (!result) {
    throw new HttpError(404, 'Not found.🤷‍♀️');
  }
  res.status(200).json(result);
});

const deleteReview = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Review.findOneAndDelete({ owner });
  if (!result) {
    throw new HttpError(404, 'Not found.🤦‍♀️');
  }
  res.status(200).json({ message: 'Review deleted' });
});

module.exports = {
  getAllReviews,
  getUserReview,
  addReview,
  updateReview,
  deleteReview,
};
