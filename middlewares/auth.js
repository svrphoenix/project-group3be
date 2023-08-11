const jwt = require('jsonwebtoken');

const HttpError = require('../helpers/HttpError');
const { User } = require('../models/User');
const createTokens = require('../helpers/createTokens');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Not authorized'));
  }
  const decoded = jwt.decode(token);
  let user;
  try {
    user = await User.findById(decoded.id);
    if (!user || !user.refresh_token) {
      return next(new HttpError(401, 'Not autorized'));
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error.name !== 'TokenExpiredError') {
      return next(new HttpError(401, 'Not autorized'));
    }
    try {
      jwt.verify(user.refresh_token, REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken } = createTokens(user);
      await User.findByIdAndDelete(
        user._id,
        { refresh_token: refreshToken },
        { new: true }
      );
        res.status(200).json({token:accessToken})
    } catch (error) {
      return next(new HttpError(401, 'Refresh token is expired'));
    }
  }
};

module.exports = { auth };