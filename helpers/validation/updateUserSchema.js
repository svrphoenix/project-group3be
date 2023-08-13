const Joi = require('joi');
const { emailRegex, numberRegex, skypeRegex } = require('./const');

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phone: Joi.string().pattern(numberRegex),
  skype: Joi.string().pattern(skypeRegex),
  email: Joi.string().pattern(emailRegex).required(),
});

module.exports = updateUserSchema;
