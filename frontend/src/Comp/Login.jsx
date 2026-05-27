import axios from "axios";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",

    password: "",
  });

  const navigate = useNavigate();

  const addtext = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4500/userdata/login",
        form,
      );

      if (!res.data.user || !res.data.token) {
        alert(res.data.message || "Login Failed");
        return;
      }

      const user = res.data.user;
      const token = res.data.token;

      if (user.role === "admin") {
        localStorage.setItem("admin", JSON.stringify(user));
        localStorage.setItem("adminToken", token);
        navigate("/admin-dashboard");
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userToken", token);
        navigate("/");
      }
    } catch (error) {
      // Axios error handle karva mate
      const errorMsg =
        error.response?.data?.message || "Something went wrong with login!";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <div
        className="auth-box"
        style={{
          height: "400px",
          width: "500px",
        }}
      >
        <h3 className="text-center mb-3">Login</h3>

        <p className="text-center">
          Don’t have account?
          <Link to="/register">Register</Link>
        </p>

        <form onSubmit={handlesubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={addtext}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={addtext}
            required
          />

          <button className="btn btn-dark w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
