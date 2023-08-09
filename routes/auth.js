const express = require("express");

const { validateBody } = require("../helpers/validation/validateBody");
const{registerValidationSchema}=require("../helpers/validation/authValidationSchema");
const { register } = require("../controllers/authControllers");

const router = express.Router();

router.post('/register', validateBody(registerValidationSchema), register);

module.exports = {authRouter:router};
