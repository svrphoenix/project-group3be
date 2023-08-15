const path = require('path');
const fs = require('fs/promises');

const ctrlWrapper = require('../helpers/ctrlWrapper');
const {
  registerService,
  loginService,
  logoutService,
  refreshService,
} = require('../services/authServices');

const { User } = require('../models/User');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

// перейменувати після налаштування клаудінарі на process.cwd()

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

const updatedUser = async (req, res) => {
  const id = req.user._id;
  const { name, email, phone, skype, birthday } = req.body;

  const user = await User.findByIdAndUpdate(id, {
    name,
    email,
    phone,
    skype,
    birthday,
  });

  res.json(user);
};

const updateAvatar = async (req, res) => {
  const id = req.user._id;

  const { path: tempUpload, originalname } = req.file;

  // await Jimp.read(tempUpload).then(avatar => {
  //   return avatar.resize(250, 250).write(tempUpload);
  // });

  const filename = `${id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join('avatars', filename);
  await User.findByIdAndUpdate(id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  refresh,
  updatedUser: ctrlWrapper(updatedUser),
  updateAvatar: ctrlWrapper(updateAvatar),
};
