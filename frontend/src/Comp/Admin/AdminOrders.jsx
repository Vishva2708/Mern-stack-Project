import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProductsSold: 0,
    productDetails: [],
  });

  useEffect(() => {
    getOrders();
    getSummary();
  }, []);

  const getOrders = async () => {
    const res = await axios.get(
      "http://localhost:4500/orders"
    );

    setOrders(res.data);
  };

  const getSummary = async () => {
    const res = await axios.get(
      "http://localhost:4500/orders/summary"
    );

    setSummary(res.data);
  };

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f4f7fe",
        minHeight: "100vh",
      }}
    >
      <h2 className="fw-bold mb-4">
        Orders Dashboard
      </h2>

      {/* CARDS */}

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h5>Total Orders</h5>

            <h1>{summary.totalOrders}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h5>Total Revenue</h5>

            <h1>$ {summary.totalRevenue.toFixed(2)}</h1>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 bg-white rounded shadow-sm">
            <h5>Products Sold</h5>

            <h1>{summary.totalProductsSold}</h1>
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}

      <div className="bg-white p-3 rounded shadow-sm">
        <h4 className="mb-3">Recent Orders</h4>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Customer</th>

              <th>City</th>

              <th>Products</th>

              <th>Total</th>

              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>

                <td>{order.city}</td>

                <td>
                  {order.products.map((p, i) => (
                    <div key={i}>
                      {p.title} × {p.qty}
                    </div>
                  ))}
                </td>

                <td>$ {order.totalAmount.toFixed(2)}</td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrders;