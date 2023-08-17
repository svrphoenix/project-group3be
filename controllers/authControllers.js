const ctrlWrapper = require('../helpers/ctrlWrapper');
const {
  registerService,
  loginService,
  logoutService,
  refreshService,
} = require('../services/authServices');

const { User } = require('../models/User');

const register = ctrlWrapper(async (req, res, next) => {
  await registerService(req.body);
  const { user, token } = await loginService(req.body);
  res.status(201).json({ user, token });
});

const login = ctrlWrapper(async (req, res, next) => {
  const { user, token } = await loginService(req.body);
  res.json({ user, token });
});

const logout = ctrlWrapper(async (req, res, next) => {
  await logoutService(req.user);
  res.status(200).json({ message: 'Logout successful' });
});

const refresh = ctrlWrapper(async (req, res) => {
  const { refresh_token: token } = req.body;
  const { accessToken, refreshToken } = await refreshService(token);

  res.json({
    token: accessToken,
    refresh_token: refreshToken,
  });
});

const getCurrent = ctrlWrapper((req, res) => {
  const user = req.user;
  res.json({ user });
});

const updateUser = async (req, res) => {
  const id = req.user._id;

  const userFromDB = await User.findById(id);

  if (req.body.avatarURL === '') {
    req.body.avatarURL = userFromDB.avatarURL;
  }
  const user = { ...userFromDB._doc, ...req.body };

  await User.findByIdAndUpdate(id, user);

  res.json(user);
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  refresh,
  updateUser: ctrlWrapper(updateUser),
};
