const Joi = require('joi');
const { phoneRegex, skypeRegex, birthdayRegex } = require('./const');
const { registerValidationSchema } = require('./authValidationSchema');

const updateUserSchema = Joi.object().keys({
  name: registerValidationSchema.extract('name'),
  email: registerValidationSchema.extract('email'),
  phone: Joi.string().pattern(phoneRegex),
  skype: Joi.string().pattern(skypeRegex),
  birthday: Joi.string().pattern(birthdayRegex),
  avatarURL: Joi.string(),
});

module.exports = updateUserSchema;
