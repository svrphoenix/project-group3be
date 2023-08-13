const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { REFRESH_TOKEN_SECRET } = process.env;

const { User } = require('../models/User');
const HttpError = require('../helpers/HttpError');
const { createTokens } = require('../helpers/createTokens');

const registerService = async body => {
  const user = await User.findOne({ email: body.email });

  if (user) {
    throw new HttpError(409, 'This user is already exist');
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);

  return await User.create({ ...body, password: hashedPassword });
};

const loginService = async body => {
  const user = await User.findOne({ email: body.email });

  if (!user) {
    throw new HttpError(401, 'Email or password is uncorrect');
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, 'Email or password is uncorrect');
  }

  const { accessToken, refreshToken } = createTokens(user);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { refresh_token: refreshToken },
    { new: true }
  );

  return { user: updatedUser, token: accessToken };
};

const logoutService = async user => {
  await User.findByIdAndUpdate(user._id, { refresh_token: null });
};

const refreshService = async token => {
  try {
    const { id } = jwt.verify(token, REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ _id: id, refresh_token: token });

    if (!user) {
      throw new HttpError(403, 'Invalid token');
    }

    const tokens = createTokens(user);
    return tokens;
  } catch (error) {
    throw new HttpError(403, error.message);
  }
};
module.exports = {
  registerService,
  loginService,
  logoutService,
  refreshService,
};
