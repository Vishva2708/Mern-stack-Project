import React from "react";
import { useNavigate } from "react-router";
import "./css/Products.css";

const Products = () => {
  const navigate = useNavigate();
  const manualProducts = [
    {
      _id: "manual-product-1",
      title: "Facial Care",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWnxP09no8m3Fwcgfu5-2n1zN1HALxSiPvdppu__Y_M3CDmiEv",
    },
    {
      _id: "manual-product-2",
      title: "Awesome Lip Care",
      image:
        "https://www.e-litchi.com/cdn/shop/articles/20220713172111.jpg?v=1657704170",
    },
    {
      _id: "manual-product-3",
      title: "Beauty of Skin",
      image:
        "https://m.media-amazon.com/images/I/817UV+ARWWL._AC_UF894,1000_QL80_.jpg",
    },
    {
      _id: "manual-product-4",
      title: "Discover Skincare",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW9IaDMh392KwQwbz52DZc2RwQSChVY2dteQyhG1a82dsFYEpB",
    },
  ];

  const handlelogic = () => {
    navigate("/categories");
  };

  return (
    <div className="container mt-5 p-4 discover-products">
      <div className="row p-4 g-4">
        <div className="discover-products-header d-flex justify-content-between">
          <div>
            <h5 style={{ color: "#BD844C" }}>Product Collection</h5>
            <h1>Discover our products</h1>
          </div>

          <div className="d-flex align-items-center gap-2 p-2">
            <button
              className="btn btn-light fw-semibold shadow-sm px-4 py-2"
              onClick={handlelogic}
            >
              Shop All Products
              <i className="fa-solid fa-arrow-right ms-4 fs-5"></i>
            </button>
          </div>
        </div>
        {manualProducts.map((el) => (
          <div className="col-lg-3" key={el._id}>
            <div className="card border-0 position-relative">
              <img
                src={el.image}
                alt={el.title}
                className="img-fluid discover-product-img"
              />

              <div
                style={{
                  position: "absolute",
                  top: "420px",
                  left: "60px",
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                <h4>{el.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
