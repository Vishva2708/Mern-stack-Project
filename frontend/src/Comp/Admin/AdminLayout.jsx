import React from "react";

import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import Products from "./Products";
import Categories from "./Categories";
import Users from "./Users";
import AdminOrders from "./AdminOrders";
import AdminCoupon from "./AdminCoupon";
import Brands from "./Brands";
import AdminSlider from "./AdminSlider";

const AdminLayout = () => {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin");

    localStorage.removeItem("adminToken");

    navigate("/login");
  };

  return (
    <div className="d-flex">
      <div
        style={{
          width: "250px",
          minHeight: "100vh",
          background: "linear-gradient(180deg,#4f46e5,#7c3aed)",
          padding: "23px",
          position: "fixed",
        }}
      >
        <div className="text-center">
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#fff",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: "bold",
              color: "#4f46e5",
            }}
          >
            {admin?.username?.charAt(0).toUpperCase()}
          </div>

          <h4 className="text-white mt-3">{admin?.username}</h4>

          <p style={{ color: "#ddd" }}>Administrator</p>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          <li className="mb-3">
            <Link to="/admin-dashboard" style={linkStyle}>
              Dashboard
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/products" style={linkStyle}>
              Products
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/coupon" style={linkStyle}>
              Coupons
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/slider" style={linkStyle}>
              Slider
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/categories" style={linkStyle}>
              Categories
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/orders" style={linkStyle}>
              Orders
            </Link>
          </li>
          

          <li className="mb-3">
            <Link to="/admin-dashboard/users" style={linkStyle}>
              Users
            </Link>
          </li>

          <li className="mt-4">
            <button
              onClick={handleLogout}
              className="btn btn-light w-100 fw-semibold"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div
        style={{
          marginLeft: "250px",
          width: "100%",
          padding: "30px",
          background: "#f4f7fe",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/products" element={<Products />} />

          <Route path="/coupon" element={<AdminCoupon />} />

          <Route path="/slider" element={<AdminSlider />} />

          <Route path="/brands" element={<Brands />} />

          <Route path="/categories" element={<Categories />} />

          <Route path="/orders" element={<AdminOrders />} />

          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

const linkStyle = {
  display: "block",
  padding: "12px 18px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
};

export default AdminLayout;
