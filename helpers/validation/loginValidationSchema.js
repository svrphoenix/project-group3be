const Joi = require("joi");

const {emailRegex, passwordRegex } = require('./const');

const loginValidationSchema=Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      'This password should contain  at least eight characters and at least one number and one letter',
  }),
});

module.exports = { loginValidationSchema };