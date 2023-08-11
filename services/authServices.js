const bcrypt = require('bcryptjs');

const { User } = require('../models/User');
const HttpError = require('../helpers/HttpError');
const { createTokens } = require('../helpers/createTokens');

const registerService = async body => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new HttpError(409, 'This user is already exist');git 
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
const logoutService = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refresh_token: null });
};

module.exports = { registerService, loginService, logoutService };
