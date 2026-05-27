import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Invoice.css";

const Invoice = () => {
  const { state } = useLocation();

  const { cartItems, subtotal, formData } = state || {};

  const shipping = 20;
  const total = subtotal + shipping;

  return (
    <div className="invoice-container">

      <div className="invoice-box">

        <div className="invoice-header">
          <Link className="navbar-brand" to="/">
          <img
            src="https://shofy-client.vercel.app/_next/static/media/logo.414c93a2.svg"
            alt="logo"
            height="35"
          />
        </Link>
          <h3>INVOICE</h3>
        </div>

        <div className="invoice-info">
          <div>
            <h4>{formData?.name}</h4>
            <p>{formData?.city}</p>
            <p>{formData?.phone}</p>
          </div>

          <div>
            <p>Invoice ID: #1303</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {cartItems?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.qty || 1}</td>
                <td>${item.price}</td>
                <td>${item.price * (item.qty || 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-summary">
          <p>Shipping: ${shipping}</p>
          <p>Total: ${total.toFixed(2)}</p>
        </div>
        <div className="text-center mt-4">

  <Link to="/">
    <button className="btn btn-dark px-4 py-2">
      ← Back To Shopping
    </button>
  </Link>

</div>

      </div>

    </div>
  );
};

export default Invoice;