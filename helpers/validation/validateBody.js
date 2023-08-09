const HttpError = require("../HttpError");

const validateBody = schema => {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(422, error));
    }
    next();
  };
};

module.exports = { validateBody };
