const { Task } = require('../models/task');
const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

// get all per month
const getAll = async (req, res, next) => {
  // const { _id: owner } = req.user;

  const { month, year } = req.body;

  const startOfMonth = new Date(year, month - 1, 2).toISOString();
  const endOfMonth = new Date(year, month, 1).toISOString();

  const result = await Task.find(
    {
      date: { $gte: startOfMonth, $lte: endOfMonth },
    },
    '-createdAt -updatedAt'
  ); //  owner | .populate("owner", "avatarURL");,

  if (!result) {
    return next(new HttpError(404));
  }

  res.json(result);
};

const addTask = async (req, res, next) => {
  // const { _id: owner } = req.user;

  const result = await Task.create(req.body); // { ...req.body, owner }
  res.status(201).json(result);
};

const updateTask = async (req, res, next) => {
  // const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  //  const result = await Task.find({id, owner}, req.body, {
  //   new: true,
  // }); // заборонити редагування чужих тасок через swagger

  if (!result) {
    return next(new HttpError(404));
  }
  res.json(result);
};

const removeTask = async (req, res, next) => {
  // const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Task.findByIdAndRemove(id);
  // const result = await Task.find({id, owner}); // заборонити видалення чужих тасок через swagger

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
