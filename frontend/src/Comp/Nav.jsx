import { API_URL } from "../config";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./css/Nav.css";
const Nav = () => {
  const { setCartOpen, cartItems, wishlistItems } = useContext(CartContext);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();
  // const user= JSON.parse(localStorage.getItem("user"));
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }
  const searchRef = React.useRef(null);
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/collections/api`);
      const data = res.data || [];

      const filtered = data
        .filter((item) => {
          const title = String(
            item?.title || item?.name || item?.product?.title || "",
          ).toLowerCase();

          return title.includes(searchText.toLowerCase());
        })
        .sort((a, b) => {
          const aTitle = (a?.title || "").length;
          const bTitle = (b?.title || "").length;
          return aTitle - bTitle;
        })
        .slice(0, 1);

      setSearchResult(filtered);
    };


    fetchData();
  }, [searchText]);

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userToken")
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="https://shofy-client.vercel.app/_next/static/media/logo.414c93a2.svg"
            alt="logo"
            height="35"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item dropdown position-static">
              <button
                className="nav-link dropdown-toggle fw-medium"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ background: "none", border: 0 }}
              >
                Products
              </button>

              <div className="dropdown-menu w-100 mt-3 border-0 shadow">
                <div className="container">
                  <div className="row py-4">
                    <div className="col-md-3">
                      <h6 className="fw-semibold mb-3">Shop Page</h6>
                      <ul className="list-unstyled">
                        <li>
                          <Link className="dropdown-item" to="/categories">
                            Only Categories
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/shop">
                            Shop Grid
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/product/698db266fdb7cb947ffb67e8"
                          >
                            Product Details
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-3">
                      <h6 className="fw-semibold mb-3">Products</h6>
                      <ul className="list-unstyled">
                        <li>
                          <Link className="dropdown-item" to="/simple">
                            Product Simple
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/video">
                            With Video
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/timer">
                            Countdown
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/variation">
                            Variations
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-3">
                      <h6 className="fw-semibold mb-3">eCommerce</h6>
                      <ul className="list-unstyled">
                        <li>
                          <Link className="dropdown-item" to="/cart">
                            Cart
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/wishlist">
                            Wishlist
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/checkout">
                            Checkout
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/account">
                            My Account
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="col-md-3">
                      <h6 className="fw-semibold mb-3">More Pages</h6>
                      <ul className="list-unstyled">
                        <li>
                          <Link className="dropdown-item" to="/login">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/register">
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/forgot">
                            Forgot Password
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/categories">
              Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-medium" to="/contact">
                Contact
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link fw-medium" to="/coupon">
                Coupon
              </Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="position-relative me-3">
            <input
              ref={searchRef}
              type="text"
              className="form-control pe-5"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <i
              className="fa-solid fa-magnifying-glass position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              style={{ cursor: "pointer" }}
              onClick={() => searchRef.current.focus()}
            ></i>

            {/* DROPDOWN */}
            {searchText.trim() !== "" && (
              <div
                className="position-absolute bg-white shadow w-100 mt-1 rounded"
                style={{ zIndex: 999, maxHeight: "300px", overflowY: "auto" }}
              >
                {searchResult.length > 0 ? (
                  searchResult.map((item, i) => (
                    <Link
                      key={i}
                      to={`/product/${item._id || item.id}`}
                      className="d-flex align-items-center gap-2 p-2 text-dark text-decoration-none border-bottom"
                      onClick={() => setSearchText("")}
                    >
                      <img
                        src={`${API_URL}/upload/${item.image}`}
                        width="40"
                        height="40"
                        alt=""
                      />
                      <span>{item.title || item.name}</span>
                    </Link>
                  ))
                ) : (
                  <div className="p-2 text-danger">No product found</div>
                )}
              </div>
            )}
          </div>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/wishlist")}
          >
            <i className="fa-regular fa-heart fs-5"></i>

            {wishlistItems.length > 0 && (
              <span
                className="badge bg-danger"
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  borderRadius: "50%",
                  fontSize: "10px",
                }}
              >
                {wishlistItems.length}
              </span>
            )}
          </div>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setCartOpen(true)}
          >
            <i className="fa-solid fa-basket-shopping fs-5"></i>

            {cartItems.length > 0 && (
              <span
                className="badge bg-success"
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  borderRadius: "50%",
                  fontSize: "10px",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>
          <div className="d-flex align-items-center gap-3">
            {!user?.username ? (
              <Link to="/register" className="text-dark">
                <i className="fa-regular fa-user fs-5"></i>
              </Link>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <span className="fw-medium text-dark">{user?.username}</span>
                {user?.role === "admin" && (
                  <Link to="/admin-dashboard">Admin</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
