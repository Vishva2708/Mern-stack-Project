const express=require("express")
const { addToWishlist, getWishlist, removeWishlist } = require("../controller/WishlistC")
const W_route=express.Router()

W_route.post("/add-wishlist",addToWishlist)
W_route.get("/:userId",getWishlist)
W_route.post("/remove-wishlist", removeWishlist);
module.exports=W_route