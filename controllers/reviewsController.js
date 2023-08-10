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
  return result;
});

module.exports = {
  getAllReviews,
  getUserReview,
};
