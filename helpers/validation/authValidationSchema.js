const Joi = require("joi");

const {emailRegex, passwordRegex } = require('./const');

const registerValidationSchema=Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      'This password should contain  at least eight characters and at least one number and one letter',
  }),
});

module.exports = { registerValidationSchema };