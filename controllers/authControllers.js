// const HttpError = require('../helpers/HttpError');

const ctrlWrapper = require('../helpers/ctrlWrapper');
const {
  registerService,
  loginService,
  logoutService,
} = require('../services/authServices');

const register = ctrlWrapper(async (req, res, next) => {
  await registerService(req.body);
  const { user, token } = await loginService(req.body);
  delete user._doc.password;
  res.status(201).json({ user, token });
});

const login = ctrlWrapper(async (req, res, next) => {
  const { user, token } = await loginService(req.body);
  delete user._doc.password;
  res.json({ user, token });
});

const logout = ctrlWrapper(async (req, res, next) => {
  await logoutService(req.user);
  res.status(200).json({ message: 'Logout successful' });
});

// const refresh = async (req, res) => {
// };

const getCurrent = (req, res) => {
  const user = req.user;
  delete user._doc.password;
  res.json({ user });
};

module.exports = { register, login, logout, getCurrent };
