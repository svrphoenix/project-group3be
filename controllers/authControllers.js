const ctrlWrapper = require("../helpers/ctrlWrapper");
const {registerService, loginService, logoutService} = require("../services/authServices");

const register = ctrlWrapper(async (req, res, next) => {
    const user = await registerService(req.body);
    res.status(201).json(user);
});

const login = ctrlWrapper(async (req, res, next) => {
    const { user, token } = await loginService(req.body);
    res.json({user,token})
})

const logout = ctrlWrapper(async (req, res, next) => {
    await logoutService();
    res.status(200).json({message:"Logout successful"})
})

module.exports = { register,login,logout };