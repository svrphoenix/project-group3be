const Joi = require('joi');
const { phoneRegex, skypeRegex, birthdayRegex } = require('../../const');
const { registerValidationSchema } = require('./authValidationSchema');

const updateUserSchema = Joi.object().keys({
  name: registerValidationSchema.extract('name'),
  email: registerValidationSchema.extract('email'),
  phone: Joi.string().pattern(phoneRegex).allow('').messages({
    'string.pattern.base':
      'Valid number is +38 (000) 123 45 67 or 38 (000) 123 45 67 and country code consist of 1-3 numbers or empty field phone',
  }),
  skype: Joi.string().pattern(skypeRegex).allow('').messages({
    'string.pattern.base':
      'Valid skype number is +38 (000) 123 45 67 or 38 (000) 123 45 67 and country code consist of 1-3 numbers or empty field skype',
  }),
  birthday: Joi.string().pattern(birthdayRegex).messages({
    'string.pattern.base': 'Valid birthday has format YYYY-MM-DD',
  }),
  avatarURL: Joi.string(),
});

module.exports = { updateUserSchema };
