require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const db = require("./config/db");
const multer = require("multer");
const path = require("path");

const P_route = require("./router/RegisterR");
const R_route = require("./router/productR");
const C_route = require("./router/CollectionR");
const router = require("./router/CategoryR");
const A_route = require("./router/AdminR");
const O_route = require("./router/OrderR");
const B_route = require("./router/Coupon");
const S_route = require("./router/SliderR");
const D_route = require("./router/CartR");
const W_route = require("./router/WishlistR");
// const U_route = require("./router/UserR")

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

app.use("/userdata", P_route);
app.use("/products", R_route);
app.use("/collections", C_route);
app.use("/categories", router);
app.use("/users", A_route);
app.use("/orders", O_route);
app.use("/coupon", B_route);
app.use("/slider", S_route);
app.use("/cart", D_route);
app.use("/wishlist", W_route);

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use("/upload", express.static("upload"));

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
