const express = require("express");
const {
  signup,
  login,
  getusers,
  changestatus,
} = require("../controller/userC");

const verifytoken = require("../middleware/authMiddleware");

const authorizeRole = require("../middleware/roleMiddleware");

const P_route = express.Router();


P_route.post("/signup", signup);


P_route.post("/login", login);

P_route.get("/users", getusers);

P_route.put("/users/:id", changestatus);

module.exports = P_route;
