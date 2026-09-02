import React from "react";
import { HashLoader } from "react-spinners";
import "./PageLoader.css";

const PageLoader = ({ loading }) => {
  // If loading is false, render nothing!
  if (!loading) return null;

  return (
    <div
      className="page-loader"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <div className="loader-box">
        <HashLoader
          size={55}
          color="#2563eb"
        />

        <span className="loader-brand">
          PR WEBSTOCK
        </span>

        <span className="loader-text">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default PageLoader;