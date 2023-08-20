const Joi = require('joi');
const { timeRegexp, dateRegexp } = require('../../const');

const validateStartEndTime = (obj, helpers) => {
  function toMinute(time) {
    const arrTime = time.split(':');
    return Number(arrTime[0]) * 60 + Number(arrTime[1]);
  }
  const { start, end } = obj;

  if (toMinute(start) >= toMinute(end)) {
    return helpers.error('any.invalid');
  }
};

const priorityType = ['low', 'medium', 'high'];
const categoryType = ['to-do', 'in-progress', 'done'];

const addSchema = Joi.object({
  title: Joi.string().max(250).required().messages({
    'string.max': "Field 'title' must have no more than 250 characters",
    'any.required': "Field 'title' is missing",
  }),
  start: Joi.string().min(5).max(5).pattern(timeRegexp).required().messages({
    'string.pattern.base':
      "Field 'start' should be in hh:mm format and not exceed 23:59",
    'any.required': "Field 'start' is missing",
  }),
  end: Joi.string().min(5).max(5).pattern(timeRegexp).required().messages({
    'string.pattern.base':
      "Field 'start' should be in hh:mm format and not exceed 23:59",
    'any.required': "Field 'end' is missing",
  }),
  priority: Joi.string()
    .valid(...priorityType)
    .required()
    .messages({
      'any.only': 'Priority must be one of: low, medium or high',
      'any.required': "Field 'priority' is missing",
    }),
  date: Joi.string().min(10).max(10).pattern(dateRegexp).required().messages({
    'string.pattern.base':
      "Field 'date' should be in YYYY-MM-DD format and start from 2023",
    'any.required': "Field 'date' is missing",
  }),
  category: Joi.string()
    .valid(...categoryType)
    .required()
    .messages({
      'any.only': 'Category must be one of: to-do, in-progress or done',
      'any.required': "Field 'category' is missing",
    }),
})
  .custom(validateStartEndTime)
  .messages({
    'any.invalid': `End time must be greater than start time`,
  });

const updateSchema = Joi.object({
  title: Joi.string().max(250).messages({
    'string.max': "Field 'title' must have no more than 250 characters",
  }),
  start: Joi.string().min(5).max(5).pattern(timeRegexp).messages({
    'string.pattern.base':
      "Field 'start' must be in hh:mm format and not exceed 23:59",
  }),
  end: Joi.string().min(5).max(5).pattern(timeRegexp).messages({
    'string.pattern.base':
      "Field 'end' must be in hh:mm format and not exceed 23:59",
  }),
  priority: Joi.string()
    .valid(...priorityType)
    .messages({
      'any.only': 'Priority must be one of: low, medium or high',
    }),
  date: Joi.string().min(10).max(10).pattern(dateRegexp).messages({
    'string.pattern.base':
      "Field 'date' must be in YYYY-MM-DD format and start from 2023",
  }),
  category: Joi.string()
    .valid(...categoryType)
    .messages({
      'any.only': 'Category must be one of: to-do, in-progress or done',
    }),
})
  .min(1)
  .custom(validateStartEndTime)
  .messages({
    'any.invalid': `End time must be greater than start time`,
    'object.min': 'Missing fields. At least one field should be present',
  });

module.exports = { addSchema, updateSchema };
