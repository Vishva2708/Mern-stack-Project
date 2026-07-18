import { API_URL } from "../config";
import React, { useContext, useEffect, useState } from "react";
import "./css/Collection.css";
import "./css/Products.css";
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
          (item) => {
            const category = item.category ? item.category.toLowerCase() : "";
            const brand = item.brand ? item.brand.toLowerCase() : "";
            const status = item.status ? item.status.toLowerCase() : "";
            const selected = active.toLowerCase();

            return (
              category === selected ||
              brand === selected ||
              status === selected
            );
          },
        );

  const reviews = [
    {
      id: "review-1",
      name: "Jake Weary",
      role: "CEO Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
    },
    {
      id: "review-2",
      name: "Salim Rana",
      role: "Web Developer",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 4,
    },
  ];

  const services = [
    {
      id: "service-1",
      icon: "fa-solid fa-truck",
      title: "Free Delivery",
      text: "Orders from all item",
    },
    {
      id: "service-2",
      icon: "fa-solid fa-dollar-sign",
      title: "Return & Refund",
      text: "Money back guarantee",
    },
    {
      id: "service-3",
      icon: "fa-solid fa-percent",
      title: "Member Discount",
      text: "On every order over $140.00",
    },
    {
      id: "service-4",
      icon: "fa-solid fa-headphones",
      title: "Support 24/7",
      text: "Contact us 24 hours a day",
    },
  ];

  const handleAddToCart = async (item, redirectToCart = false) => {
    const added = await addToCart(item);

    if (!added) {
      navigate("/register");
      return;
    }

    if (redirectToCart) {
      navigate("/cart");
      return;
    }

    setCartOpen(true);
  };

  const handleAddToWishlist = async (item) => {
    const added = await addToWishlist(item);

    if (!added) {
      navigate("/register");
      return;
    }

    navigate("/wishlist");
  };

  return (
    <div className=" container collection-container">
      <div className="top-bar">
        <div className="main-title">
          <h5>Best Seller This Week's</h5>
          <h2>Enjoy The Best Quality</h2>
        </div>
        <div className="categories">
          {["All", "Beauty", "Cosmetics", "Electronics"].map(
            (cat) => (
              <button
                key={cat}
                className={active === cat ? "active" : ""}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ),
          )}
        </div>
      </div>
      <div className="container">
        <div className="row g-4">
          {filteredproduct.map((item) => (
            <div className="col-lg-3 col-md-6" key={item._id}>
              <div className="product-card">
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
                        onClick={() => handleAddToCart(item)}
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
                        onClick={() => handleAddToWishlist(item)}
                      ></i>
                    </div>
                  </div>
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="product-details">
                  <p>{item.category}</p>
                  <h4>{item.title}</h4>
                  <div className="product-meta">
                    <span>${item.price}</span>
                    <span>{item.status}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredproduct.length === 0 && (
            <div className="col-12">
              <div className="collection-empty">
                <h4>No products found</h4>
                <p>Add products with this category, brand, or status from admin.</p>
              </div>
            </div>
          )}
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
                          onClick={() => handleAddToCart(product, true)}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <button
                        className="modal-buy-now"
                        onClick={async () => {
                          const added = await addToCart(product);

                          if (!added) {
                            navigate("/register");
                            return;
                          }

                          navigate("/checkout");
                        }}
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
      <section className="customer-review-section">
        <div className="container">
          <div className="review-heading text-center">
            <p>Customers Review</p>
            <h2>What our Clients say</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {reviews.map((review) => (
              <div className="col-lg-5 col-md-6" key={review.id}>
                <div className="review-card">
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fa-solid fa-star ${
                          star <= review.rating ? "filled" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  <p className="review-text">
                    Suscipit tellus mauris a diam maecenas. Ut faucibus pulvinar
                    elementum integer enim neque volutpat ac. Auctor urna nunc id
                    cursus. Scelerisque purus semper eget duis at.
                  </p>
                  <div className="review-author">
                    <img src={review.image} alt={review.name} />
                    <span>
                      <strong>{review.name}</strong> /{review.role}
                    </span>
                  </div>
                  <span className="quote-mark">"</span>
                </div>
              </div>
            ))}
          </div>

          <div className="review-dots">
            <span className="active"></span>
            <span></span>
          </div>

          <div className="service-strip">
            {services.map((service) => (
              <div className="service-item" key={service.id}>
                <i className={service.icon}></i>
                <div>
                  <h5>{service.title}</h5>
                  <p>{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
