const { Task } = require('../models/task');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { month, year } = req.query;

  if (
    !Number(month) ||
    !Number(year) ||
    month.length !== 2 ||
    year.length !== 4 ||
    parseInt(month) < 1 ||
    parseInt(month) > 12
  ) {
    return next(
      new HttpError(
        400,
        'Invalid date format. "Year" should be in YYYY format, "month" should be in MM format'
      )
    );
  }

  const result = await Task.find(
    {
      owner,
      date: { $regex: `^${year}-${month}` },
    },
    '-createdAt -updatedAt'
  ).populate('owner', 'avatarURL');

  if (!result) {
    return next(new HttpError(404));
  }

  res.json(result);
};

const addTask = async (req, res, next) => {
  const { _id: owner } = req.user;

  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Task.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    return next(new HttpError(404));
  }
  res.json(result);
};

const removeTask = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Task.findOneAndRemove({ _id: id, owner });

  if (!result) {
    return next(new HttpError(404));
  }
  res.json({ message: 'Task deleted' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  addTask: ctrlWrapper(addTask),
  updateTask: ctrlWrapper(updateTask),
  removeTask: ctrlWrapper(removeTask),
};
