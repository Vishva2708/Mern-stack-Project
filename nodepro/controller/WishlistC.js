const Wishlist = require("../modal/WishlistM");

// ADD WISHLIST
const addToWishlist = async (req, res) => {
  try {

    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    // create wishlist
    if (!wishlist) {

      wishlist = await Wishlist.create({
        userId,
        products: [{ productId }],
      });

      return res.json(wishlist);
    }

    // already exists
    const exists = wishlist.products.find(
      (w) => w.productId.toString() === productId
    );

    if (exists) {
      return res.json({
        message: "Already in wishlist",
      });
    }

    // add new product
    wishlist.products.push({
      productId,
    });

    await wishlist.save();

    res.json(wishlist);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE WISHLIST
const removeWishlist = async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.json({
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (item) =>
        item.productId.toString() !== productId
    );

    await wishlist.save();

    res.json({
      success: true,
      message: "Removed from wishlist",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET WISHLIST
const getWishlist = async (req, res) => {

  try {

    const wishlist = await Wishlist.findOne({
      userId: req.params.userId,
    }).populate("products.productId");

    res.json(wishlist);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeWishlist,
};