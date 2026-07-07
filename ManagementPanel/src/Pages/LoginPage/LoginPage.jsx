import React, { useState } from "react";
import "./LoginPage.css";
import logo from "../../assets/prwebstock_logo.png";
import loginImg from "../../assets/hero.png"; // Right Side Illustration
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Login API Here
  };

  return (
  <div className="LoginPage-wrapper">
  <div className="LoginPage-card">

    <div className="LoginPage-left">

      <div className="LoginPage-logoBox">
        <img
          className="LoginPage-logo"
          src={logo}
          alt="Logo"
        />
      </div>

      <div className="LoginPage-headingSection">
        <h2 className="LoginPage-title">
          Employee Login
        </h2>

        <p className="LoginPage-subtitle">
          Welcome Back! Please login to continue.
        </p>
      </div>

      <form
        className="LoginPage-form"
        onSubmit={handleSubmit}
      >

        <div className="LoginPage-inputGroup">

          <label className="LoginPage-label">
            Employee ID
          </label>

          <input
            className="LoginPage-input"
            type="text"
            name="employeeId"
            placeholder="Enter Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />

        </div>

        <div className="LoginPage-inputGroup">

          <label className="LoginPage-label">
            Password
          </label>

          <div className="LoginPage-passwordBox">

            <input
              className="LoginPage-input LoginPage-passwordInput"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="LoginPage-eyeIcon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
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
            />

            Remember Me

          </label>

          <a
            href="/"
            className="LoginPage-forgotLink"
          >
            Forgot Password?
          </a>

        </div>

        <button
          type="submit"
          className="LoginPage-loginBtn"
        >
          Login
        </button>

      </form>

    </div>

    <div className="LoginPage-right">

      <div className="LoginPage-imageWrapper">

        <img
          className="LoginPage-image"
          src={loginImg}
          alt="Employee Login"
        />

      </div>

    </div>

  </div>
</div>
  );
};

export default LoginPage;