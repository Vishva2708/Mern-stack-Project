const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  city: String,

  products: [
    {
      title: String,
      price: Number,
      qty: Number,
    },
  ],

  totalAmount: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);