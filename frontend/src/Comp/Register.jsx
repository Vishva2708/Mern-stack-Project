import { API_URL } from "../config";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const addtext = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/userdata/signup`, form);
      alert("Signup Successfully");
      navigate("/login");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Signup failed! Try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h3 className="auth-title">Sign Up</h3>

        <p className="auth-switch">
          Already have account? <Link to="/login">Login</Link>
        </p>

        <form onSubmit={handlesubmit}>
          <input
            type="text"
            name="username"
            placeholder="Your Name"
            className="form-control mb-3"
            onChange={addtext}
            required
          />

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

          <button className="btn btn-dark w-100 auth-submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
