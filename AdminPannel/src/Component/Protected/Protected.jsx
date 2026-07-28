import { Navigate } from "react-router-dom";
import { useMemo } from "react";

const Protected = ({ children }) => {
  const isAuth = useMemo(() => {
    return localStorage.getItem("adminAuth") === "true";
  }, []); // Run once on mount, or remove memo if auth state needs to change dynamically on navigation

  return isAuth ? children : <Navigate to="/" replace />;
};

export default Protected;