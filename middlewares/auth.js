const jwt = require('jsonwebtoken');
require('dotenv').config();

const HttpError = require('../helpers/HttpError');
const { User } = require('../models/User');

const { ACCESS_TOKEN_SECRET } = process.env;

const auth = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [type, token] = authorization.split(' ', 2);

  if (type !== 'Bearer' || !token) {
    return next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(id);

    if (!user || !user.refresh_token) {
      return next(new HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(new HttpError(401));
  }
};

module.exports = auth;
