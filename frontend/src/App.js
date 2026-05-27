import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Nav from "./Comp/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./Comp/Register";
import Login from "./Comp/Login";
import Home from "./Comp/Home";
import Footer from "./Comp/Footer";
import Collection from "./Comp/Collection";
import Productinfo from "./Comp/Productinfo";
import Cart from "./Comp/Cart";
import { CartProvider } from "./Comp/CartContext";
import Cartslide from "./Comp/Cartslide";
import Checkout from "./Comp/Checkout";
import Invoice from "./Comp/Invoice";
import Wishlist from "./Comp/Wishlist";
import Contact from "./Comp/Contact";
import AdminLayout from "./Comp/Admin/AdminLayout";
import Categories from "./Comp/Admin/Categories";
import Brands from "./Comp/Admin/Brands";
import AdminOrders from "./Comp/Admin/AdminOrders";
import Products from "./Comp/Admin/Products";
import Users from "./Comp/Admin/Users";
import Adminprotected from "./Comp/Admin/Adminprotected";
import Dashboard from "./Comp/Admin/Dashboard";
import AdminCoupon from "./Comp/Admin/AdminCoupon";
import AdminSlider from "./Comp/Admin/AdminSlider";
import Category from "./Comp/Category";
import Coupon from "./Comp/Coupon";

const App = () => {
  const [showCart, setShowCart] = useState(false);

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  return (
    <div>
      <CartProvider>
        {!isAdminRoute && <Nav />}
        {/* <Nav/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Productinfo />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/coupon" element={<Coupon />} />

          <Route
            path="/admin-dashboard/*"
            element={
              <Adminprotected>
                <AdminLayout />
              </Adminprotected>
            }
          >
            <Route index element={<Dashboard />} />

            <Route path="products" element={<Products />} />

            <Route path="categories" element={<Categories />} />

            <Route path="brands" element={<Brands />} />

            <Route path="orders" element={<AdminOrders />} />

            <Route path="users" element={<Users />} />

            <Route path="coupon" element={<AdminCoupon />} />
            
            <Route path="slider" element={<AdminSlider />} />
          </Route>
          {/* <Route path="/admin-dashboard/slider" element={<AdminSlider />} /> */}
        </Routes>
        <Cartslide showCart={showCart} setShowCart={setShowCart} />
        {!isAdminRoute && <Footer />}
        {/* <Footer /> */}
      </CartProvider>
    </div>
  );
};

export default App;
