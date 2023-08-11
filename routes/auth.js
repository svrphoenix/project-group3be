const express = require('express');

const { auth } = require('../middlewares/auth');

const { validateBody } = require('../helpers/validation/validateBody');

const {
  registerValidationSchema,
} = require('../helpers/validation/authValidationSchema');
const {
  loginValidationSchema,
} = require('../helpers/validation/loginValidationSchema');
const {
  register,
  login,
  logout,
  getCurrent,
} = require('../controllers/authControllers');

const router = express.Router();

router.post('/register', validateBody(registerValidationSchema), register);
router.post('/login', validateBody(loginValidationSchema), login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrent);

router.patch('/avatars');

module.exports = { authRouter: router };
