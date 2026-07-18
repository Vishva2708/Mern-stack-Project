import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Nav from "./Comp/Nav";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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

const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const user = getLoggedInUser();

  if (!user?._id) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin-dashboard");
  const isAuthRoute = ["/login", "/register"].includes(location.pathname);
  const hideSiteFooter = isAdminRoute || isAuthRoute;
  return (
    <div>
      <CartProvider>
        {!isAdminRoute && <Nav />}
        {/* <Nav/> */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/collection"
            element={
              <ProtectedRoute>
                <Collection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <Productinfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coupon"
            element={
              <ProtectedRoute>
                <Coupon />
              </ProtectedRoute>
            }
          />

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
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <Route path="/admin-dashboard/slider" element={<AdminSlider />} /> */}
        </Routes>
        <Cartslide showCart={showCart} setShowCart={setShowCart} />
        {!hideSiteFooter && <Footer />}
        {/* <Footer /> */}
      </CartProvider>
    </div>
  );
};

export default App;
