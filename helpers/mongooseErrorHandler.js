const mongooseErrorHandler = (error, _, next) => {
  const { name, code } = error;
  error.statusCode = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
};

module.exports = mongooseErrorHandler;
