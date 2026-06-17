import React from "react";
import "./Features.css";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <section className="features-banner">
      <div className="features-glow"></div>

      <div className="features-content">
        <h1>GET MANY MORE FEATURES</h1>

        <div className="features-breadcrumb">
          <Link to="/">Home</Link>
        </div>
      </div>
    </section>
  );
};

export default Features;