import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Badge } from "react-bootstrap";

const Brands = () => {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] =
    useState("Beauty");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(
      "http://localhost:4500/collections/api"
    );

    setProducts(res.data);
  };

  const brands = [
    "Beauty",
    "Electronics",
    "Trending",
    "Cosmetics",
  ];

  const filteredProducts = products.filter(
    (item) =>
      item.brand?.toLowerCase() ===
      selectedBrand.toLowerCase()
  );

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f4f7fe",
        minHeight: "100vh",
      }}
    >

      <div className="mb-5">
        <h2 className="fw-bold">Brands</h2>

        <p className="text-muted">
          Filter products brand wise
        </p>
      </div>


      <Row className="mb-5">
        {brands.map((brand, index) => (
          <Col md={3} key={index}>
            <div
              onClick={() =>
                setSelectedBrand(brand)
              }
              style={{
                background:
                  selectedBrand === brand
                    ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                    : "#fff",
                color:
                  selectedBrand === brand
                    ? "#fff"
                    : "#111",
                borderRadius: "20px",
                padding: "30px",
                cursor: "pointer",
                textAlign: "center",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",
              }}
            >
              <h4 className="fw-bold">
                {brand}
              </h4>

              <h2>
                {
                  products.filter(
                    (item) =>
                      item.brand?.toLowerCase() ===
                      brand.toLowerCase()
                  ).length
                }
              </h2>
            </div>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">
          {selectedBrand} Products
        </h3>

        <Badge bg="dark" pill>
          {filteredProducts.length} Products
        </Badge>
      </div>

      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Col md={3} className="mb-4" key={item._id}>
              <Card
                style={{
                  border: "none",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:4500/upload/${item.image}`}
                  style={{
                    height: "230px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>
                  <h5 className="fw-bold">
                    {item.title}
                  </h5>

                  <p className="text-muted mb-2">
                    {item.brand}
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="primary">
                      {item.category}
                    </Badge>

                    <h5
                      className="fw-bold mb-0"
                      style={{
                        color: "#16a34a",
                      }}
                    >
                      $ {item.price}
                    </h5>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No Products Found</h4>
          </div>
        )}
      </Row>
    </div>
  );
};

export default Brands;