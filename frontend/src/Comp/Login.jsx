import { API_URL } from "../config";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
      const res = await axios.post(`${API_URL}/userdata/login`, form);

      if (!res.data.user || !res.data.token) {
        alert(res.data.message || "Login Failed");
        return;
      }

      const user = res.data.user;
      const token = res.data.token;

      alert("Login successfully");

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
      const errorMsg =
        error.response?.data?.message || "Something went wrong with login!";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h3 className="auth-title">Login</h3>

        <p className="auth-switch">
          Don't have account? <Link to="/register">Register</Link>
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

          <div className="input-group mb-3 password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="form-control"
              onChange={addtext}
              required
            />

            <button
              type="button"
              className="btn password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i
                className={`fa-regular ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>

          <button className="btn btn-dark w-100 auth-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
