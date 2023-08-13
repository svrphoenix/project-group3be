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
} = require('../controllers/authControllers');

const router = express.Router();

router.post('/register', validateBody(registerValidationSchema), register);
router.post('/login', validateBody(loginValidationSchema), login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrent);
router.post('/refresh', validateBody(refreshSchema), refresh);

router.patch('/avatars', validateBody(updateUserSchema));

module.exports = { authRouter: router };
