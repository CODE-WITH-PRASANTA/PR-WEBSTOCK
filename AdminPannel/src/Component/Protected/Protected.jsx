import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  console.log(
    "Protected:",
    localStorage.getItem("adminAuth")
  );

  const isAuth =
    localStorage.getItem("adminAuth") === "true";

  return isAuth ? children : <Navigate to="/" replace />;
};

export default Protected;