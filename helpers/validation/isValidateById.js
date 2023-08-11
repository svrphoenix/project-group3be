const { isValidObjectId } = require('mongoose');
const HttpError = require('../HttpError');

const isValidId = async (req, res, next) => {
  const { id } = req.params;
  const idCorrectId = isValidObjectId(id);
  if (!idCorrectId) {
    const error = new HttpError(404, `${id} is not corrent format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
