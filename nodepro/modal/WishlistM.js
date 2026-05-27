const mongoose = require("mongoose");

const wishlistschema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection",
      },
    },
  ],
});

const Wishlist = mongoose.model(
  "wishlist",
  wishlistschema
);

module.exports = Wishlist;