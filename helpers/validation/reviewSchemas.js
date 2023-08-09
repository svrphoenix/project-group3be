const Joi = require('joi');

const reviewsAddSchema = Joi.object({
  rating: Joi.number().required().min(0).max(5),
  comment: Joi.string().required().max(300),
});

const reviewsUpdateSchema = Joi.object()
  .keys({
    rating: reviewsAddSchema.extract('rating'),
    comment: reviewsAddSchema.extract('comment'),
  })
  .or('rating', 'comment', 'imgURL')
  .required();

module.exports = { reviewsAddSchema, reviewsUpdateSchema };