const Cart = require("../modal/Cart");

// ADD TO CART
const addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  let cart = await Cart.findOne({
    userId,
  });

  if (!cart) {
    cart = await Cart.create({
      userId,
      products: [
        {
          productId,
          qty: 1,
        },
      ],
    });

    return res.json(cart);
  }

  // check existing
  const exist = cart.products.find((p) => p.productId.toString() === productId);

  if (exist) {
    exist.qty += 1;
  } else {
    cart.products.push({
      productId,
      qty: 1,
    });
  }

  await cart.save();

  res.json(cart);
};

// GET CART
const getCart = async (req, res) => {
  const cart = await Cart.findOne({
    userId: req.params.userId,
  }).populate("products.productId");

  res.json(cart);
};

// INCREASE QTY
const increaseQty = async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({
    userId,
  });

  const item = cart.products.find((p) => p.productId.toString() === productId);

  if (item) {
    item.qty += 1;
  }

  await cart.save();

  res.json(cart);
};

// DECREASE QTY
const decreaseQty = async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({
    userId,
  });

  const item = cart.products.find((p) => p.productId.toString() === productId);

  if (item && item.qty > 1) {
    item.qty -= 1;
  }

  await cart.save();

  res.json(cart);
};

const removecart = async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({
    userId,
  });

  cart.products = cart.products.filter(
    (item) => item.productId.toString() !== productId,
  );

  await cart.save();

  res.json(cart);
};

module.exports = {
  getCart,
  addToCart,
  removecart,
  increaseQty,
  decreaseQty,
};
