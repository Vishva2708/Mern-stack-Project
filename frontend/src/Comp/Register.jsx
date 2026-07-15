import { API_URL } from "../config";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
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
        <h3 className="text-center mb-3">Sign Up</h3>

        <p className="text-center">
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

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={addtext}
            required
          />

          <button className="btn btn-dark w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
