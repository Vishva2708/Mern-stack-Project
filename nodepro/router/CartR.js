const express = require("express");

const {
  addToCart,
  getCart,
  removecart,
  increaseQty,
  decreaseQty,
} = require("../controller/CartC");

const D_route = express.Router();

D_route.post("/add-cart", addToCart);

D_route.get("/:userId", getCart);

D_route.post("/remove-cart", removecart);

D_route.post("/increase-qty", increaseQty);

D_route.post("/decrease-qty", decreaseQty);

module.exports = D_route;