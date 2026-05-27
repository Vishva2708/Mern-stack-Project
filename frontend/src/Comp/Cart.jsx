import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./css/Cart.css";
import axios from "axios";
const Cart = () => {
  const { cartItems, removecart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountpercent, setDiscountpercent] = useState(0);
  const [message, setMessage] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0,
  );
  const total = subtotal - discountAmount;

  const applycoupon=async()=>{
    const res=await axios.post("http://localhost:4500/coupon/apply",{code:coupon,
      cartItems:cartItems})
      if(!res.data.success){
        setMessage(res.data.message)
        setDiscountAmount(0)
        setDiscountpercent(0)
        return
      }
      setDiscountAmount(res.data.discountAmount)
      setDiscountpercent(res.data.discountpercent)
      setMessage(res.data.message);
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-2 fw-bold">Shopping Cart</h2>
      <p className="text-muted">Home • Shopping Cart</p>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="cart-table">
            <div className="cart-header d-flex justify-content-between px-3 py-2">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
            </div>

            {cartItems.map((item) => (
              <div
                className="cart-row d-flex align-items-center justify-content-between px-3 py-3"
                key={item._id}
              >
                <div className="d-flex align-items-center gap-3 w-50">
                  <img
                    src={`http://localhost:4500/upload/${item.image}`}
                    className="cart-img"
                  />
                  <span>{item.title}</span>
                </div>

                <div className="w-25 text-center">${item.price}</div>

                <div className="w-25 d-flex justify-content-center align-items-center gap-2">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item._id)}
                  >
                    -
                  </button>

                  <span>{item.qty || 1}</span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQty(item._id)}
                  >
                    +
                  </button>
                </div>

                <span
                  className="remove-btn"
                  onClick={() => removecart(item._id)}
                >
                  ✕ Remove
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="cart-summary p-4">
            <h5 className="fw-bold mb-3">Apply Coupon</h5>
            <div className="d-flex gap-4">
              <input
                type="text"
                placeholder="Enter Coupon"
                className="form-control"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button className="btn btn-dark" onClick={applycoupon}>
                Apply
              </button>
            </div>
            {message && (
              <p
                className="mt-2 fw-bold"
                style={{
                  color: discountpercent ? "green" : "red",
                }}
              >
                {message}
              </p>
            )}
            <hr />
            <h5 className="fw-bold mb-3">Subtotal</h5>

            <div className="d-flex justify-content-between mb-3">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Discount</span>

              <span className="text-success">
                -${discountAmount.toFixed(2)}
                {discountpercent > 0 && ` (${discountpercent}% OFF)`}
              </span>
            </div>

            <hr />

            <h5 className="fw-bold d-flex justify-content-between">
              Total <span>${total.toFixed(2)}</span>
            </h5>

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
