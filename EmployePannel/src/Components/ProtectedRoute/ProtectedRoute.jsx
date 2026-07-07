import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("employeeToken");

  // If token doesn't exist, kick user out to login screen
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authorized, render child components via layout Outlet
  return <Outlet />;
};

export default ProtectedRoute;