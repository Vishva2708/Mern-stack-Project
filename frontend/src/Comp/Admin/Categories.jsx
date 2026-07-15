import { API_URL } from "../../config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(`${API_URL}/collections/api`);

    setProducts(res.data);
  };

  const categories = [...new Set(products.map((i) => i.category))];

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f4f7fe",
        minHeight: "100vh",
      }}
    >
      <div className="mb-5">
        <h1
          className="fw-bold"
          style={{
            fontSize: "38px",
            color: "#111827",
          }}
        >
          Categories
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "17px",
          }}
        >
          Browse products category wise
        </p>
      </div>

      <div className="row g-4">
        {categories.map((cat, index) => {
          const categoryProducts = products.filter(
            (item) => item.category?.toLowerCase() === cat.toLowerCase(),
          );

          const total = categoryProducts.length;

          const categoryImage = categoryProducts[0]?.image;

          return (
            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
              <div
                onClick={() =>
                  navigate(`/admin-dashboard/products?category=${cat}`)
                }
                style={{
                  background: "#fff",
                  borderRadius: "22px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.3s",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    height: "220px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`${API_URL}/upload/${categoryImage}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="p-4">
                  <h4
                    className="fw-bold"
                    style={{
                      color: "#111827",
                    }}
                  >
                    {cat}
                  </h4>

                  <p
                    style={{
                      color: "#6b7280",
                      marginTop: "10px",
                    }}
                  >
                    {total} Products
                  </p>

                  <button
                    className="btn mt-2"
                    style={{
                      background: "#4f46e5",
                      color: "#fff",
                      borderRadius: "12px",
                      width: "100%",
                      padding: "10px",
                      fontWeight: "600",
                      border: "none",
                    }}
                  >
                    View Products →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
