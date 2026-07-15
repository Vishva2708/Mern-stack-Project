import { API_URL } from "../config";
import React, { useContext, useEffect, useState } from "react";
import "./css/Collection.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const Collection = () => {
  const [text, setText] = useState([]);
  const [active, setActive] = useState("All");
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const { addToCart, setCartOpen, addToWishlist } = useContext(CartContext);

  useEffect(() => {
    fetch(`${API_URL}/collections/api`)
      .then((res) => res.json())
      .then((data) => setText(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredproduct =
    active === "All"
      ? text
      : text.filter(
          (item) =>
            item.brand && item.brand.toLowerCase() === active.toLowerCase(),
        );

  return (
    <div className=" container collection-container">
      <div className="top-bar">
        <div className="main-title">
          <h5 style={{ color: "#e67e22" }}>Best Seller This Week's</h5>
          <h2>Enjoy The Best Quality</h2>
        </div>
       <div className="categories d-flex flex-wrap justify-content-center gap-2">
  {["All", "Trending", "Beauty", "Cosmetics", "Electronics"].map(
    (cat) => (
      <span
        key={cat}
        className={`px-3 py-2 text-center ${
          active === cat ? "active" : ""
        }`}
        style={{
          width: "45%",
          cursor: "pointer",
        }}
        onClick={() => setActive(cat)}
      >
        {cat}
      </span>
    ),
  )}
</div>
      </div>
      <div className="container">
        <div className="row">
          {filteredproduct.map((item) => (
            <div className="col-lg-3 col-md-12 mb-5">
              <div className="product-card" key={item._id}>
                <div className="img-wrapper">
                  <img
                    src={`${API_URL}/upload/${item.image}`}
                    alt={item.title}
                    onClick={() => navigate(`/product/${item._id}`)}
                  />
                  <div className="hover-icons">
                    <div className="icon-box">
                      <i
                        className="fa fa-shopping-cart"
                        onClick={() => {
                          addToCart(item);
                          setCartOpen(true);
                        }}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                    <div className="icon-box">
                      <i
                        className="fa fa-eye"
                        onClick={() => setProduct(item)}
                      ></i>
                    </div>
                    <div className="icon-box">
                      <i
                        className="fa-regular fa-heart fs-5"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          addToWishlist(item);
                          navigate("/wishlist");
                        }}
                      ></i>
                    </div>
                  </div>
                  <button
                    className="add-cart-btn"
                    onClick={() => {
                      addToCart(item);
                      setCartOpen(true);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <p className="mt-3">{item.category}</p>
              <h4>{item.title}</h4>
              <h4>${item.price}</h4>
              <h4>{item.status}</h4>
            </div>
          ))}
          {product && (
            <div className="custom-modal" onClick={() => setProduct(null)}>
              <div
                className="modal-content-box"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close-btn" onClick={() => setProduct(null)}>
                  &times;
                </span>

                <div className="row">
                  <div className="col-md-6 text-center model-left">
                    <img
                      src={`${API_URL}/upload/${product.image}`}
                      alt={product.title}
                      className="modal-img"
                    />
                  </div>

                  <div className="col-md-6 model-right">
                    <p style={{ color: "gray" }}>{product.category}</p>
                    <h2 style={{ fontWeight: 600 }}>{product.title}</h2>
                    <p
                      className="stock"
                      style={{ margin: "10px", color: "#007bff" }}
                    >
                      In-stock ⭐⭐⭐⭐ (1 Review)
                    </p>
                    <h3
                      className="modal-status"
                      style={{ fontSize: "20px", fontWeight: 500 }}
                    >
                      {product.status}
                    </h3>
                    <h3
                      className="modal-price"
                      style={{ fontSize: "20px", fontWeight: 500 }}
                    >
                      ${product.price}
                    </h3>

                    <p
                      className="modal-desc"
                      style={{ marginTop: "15px", color: "#555" }}
                    >
                     {product.description}
                    </p>

                    <div className="product-action">
                      <p className="qty-label">Quantity</p>

                      <div className="cart-row">
                        <div className="qty-box">
                          <button onClick={() => qty > 1 && setQty(qty - 1)}>
                            -
                          </button>
                          <span>{qty}</span>
                          <button onClick={() => setQty(qty + 1)}>+</button>
                        </div>

                        <button
                          className="modal-add-cart-btn"
                          onClick={() => {
                            addToCart(product);
                            navigate("/cart");
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <button
                        className="modal-buy-now"
                        onClick={() => navigate("/checkout")}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
