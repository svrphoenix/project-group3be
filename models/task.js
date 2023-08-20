const { Schema, model } = require('mongoose');
const mongooseErrorHandler = require('../helpers/mongooseErrorHandler');
const { timeRegexp, dateRegexp } = require('../const');

const taskSchema = new Schema(
  {
    title: { type: String, required: [true, 'Enter a task title'] },
    start: {
      type: String,
      required: [true, 'Enter the task start time'],
      match: timeRegexp,
    },
    end: {
      type: String,
      required: [true, 'Enter the task end time'],
      match: timeRegexp,
      validate: {
        validator: function (value) {
          return value >= this.start;
        },
        message: 'End time must be greater than start time',
      },
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Select a priority for the task'],
    },
    date: {
      type: String,
      required: [true, 'Add a date for the task'],
      match: dateRegexp,
    },
    category: {
      type: String,
      enum: ['to-do', 'in-progress', 'done'],
      required: [true, 'Select a task category'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post('save', mongooseErrorHandler);

const Task = model('task', taskSchema);

module.exports = { Task };
