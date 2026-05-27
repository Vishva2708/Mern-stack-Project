const mongoose = require("mongoose");

const user = mongoose.Schema(
  {
    username: {
      type: String,
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,

      enum: ["admin", "user"],

      default: "user",
    },

    mobile: {
      type: String,
    },
    status: {
      type: String,

      enum: ["active", "inactive"],

      default: "active",
    },

    loginCount: {
      type: Number,
      default: 0,
    },

    lastLogin: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("server", user);

module.exports = User;
