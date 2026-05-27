import React from "react";
import { Navigate } from "react-router-dom";

const Adminprotected = ({ children }) => {
  let admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default Adminprotected;
