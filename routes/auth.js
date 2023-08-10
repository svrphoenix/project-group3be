const express = require("express");

const { validateBody } = require("../helpers/validation/validateBody");
const{registerValidationSchema}=require("../helpers/validation/authValidationSchema");
const{loginValidationSchema}=require("../helpers/validation/loginValidationSchema");
const { register, login, logout } = require("../controllers/authControllers");

const router = express.Router();

router.post('/register', validateBody(registerValidationSchema), register);
router.post('/login', validateBody(loginValidationSchema), login)
router.post('/logout',logout);

module.exports = {authRouter:router};
