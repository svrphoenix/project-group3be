const { Schema, model } = require('mongoose');

const {
  emailRegex,
  phoneRegex,
  skypeRegex,
  birthdayRegex,
} = require('../const');

const todayDate = new Date().toISOString().slice(0, 10);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: false,
      default: '',
    },
    phone: {
      type: String,
      match: phoneRegex,
      default: '',
    },
    skype: {
      type: String,
      match: skypeRegex,
      default: '',
    },
    birthday: {
      type: String,
      match: birthdayRegex,
      default: todayDate,
    },
    refresh_token: String,
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'users',
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.updatedAt;

  return userObject;
};

const User = model('user', userSchema);

module.exports = { User };
