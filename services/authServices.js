const bcrypt = require("bcryptjs");

const { User } = require("../models/User");
const HttpError = require("../helpers/HttpError");

const registerService = async body => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new HttpError(409, 'This user is already exist');
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);
    return await User.create({ ...body, password: hashedPassword });
};

module.exports = { registerService, };
