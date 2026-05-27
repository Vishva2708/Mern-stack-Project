import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const res = await axios.get("http://localhost:4500/userdata/users");
    setUsers(res.data);
  };
  const changeStatus = async (id, status) => {
    await axios.put(`http://localhost:4500/userdata/users/${id}`, {
      status: status == "active" ? "inactive" : "active",
    });
    getUsers();
  };
  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f3f4f6", minHeight: "100vh" }}
    >
      <div>
        <h2
          className="fw-bold"
          style={{
            fontSize: "34px",
            color: "#111827",
          }}
        >
          User Management
        </h2>
        <p
          className="text-muted"
          style={{
            fontSize: "16px",
          }}
        >
          Manage all registered users
        </p>
      </div>
      <div
        style={{
          background: "#4f46e5",
          color: "#fff",
          padding: "12px 25px",
          borderRadius: "15px",
          fontWeight: "600",
          boxShadow: "0 5px 15px rgba(79,70,229,0.3)",
        }}
      >
        Total Users : {users.length}
      </div>
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div
            style={{
              background: "#fff",
              marginTop: "30px",
              padding: "20px",
              borderRadius: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3 className="mt-4 p-2 text-center">Total Users</h3>
            <h1
              className=" p-2 text-center"
              style={{
                color: "#4f46e5",
                fontSize: "45px",
              }}
            >
              {users.length}
            </h1>
          </div>
        </div>
        <div className="col-md-4">
          <div
            style={{
              background: "#fff",
              marginTop: "30px",
              padding: "20px",
              borderRadius: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3 className="mt-4 p-2 text-center">Active Users</h3>
            <h1
              className=" p-2 text-center"
              style={{
                color: "#16a34a",
                fontSize: "45px",
              }}
            >
              {users.filter((u) => u.status === "active").length}
            </h1>
          </div>
        </div>
        <div className="col-md-4">
          <div
            style={{
              background: "#fff",
              marginTop: "30px",
              padding: "20px",
              borderRadius: "30px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3 className="mt-4 p-2 text-center">Inactive Users</h3>
            <h1
              className=" p-2 text-center"
              style={{
                color: "#dc2626",
                fontSize: "45px",
              }}
            >
              {users.filter((u) => u.status === "inactive").length}
            </h1>
          </div>
        </div>
      </div>
      <div
        className="table-responsive"
        style={{
          background: "#fff",
          borderRadius: "25px",
          padding: "20px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <table className="table align-middle">
          <thead>
            <tr
              style={{
                background: "#111827",
                color: "#fff",
              }}
            >
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Login Count</th>
              <th>Last Login</th>
              <th>Registered</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          fontSize: "18px",
                        }}
                      >
                        {user.username?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h6 className="mb-0 fw-bold">{user.username}</h6>

                        <small className="text-muted">
                          ID : {user._id.slice(0, 6)}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      style={{
                        background:
                          user.role === "admin" ? "#ede9fe" : "#ecfeff",

                        color: user.role === "admin" ? "#6d28d9" : "#0891b2",

                        padding: "6px 14px",

                        borderRadius: "20px",

                        fontWeight: "600",
                      }}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <span
                      style={{
                        background:
                          user.status === "active" ? "#dcfce7" : "#fee2e2",

                        color: user.status === "active" ? "#15803d" : "#dc2626",

                        padding: "7px 16px",

                        borderRadius: "20px",

                        fontWeight: "600",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td>
                    <strong>{user.loginCount || 0}</strong>
                  </td>

                  <td>
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleString()
                      : "Never"}
                  </td>

                  <td>{user.createdAt ?new Date(user.createdAt).toLocaleDateString():"No Date"}</td>

                  <td className="text-center">
                    <button
                      className={`btn ${
                        user.status === "active" ? "btn-danger" : "btn-success"
                      }`}
                      style={{
                        borderRadius: "12px",
                        padding: "8px 18px",
                        fontWeight: "600",
                      }}
                      onClick={() => changeStatus(user._id, user.status)}
                    >
                      {user.status === "active" ? "Inactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-5">
                  <h4>No Users Found</h4>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
