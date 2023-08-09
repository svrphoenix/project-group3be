const Joi = require('joi');

const timeRegexp = /^(?:[01]\d|2[0-4]):[0-5]\d$/;
const dateRegexp =
  /^(202[3-9]|20[3-9]\d|2[1-9]\d{2}|[3-9]\d{3})\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;

const addSchema = Joi.object({
  title: Joi.string().max(250).required().messages({
    'string.max': "Field 'title' must have no more than 250 characters",
    'any.required': "Field 'title' is missing",
  }),
  start: Joi.string().pattern(timeRegexp).required().messages({
    'string.pattern.base':
      "Field 'start' should be in hh:mm format and not exceed 24:59",
    'any.required': "Field 'start' is missing",
  }),
  end: Joi.string()
    .pattern(timeRegexp)
    .greater(Joi.ref('start'))
    .required()
    .messages({
      'string.pattern.base':
        "Field 'start' should be in hh:mm format and not exceed 24:59",
      'date.greater': "The 'end' time must be greater than the 'start' time",
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

const updateSchema = Joi.object()
  .keys({
    title: addSchema.extract('title'),
    start: addSchema.extract('start'),
    end: addSchema.extract('end'),
    priority: addSchema.extract('priority'),
    date: addSchema.extract('date'),
    category: addSchema.extract('category'),
  })
  .or('title', 'start', 'end', 'priority', 'date', 'category')
  .required()
  .messages({
    'any.required': 'Missing fields',
  });

module.exports = { addSchema, updateSchema };
