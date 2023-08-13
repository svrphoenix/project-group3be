const jwt = require('jsonwebtoken');

require('dotenv').config();

const HttpError = require('../helpers/HttpError');
const { User } = require('../models/User');
// const createTokens = require('../helpers/createTokens');

// const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const { ACCESS_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    next(new HttpError(401));
  }
  // const decoded = jwt.decode(token);
  // let user;
  try {
    const { id } = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // user = await User.findById(decoded.id);
    const user = await User.findById(id);
    if (!user || !user.refresh_token) {
      next(new HttpError(401, error.message));
    }
    // jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    // if (error.name !== 'TokenExpiredError') {
    //   return next(new HttpError(401, 'Not autorized'));
    // }
    // try {
    //   jwt.verify(user.refresh_token, REFRESH_TOKEN_SECRET);
    //   const { accessToken, refreshToken } = createTokens(user);
    //   await User.findByIdAndUpdate(
    //     user._id,
    //     { refresh_token: refreshToken },
    //     { new: true }
    //   );
    //   res.status(200).json({ token: accessToken });
    // } catch (error) {
    next(new HttpError(401, error.message));
  }
  // }
};

module.exports = { auth };
