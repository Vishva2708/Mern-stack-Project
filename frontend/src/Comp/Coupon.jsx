import axios from "axios";
import React, { useEffect, useState } from "react";

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);

  const getCoupons=async()=>{
    const res=await axios.get("http://localhost:4500/coupon")
    setCoupons(res.data.coupons)
  }
  useEffect(()=>{
    getCoupons()
  },[])

  const copycoupon=async(code)=>{
    navigator.clipboard.writeText(code)
    alert(`${code} Coupon Copied`)
  }
  return (
    <div
      className="container py-4"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <div className="text-center mb-5 p-3">
        <h1 className="fw-bold">
          Available Coupons
        </h1>

        <p className="text-muted">
          Apply these coupons at checkout
        </p>
      </div>

      <div className="row">
        {coupons.length > 0 ? (
          coupons.map((coupon) => {
            const expired =
              new Date(coupon.expiry) < new Date();

            return (
              <div
                className="col-lg-4 col-md-6 mb-5"
                key={coupon._id}
              >
                <div
                  className="card border-0 h-140"
                  style={{
                    borderRadius: "28px",
                    overflow: "hidden",
                    boxShadow:
                      "0 5px 30px rgba(0,0,0,0.09)",
                  }}
                >
                  <div
                    style={{
                      background: expired
                        ? "#dc3545"
                        : "#198754",
                      color: "#fff",
                      padding: "15px",
                    }}
                  >
                    <h3 className="fw-bold mb-2 text-center mt-2">
                      {coupon.discount}% OFF
                    </h3>
                  </div>

                  <div className="card-body text-center mt-2">
                    <h4 className="fw-bold mb-3">
                      {coupon.code}
                    </h4>

                    <p className="mb-3">
                      <strong>Brand:</strong>
                      {coupon.brand}
                    </p>

                    <p className="mb-3">
                      <strong>Expiry:</strong>
                     {new Date(coupon.expiry).toLocaleDateString()}
                    </p>

                    <p
                      className={`fw-bold ${
                        expired
                          ? "text-danger"
                          : "text-success"
                      }`}
                    >
                      {expired
                        ? "Expired"
                        : "Active Coupon"}
                    </p>

                    <button
                      className="btn btn-dark w-100 mt-3"
                      disabled={expired}
                      onClick={() =>
                        copycoupon(coupon.code)
                      }
                    >
                      {expired
                        ? "Expired"
                        : "Copy Coupon"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <h4>No Coupons Available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coupon;