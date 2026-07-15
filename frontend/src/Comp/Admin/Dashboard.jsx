import { API_URL } from "../../config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(`${API_URL}/collections/api`);

    setProducts(res.data);
  };

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
            marginBottom:"10px"
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "19px",
            marginBottom:"10px"
          }}
        >
          Welcome Back Manage your products, brands & categories
        </p>
      </div>


      <div className="row g-4">

        <div className="col-lg-4 col-md-6">
          <div
            onClick={() => navigate("/admin-dashboard/products")}
            style={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              borderRadius: "22px",
              padding: "32px",
              color: "#fff",
              cursor: "pointer",
              transition: "0.4s",
              boxShadow: "0 10px 25px rgba(79,70,229,0.3)",
            }}
            className="h-100"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Total Products</h5>

                <h1
                  className="fw-bold mt-3"
                  style={{
                    fontSize: "50px",
                  }}
                >
                  {products.length}
                </h1>
              </div>

              <div
                style={{
                  fontSize: "60px",
                }}
              >
                📦
              </div>
            </div>

            <p className="mt-4 mb-0">Click to manage all products →</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div
            onClick={() => navigate("/admin-dashboard/categories")}
            style={{
              background: "linear-gradient(135deg,#06b6d4,#0891b2)",
              borderRadius: "22px",
              padding: "30px",
              color: "#fff",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 10px 25px rgba(6,182,212,0.3)",
            }}
            className="h-100"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Total Categories</h5>

                <h1
                  className="fw-bold mt-3"
                  style={{
                    fontSize: "50px",
                  }}
                >
                  {[...new Set(products.map((i) => i.category))].length}
                </h1>
              </div>

              <div
                style={{
                  fontSize: "60px",
                }}
              >
                📂
              </div>
            </div>

            <p className="mt-4 mb-0">Click to view categories →</p>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div
            onClick={() => navigate("/admin-dashboard/brands")}
            style={{
              background: "linear-gradient(135deg,#f59e0b,#ea580c)",
              borderRadius: "22px",
              padding: "30px",
              color: "#fff",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow: "0 10px 25px rgba(245,158,11,0.3)",
            }}
            className="h-100"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Total Brands</h5>

                <h1
                  className="fw-bold mt-3"
                  style={{
                    fontSize: "50px",
                  }}
                >
                  {[...new Set(products.map((i) => i.brand))].length}
                </h1>
              </div>

              <div
                style={{
                  fontSize: "60px",
                }}
              >
                🏷️
              </div>
            </div>

            <p className="mt-4 mb-0">Click to view brands →</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
