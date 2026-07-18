import React, { useState } from "react";

import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import "./css/Admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin");

    localStorage.removeItem("adminToken");

    navigate("/login");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-shell">
      <button
        type="button"
        className="admin-menu-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open admin menu"
      >
        ☰
      </button>

      <div
        className={`admin-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-top">
          <button
            type="button"
            className="admin-close-btn"
            onClick={closeSidebar}
            aria-label="Close admin menu"
          >
            ×
          </button>
        </div>

        <div className="text-center">
          <div className="admin-avatar">
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
            <Link to="/admin-dashboard" style={linkStyle} onClick={closeSidebar}>
              Dashboard
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/products" style={linkStyle} onClick={closeSidebar}>
              Products
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/coupon" style={linkStyle} onClick={closeSidebar}>
              Coupons
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/slider" style={linkStyle} onClick={closeSidebar}>
              Slider
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/categories" style={linkStyle} onClick={closeSidebar}>
              Categories
            </Link>
          </li>

          <li className="mb-3">
            <Link to="/admin-dashboard/orders" style={linkStyle} onClick={closeSidebar}>
              Orders
            </Link>
          </li>
          

          <li className="mb-3">
            <Link to="/admin-dashboard/users" style={linkStyle} onClick={closeSidebar}>
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
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
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
