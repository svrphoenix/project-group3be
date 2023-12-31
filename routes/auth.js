const express = require('express');

const { auth, validateBody, uploadAvatar } = require('../middlewares');
const {
  registerValidationSchema,
  refreshSchema,
  loginValidationSchema,
} = require('../helpers/validation/authValidationSchema');
const { updateUserSchema } = require('../helpers/validation/updateUserSchema');

const {
  register,
  login,
  logout,
  getCurrent,
  refresh,
  updateUser,
} = require('../controllers/authControllers');

const router = express.Router();

router.post('/register', validateBody(registerValidationSchema), register);
router.post('/login', validateBody(loginValidationSchema), login);
router.post('/logout', auth, logout);
router.get('/current', auth, getCurrent);
router.post('/refresh', validateBody(refreshSchema), refresh);

router.patch(
  '/user',
  auth,
  uploadAvatar,
  validateBody(updateUserSchema),
  updateUser
);

module.exports = router;
