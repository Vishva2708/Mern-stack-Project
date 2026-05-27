const mongoose = require("mongoose");
const cartschema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection",
        required: true,
      },
      qty: {
        type: Number,
        default: 1,
      },
    },
  ],
});
const Cart = mongoose.model("cart", cartschema);
module.exports = Cart;
