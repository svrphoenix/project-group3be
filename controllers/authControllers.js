const ctrlWrapper = require("../helpers/ctrlWrapper");
const registerService = require("../services/authServices");

const register = ctrlWrapper(async (req, res, next) => {
    const user = await registerService(req.body);
    res.status(201).json(user);
});

module.exports = { register };