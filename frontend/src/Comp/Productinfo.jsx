import { API_URL } from "../config";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Productinfo.css";
import { CartContext } from "./CartContext";
const Productinfo = () => {
  const {addToCart}=useContext(CartContext)
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState("description");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API_URL}/collections/api/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);
  if (!product) {
    return <h2>Loading...</h2>;
  }

  const handleAddToCart = async () => {
    const added = await addToCart(product);

    if (!added) {
      navigate("/register");
      return;
    }

    navigate("/cart");
  };

  return (
    <div className="container mt-5 p-3 product-info-page">
      <h2 className="product-title">Product Info</h2>
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
          <p className="stock" style={{ margin: "10px", color: "#007bff" }}>
            In-stock ⭐⭐⭐⭐ (1 Review)
          </p>
          <h3
            className="modal-price"
            style={{ fontSize: "20px", marginLeft: "10px", fontWeight: 500 }}
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
                <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>

              <button
                className="modal-add-cart-btn"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </div>

            <button
              className="modal-buy-now"
              onClick={handleAddToCart}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 p-5">
        <div className="d-flex justify-content-center border-bottom mb-3">
          <p
            className={`me-5 ms-3 fs-5 ${active === "description" ? "fw-bold border-bottom border-dark pb-3" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => setActive("description")}
          >
            Description
          </p>
          <p
            className={`me-4 ms-3 fs-5 ${active === "additional" ? "fw-bold border-bottom border-dark" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => setActive("additional")}
          >
            Additional information
          </p>
        </div>
        {active === "description" && (
          <p className="mt-4 p-3">{product.description}</p>
        )}
        {active === "additional" && (
          <div className="table">
            <table className="table table-bordered custom-table">
              <tbody>
                <tr>
                  <th>Category:</th>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <th>Brand:</th>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <th>Price:</th>
                  <td>${product.price}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{product.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productinfo;
