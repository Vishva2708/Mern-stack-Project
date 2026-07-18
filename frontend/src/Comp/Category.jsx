import { API_URL } from "../config";
import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router";
const Category = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState("All");
  const [sortorder, setSortorder] = useState("default");
  const [price, setPrice] = useState(1000);
  const [instock, setInstock] = useState(false);
  const [onsale, setOnsale] = useState(false);

  const navigate = useNavigate();

  const getproducts = useCallback(async () => {
    const res = await axios.get(`${API_URL}/collections/api`);
    setProducts(res.data || []);
  }, []);

  useEffect(() => {
    getproducts();
  }, [getproducts]);

  const categories = ["All", ...new Set(products.map((i) => i.category))];

  const filteredproducts = products.filter((itm) => {
    const categorymatch =
      selectedcategory === "All" ? true : itm.category === selectedcategory;

    const priceMatch = Number(itm.price) <= price;

    const stockMatch = instock ? itm.status === "In Stock" : true;

    const saleMatch = onsale ? itm.status === "On Sale" : true;

    return categorymatch && priceMatch && saleMatch && stockMatch;
  });
  if (sortorder === "a-z") {
    filteredproducts.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sortorder === "z-a") {
    filteredproducts.sort((a, b) => b.title.localeCompare(a.title));
  }
  return (
    <div
      className="container-fluid py-5"
      style={{ background: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div
            style={{
              background: "#fff",
              padding: "23px",
              borderRadius: "20px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              position: "sticky",
              top: "17px",
            }}
          >
            {/* price filter */}
            <div className="mb-5">
              <h4 className="mb-4 fw-bold">Price Filter</h4>
              <input
                type="range"
                min="0"
                max="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="form-range"
              />
              <p>$0- ${price}</p>
            </div>

            {/* status filter */}
            <div className="mb-4">
              <h4 className="fw-bold mb-4">Product Status</h4>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={onsale}
                  onChange={() => setOnsale(!onsale)}
                />

                <label className="form-check-label">On Sale</label>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={instock}
                  onChange={() => setInstock(!instock)}
                />

                <label className="form-check-label">In Stock</label>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3>Categories</h3>
              {categories.map((cat, ind) => {
                const total = products.filter(
                  (itm) => itm.category === cat,
                ).length;

                return (
                  <div
                    key={ind}
                    onClick={() => setSelectedcategory(cat)}
                    className="d-flex justify-content-between align-items-center mb-3"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        color: selectedcategory === cat ? "#0d6efd" : "#444",
                        fontWeight: selectedcategory === cat ? "800" : "500",
                        fontSize: "19px",
                      }}
                    >
                      • {cat}
                    </div>
                    <span
                      style={{
                        background:
                          selectedcategory === cat ? "#0d6efd" : "#f1f1f1",
                        color: selectedcategory === cat ? "#fff" : "#555",
                        borderRadius: "10px",
                        padding: "3px 10px",
                        fontWeight: "600",
                      }}
                    >
                      {cat === "All" ? products.length : total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-center mb-4 flex-wrap gap-3">
            <p
              className="mb-0"
              style={{
                color: "#666",
                fontSize: "17px",
              }}
            >
              Showing {filteredproducts.length} products
            </p>
            <select
              className="form-select"
              style={{ width: "220px", height: "50px", borderRadius: "15px" }}
              value={sortorder}
              onChange={(e) => setSortorder(e.target.value)}
            >
              <option value="default">Default Sorting</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>

          <div className="row">
            {filteredproducts.length > 0 ? (
              filteredproducts.map((itm) => (
                <div className="col-lg-4 col-md-6 mb-4" key={itm._id}>
                  <div
                    className="card border-0 h-100"
                    style={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "0.3s",
                    }}
                  >
                    <div
                      style={{
                        height: "270px",
                        overflow: "hidden",
                        background: "#f8f8f8",
                      }}
                    >
                      <img
                        src={`${API_URL}/upload/${itm.image}`}
                        alt=""
                        className="w-100 h-100"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="card-body">
                      <p
                        className="text-muted mb-2"
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {itm.category}
                      </p>
                      <h5 className="fw-bold">{itm.title}</h5>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <h5
                          className="fw-bold mb-0"
                          style={{
                            color: "#16a34a",
                          }}
                        >
                          $ {itm.price}
                        </h5>

                        <button
                          onClick={async () => {
                            const added = await addToCart(itm);

                            if (!added) {
                              navigate("/register");
                              return;
                            }

                            navigate("/cart");
                          }}
                          className="btn btn-dark"
                          style={{
                            borderRadius: "10px",
                          }}
                        >
                          Add Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4 className="text-center mt-5">No Products Found</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
