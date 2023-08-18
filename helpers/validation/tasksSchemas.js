const Joi = require('joi');
const { timeRegexp, dateRegexp } = require('../../const');

const addSchema = Joi.object({
  title: Joi.string().max(250).required().messages({
    'string.max': "Field 'title' must have no more than 250 characters",
    'any.required': "Field 'title' is missing",
  }),
  start: Joi.string().pattern(timeRegexp).required().messages({
    'string.pattern.base':
      "Field 'start' should be in hh:mm format and not exceed 23:59",
    'any.required': "Field 'start' is missing",
  }),
  end: Joi.string().pattern(timeRegexp).required().messages({
    'string.pattern.base':
      "Field 'start' should be in hh:mm format and not exceed 23:59",
    'any.required': "Field 'end' is missing",
  }),
  priority: Joi.string().valid('low', 'medium', 'high').required().messages({
    'any.only': 'Priority must be one of: low, medium or high',
    'any.required': "Field 'priority' is missing",
  }),
  date: Joi.string().pattern(dateRegexp).required().messages({
    'string.pattern.base':
      "Field 'date' should be in yyyy.mm.dd format and start from 2023",
    'any.required': "Field 'date' is missing",
  }),
  category: Joi.string()
    .valid('to-do', 'in-progress', 'done')
    .required()
    .messages({
      'any.only': 'Category must be one of: to-do, in-progress or done',
      'any.required': "Field 'category' is missing",
    }),
});

const updateSchema = Joi.object({
  title: Joi.string().max(250).messages({
    'string.max': "Field 'title' must have no more than 250 characters",
  }),
  start: Joi.string().pattern(timeRegexp).messages({
    'string.pattern.base':
      "Field 'start' must be in hh:mm format and not exceed 23:59",
  }),
  end: Joi.string().pattern(timeRegexp).messages({
    'string.pattern.base':
      "Field 'end' must be in hh:mm format and not exceed 23:59",
  }),
  priority: Joi.string().valid('low', 'medium', 'high').messages({
    'any.only': 'Priority must be one of: low, medium or high',
  }),
  date: Joi.string().pattern(dateRegexp).messages({
    'string.pattern.base':
      "Field 'date' must be in yyyy.mm.dd format and start from 2023",
  }),
  category: Joi.string().valid('to-do', 'in-progress', 'done').messages({
    'any.only': 'Category must be one of: to-do, in-progress or done',
  }),
})
  .min(1)
  .messages({
    'object.min': 'Missing fields. At least one field should be present',
  });

module.exports = { addSchema, updateSchema };
