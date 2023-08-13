const Joi = require('joi');
const { emailRegex } = require('./const');

const updateUserSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  skype: Joi.string(),
  email: Joi.string().pattern(emailRegex).required(),
});

module.exports = updateUserSchema;
