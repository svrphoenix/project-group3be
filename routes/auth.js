const express = require('express');

const { auth } = require('../middlewares/auth');
const validateBody = require('../middlewares/validateBody');

const {
  registerValidationSchema,
  refreshSchema,
  loginValidationSchema,
} = require('../helpers/validation/authValidationSchema');

const updateUserSchema = require('../helpers/validation/updateUserSchema');

const {
  register,
  login,
  logout,
  getCurrent,
  refresh,
  updatedUser,
  updateAvatar,
} = require('../controllers/authControllers');

const uploadAvatar = require('../helpers/uploadAvatar');

const router = express.Router();

router.post('/register', validateBody(registerValidationSchema), register);
router.post('/login', validateBody(loginValidationSchema), login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrent);
router.post('/refresh', validateBody(refreshSchema), refresh);

router.patch('/user', auth, validateBody(updateUserSchema), updatedUser);

router.patch('/avatars', auth, uploadAvatar.single('avatar'), updateAvatar);

module.exports = { authRouter: router };
