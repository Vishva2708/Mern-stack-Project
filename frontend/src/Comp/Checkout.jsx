import { API_URL } from "../config";
import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./css/Checkout.css";
import axios from "axios";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    country: "",
    address: "",
    zip: "",
    notes: "",
    cardNumber: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.city ||
      !formData.phone ||
      !formData.email ||
      !formData.country ||
      !formData.address
    ) {
      alert("Please Fill All Required Fields");

      return false;
    }

    if (formData.phone.length < 10) {
      alert("Invalid Phone Number");

      return false;
    }

    if (!formData.email.includes("@")) {
      alert("Invalid Email");

      return false;
    }

    if (
      paymentMethod === "card" &&
      formData.cardNumber.length !== 16
    ) {
      alert("Card Number Must Be 16 Digits");

      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validateForm()) return;

    const orderData = {
      customerName: formData.name,

      city: formData.city,

      products: cartItems.map((item) => ({
        title: item.title,
        price: item.price,
        qty: item.qty || 1,
      })),

      totalAmount: subtotal,
    };

    try {
      await axios.post(
        `${API_URL}/orders/create`,
        orderData
      );

      alert("Order Placed Successfully");

      navigate("/invoice", {
        state: {
          cartItems,
          subtotal,
          formData,
          paymentMethod,
        },
      });

    } catch (error) {

      console.log(error);

      alert("Order Failed");
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "#f4f7fe",
        minHeight: "100vh",
      }}
    >
      <div className="container">

        <div className="row g-4">

          <div className="col-lg-8">

            <div
              className="bg-white p-4"
              style={{
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h2 className="fw-bold mb-4">
                Billing Details
              </h2>

              <div className="row g-3">

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ZIP Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <textarea
                    rows="4"
                    className="form-control"
                    placeholder="Order Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

          </div>

          <div className="col-lg-4">

            <div
              className="bg-white p-4"
              style={{
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h3 className="fw-bold">
                Your Order
              </h3>

              <hr />

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between mb-3"
                >
                  <div>
                    <h6 className="mb-1">
                      {item.title}
                    </h6>

                    <small className="text-muted">
                      Qty : {item.qty || 1}
                    </small>
                  </div>

                  <h6>
                    $ {item.price * (item.qty || 1)}
                  </h6>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <h5>Total</h5>

                <h5
                  style={{
                    color: "#16a34a",
                    fontWeight: "700",
                  }}
                >
                  $ {subtotal.toFixed(2)}
                </h5>
              </div>

              <div className="mt-4">

                <h5 className="mb-3">
                  Payment Method
                </h5>

                <div className="mb-2">

                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() =>
                      setPaymentMethod("card")
                    }
                  />
                  Credit Card

                </div>

                <div>

                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() =>
                      setPaymentMethod("cod")
                    }
                  />
                  Cash On Delivery

                </div>

              </div>

              {paymentMethod === "card" && (
                <div className="mt-3">

                  <input
                    type="text"
                    maxLength={16}
                    className="form-control"
                    placeholder="Enter 16 Digit Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />

                </div>
              )}

              <button
                className="btn w-100 mt-4"
                onClick={handleOrder}
                style={{
                  background: "#4f46e5",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  border: "none",
                }}
              >
                Place Order
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;  