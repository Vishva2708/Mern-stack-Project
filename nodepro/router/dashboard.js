const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

router.get("/stats", async (req, res) => {

    const totalProducts = await Product.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
    });
  }
)

module.exports = router;