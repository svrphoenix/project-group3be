const Joi = require('joi');

const { emailRegex, passwordRegex } = require('../../const');

const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': 'Invalid email format',
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base':
      'Password should contain  at least eight characters and at least one number and one letter',
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: registerValidationSchema.extract('email'),
  password: registerValidationSchema.extract('password'),
});

const refreshSchema = Joi.object({
  refresh_token: Joi.string().allow(null),
});

module.exports = {
  registerValidationSchema,
  refreshSchema,
  loginValidationSchema,
};
