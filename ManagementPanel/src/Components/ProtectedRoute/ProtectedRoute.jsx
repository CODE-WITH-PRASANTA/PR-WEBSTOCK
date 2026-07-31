import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FaLock } from "react-icons/fa";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children, fallbackComponent }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login page if no custom fallback is provided
    if (!fallbackComponent) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="protected-route">
        <div className="protected-card">
          <div className="protected-icon">
            <FaLock />
          </div>

          <h1>Access Denied</h1>

          <p>
            You do not have active security credentials to view this panel.
            Please authenticate to continue.
          </p>

          {fallbackComponent}
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;