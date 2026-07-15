import { API_URL } from "../config";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./css/Wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();

  const {
    wishlistItems,
    removewishlist,
    addToCart,
  } = useContext(CartContext);

  return (
    <div className="wishlist-container container mt-5 pt-5">
      <h2 className="mb-4">Wishlist</h2>

      <div className="row fw-bold border-bottom py-3 bg-light">
        <div className="col-md-5">Product</div>
        <div className="col-md-2">Price</div>
        <div className="col-md-2">Quantity</div>
        <div className="col-md-3">Action</div>
      </div>

      {wishlistItems.map((item) => (
        <div className="row align-items-center py-4 border-bottom" key={item._id}>
          
          <div className="col-md-5 d-flex align-items-center gap-3">
            <img
              src={`${API_URL}/upload/${item.image}`}
              alt=""
              width="80"
            />
            <span>{item.title}</span>
          </div>

          <div className="col-md-2">${item.price}</div>

          <div className="col-md-2">
            <span>1</span>
          </div>

          <div className="col-md-3 d-flex align-items-center gap-3">
            <button
              className="btn btn-primary"
              onClick={() => addToCart(item)}
            >
              Add To Cart
            </button>

            <span
              className="text-muted"
              style={{ cursor: "pointer" }}
              onClick={() => removewishlist(item._id)}
            >
              ✕ Remove
            </span>
          </div>
        </div>
      ))}

      <button
        className="btn btn-dark mt-4"
        onClick={() => navigate("/cart")}
      >
        Go To Cart
      </button>
    </div>
  );
};

export default Wishlist;