import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/prwebstock_logo.png";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Error Message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === "prwebstock" &&
      password === "12345"
    ) {
      setIsLoggedIn(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } else {
      setMessage("❌ Invalid Username or Password");
      setMessageType("error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* LEFT SECTION */}
        <div className="login-left">

          <div className="left-top">
            <img
              src={logo}
              alt="PR WEBSTOCK"
              className="login-logo"
            />

            <div className="company-info">
              <h3>PR WEBSTOCK</h3>
              <span>BEST SOFTWARE SOLUTION</span>
            </div>
          </div>

          <div className="dot-pattern top-dots"></div>

          <div className="left-content">
            <h1>
              PR <br />
              WEBSTOCK
            </h1>

            <div className="line"></div>

            <p>
              Welcome to the PR WEBSTOCK Admin Dashboard.
              Manage projects, clients, content and business
              operations securely.
            </p>

            <div className="secure-card">
              <FaUserShield />

              <div>
                <h4>Secure Login</h4>
                <span>Your security is our priority.</span>
              </div>
            </div>
          </div>

          <div className="wave one"></div>
          <div className="wave two"></div>
          <div className="wave three"></div>

          <div className="dot-pattern bottom-dots"></div>

        </div>

        {/* RIGHT SECTION */}
        <div className="login-right">

          {isLoggedIn ? (

            <div className="login-success-screen">

              <div className="success-icon">
                ✓
              </div>

              <h2>Login Successfully</h2>

              <p>
                Welcome to PR WEBSTOCK Admin Dashboard
              </p>

              <span>
                Redirecting to Dashboard...
              </span>

            </div>

          ) : (

            <>
              <div className="top-icon">
                <FaUserShield />
              </div>

              <h2>Welcome Back</h2>

              <p className="subtitle">
                Sign in to continue to your dashboard
              </p>

              {/* Error Message */}
              {message && (
                <div
                  className={`login-message ${messageType}`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleLogin}>

                {/* Username */}
                <div className="input-box">
                  <FaUser className="input-icon" />

                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                  />
                </div>

                {/* Password */}
                <div className="input-box">
                  <FaLock className="input-icon" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <span
                    className="eye"
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

                {/* Options */}
                <div className="options-row">
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>

                  <a href="/">
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="login-btn"
                >
                  Login
                </button>

              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              {/* Demo Credentials */}
              <div className="demo-card">
                <h3>Demo Credentials</h3>

                <p>
                  Username :
                  <strong>
                    {" "}
                    prwebstock
                  </strong>
                </p>

                <p>
                  Password :
                  <strong> 12345</strong>
                </p>
              </div>

              <p className="copyright">
                © 2024 PR WEBSTOCK.
                All rights reserved.
              </p>

            </>

          )}

        </div>

      </div>
    </div>
  );
};

export default Login;