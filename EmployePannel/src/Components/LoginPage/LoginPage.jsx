import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginPage.css";
import logo from "../../assets/prwebstock_logo.png";
import loginImg from "../../assets/hero.png"; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../../api/axios"; 
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Double check client-side validation before sending data to the server
    if (!formData.employeeId.trim() || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both your Employee ID and Password.",
        confirmButtonColor: "#ffc107",
      });
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await API.post("/auth/employee/login", {
        employeeId: formData.employeeId.trim(),
        password: formData.password,
      });

      // 2. Explicitly handle success vs backend hidden failure flags
      if (response.data && response.data.success) {
        const { token, employee } = response.data;

        localStorage.setItem("employeeToken", token);
        localStorage.setItem("employeeData", JSON.stringify(employee));

        // Display highly intuitive success visual popups
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${employee.name || "Employee"}!`,
          confirmButtonText: "Go to Dashboard",
          confirmButtonColor: "#0d6efd",
          timer: 2000,
          timerProgressBar: true,
        });

        navigate("/employee/today-attendance", { replace: true });
      } else {
        // Fallback catch if server returns 200 OK but success is explicitly false
        const failMessage = response.data?.message || "Invalid credentials provided.";
        throw new Error(failMessage);
      }

    } catch (err) {
      // 3. Robust error state parsing architecture
      const message =
        err.response?.data?.message ||
        err.message ||
        "Connection to auth server failed. Please try again.";

      setErrorMsg(message);

      // Trigger user error alerts matching context colors
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc3545",
      });
    } finally {
      setLoading(false);
    }
  };

  // Safe handler for layout links to avoid broken context layout refreshes
  const handleForgotPassword = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Forgot Password",
      text: "Please contact your system administrator to reset your login password security credentials.",
      confirmButtonColor: "#0dcaf0"
    });
  };

  return (
    <div className="LoginPage-wrapper">
      <div className="LoginPage-card">
        <div className="LoginPage-left">
          <div className="LoginPage-logoBox">
            <img className="LoginPage-logo" src={logo} alt="Logo" />
          </div>

          <div className="LoginPage-headingSection">
            <h2 className="LoginPage-title">Employee Login</h2>
            <p className="LoginPage-subtitle">Welcome Back! Please login to continue.</p>
          </div>


          <form className="LoginPage-form" onSubmit={handleSubmit}>
            <div className="LoginPage-inputGroup">
              <label className="LoginPage-label">Employee ID</label>
              <input
                className="LoginPage-input"
                type="text"
                name="employeeId"
                placeholder="Enter Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="LoginPage-inputGroup">
              <label className="LoginPage-label">Password</label>
              <div className="LoginPage-passwordBox">
                <input
                  className="LoginPage-input LoginPage-passwordInput"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <span
                  className="LoginPage-eyeIcon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="LoginPage-optionRow">
              <label className="LoginPage-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  disabled={loading}
                />
                Remember Me
              </label>
              <a href="/" onClick={handleForgotPassword} className="LoginPage-forgotLink">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="LoginPage-loginBtn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className="LoginPage-right">
          <div className="LoginPage-imageWrapper">
            <img className="LoginPage-image" src={loginImg} alt="Employee Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;