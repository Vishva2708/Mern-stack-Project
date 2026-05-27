const express = require("express");

const {
  createOrder,
  getOrders,
  salesSummary,
} = require("../controller/OderC");

const O_route = express.Router();

O_route.post("/create", createOrder);

O_route.get("/", getOrders);

O_route.get("/summary", salesSummary);

module.exports = O_route;