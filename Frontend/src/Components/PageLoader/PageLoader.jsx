import React from "react";
import { HashLoader } from "react-spinners";
import "./PageLoader.css";

const PageLoader = () => {
  return (
    <div className="page-loader clean">
      <div className="loader-box">
        <HashLoader size={55} color="#2563eb" />
        <p className="loader-brand">PR WEBSTOCK</p>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
