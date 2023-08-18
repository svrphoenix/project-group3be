const ctrlWrapper = require('../helpers/ctrlWrapper');
const {
  registerService,
  loginService,
  logoutService,
  refreshService,
} = require('../services/authServices');

const { User } = require('../models/User');

const register = async (req, res) => {
  await registerService(req.body);
  const { user, token } = await loginService(req.body);
  res.status(201).json({ user, token });
};

const login = async (req, res) => {
  const { user, token } = await loginService(req.body);
  res.json({ user, token });
};

const logout = async (req, res) => {
  await logoutService(req.user);
  res.status(200).json({ message: 'Logout successful' });
};

const refresh = async (req, res) => {
  const { refresh_token: token } = req.body;
  const { accessToken, refreshToken } = await refreshService(token);

  res.json({
    token: accessToken,
    refresh_token: refreshToken,
  });
};

const getCurrent = (req, res) => {
  const user = req.user;
  res.json({ user });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.json(updatedUser);
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  refresh: ctrlWrapper(refresh),
  updateUser: ctrlWrapper(updateUser),
};
