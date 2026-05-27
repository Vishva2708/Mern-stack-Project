const express = require("express");

const verifytoken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const A_route = express.Router();

A_route.get(
  "/admin",
  verifytoken,
  authorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

A_route.get(
  "/user",
  verifytoken,
  authorizeRole("admin", "user"),
  (req, res) => {
    res.json({ message: "welcome to user" });
  }
);

module.exports = A_route;