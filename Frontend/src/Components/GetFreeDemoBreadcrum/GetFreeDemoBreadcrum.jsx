import React from "react";
import bgImage from "../../assets/page-title-bg.webp"; // <-- import your image
import "./GetFreeDemoBreadcrum.css";

const Breadcrumb = () => {
  return (
    <section
      className="breadcrumb-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="breadcrumb-content">
        <p className="breadcrumb-path">
          <span className="home">Home</span> &gt; Free Consultation
        </p>

        <h1 className="breadcrumb-title">Get Free Consultation</h1>
      </div>
    </section>
  );
};

export default Breadcrumb;
