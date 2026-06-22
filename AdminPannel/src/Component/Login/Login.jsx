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
  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === "prwebstock" &&
      password === "12345"
    ) {
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert(
        "Invalid Username or Password"
      );
    }
  };

  return (
    <div className="Login">
      <div className="Login_Card">

        {/* LEFT SIDE */}

        <div className="Login_Left">

          <div className="Login_Dot Login_Dot1"></div>
          <div className="Login_Dot Login_Dot2"></div>

          <div className="Login_ImageCircle">
            <img
              src={logo}
              alt="PR WEBSTOCK"
              className="Login_Logo"
            />
          </div>

          <h1 className="Login_LeftTitle">
            PR WEBSTOCK
          </h1>

          <p className="Login_LeftText">
            Secure PR WEBSTOCK Admin Dashboard
            with fully protected authentication
            access.
          </p>

          <button className="Login_LeftBtn">
            <FaUserShield />
            Secure Login
          </button>
        </div>

        {/* RIGHT SIDE */}

        <div className="Login_Right">

          <div className="Login_TopIcon">
            <FaUserShield />
          </div>

          <h2 className="Login_Title">
            Welcome Back
          </h2>

          <p className="Login_SubTitle">
            Login to continue to PR WEBSTOCK
            Admin Dashboard
          </p>

          <form
            onSubmit={handleLogin}
            className="Login_Form"
          >

            <div className="Login_InputBox">
              <FaUser className="Login_InputIcon" />

              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />
            </div>

            <div className="Login_InputBox">
              <FaLock className="Login_InputIcon" />

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
                className="Login_Eye"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="Login_Button"
            >
              Login
            </button>
          </form>

          <div className="Login_DemoCard">
            <h4>Demo Credentials</h4>

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

        </div>
      </div>
    </div>
  );
};

export default Login;