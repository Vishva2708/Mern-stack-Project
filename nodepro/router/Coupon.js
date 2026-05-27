const express = require("express");
const { getcoupon, addcoupon, applycoupon } = require("../controller/Coupon");
const B_route = express.Router();

B_route.get("/", getcoupon);
B_route.post("/add", addcoupon);
B_route.post("/apply", applycoupon);

module.exports = B_route
