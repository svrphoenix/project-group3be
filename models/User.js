const { Schema, model } = require("mongoose");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    refresh_token: String,
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "users",
  }
);


const User = model("user", userSchema);

module.exports = { User };
