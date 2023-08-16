const Joi = require('joi');
const {
  emailRegex,
  phoneRegex,
  skypeRegex,
  birthdayRegex,
} = require('./const');

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex),
  skype: Joi.string().pattern(skypeRegex),
  birthday: Joi.string().pattern(birthdayRegex),
  avatarURL: Joi.string(),
});

module.exports = updateUserSchema;
