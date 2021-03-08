const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");

const { Sex } = require("../../helpers/constats");

const SALT_WORK_FACKTOR = 8;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: "Guest",
    },
    sex: {
      type: String,
      enum: {
        values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        message: "It isn't alloved",
        default: "none",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },

  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
