import React from "react";
import "./AppDevelopmentIndustries.css";

// 🔁 Replace this with your actual image path
import industriesImage from "../../assets/Industries-We-Serve.webp";

const IndustriesSection = () => {
  return (
    <section className="industries-section">
      {/* LEFT: text + lists */}
      <div className="industries-left">
    
    <h2 className="industries-title">
        Industries We Serve
     </h2>

     <p className="industries-intro">
         PR WEBSTOCK is a trusted mobile app development company in Bhubaneswar,
         Odisha, delivering innovative digital solutions for businesses across
         multiple industries. Our experienced team develops custom Android, iOS,
         and cross-platform mobile applications tailored to specific business
        requirements. From startups to established enterprises, PR WEBSTOCK helps
        organizations in Bhubaneswar, Odisha and beyond improve customer engagement,
       streamline operations, and accelerate digital growth through reliable and
       scalable mobile app development services.
</p>

        <div className="industries-lists">
          <ul className="industries-list">
            <li>
              <span className="industries-arrow">→</span> Health &amp; Fitness
            </li>
            <li>
              <span className="industries-arrow">→</span> Retail &amp; E-commerce
            </li>
            <li>
              <span className="industries-arrow">→</span> Tourism &amp;
              Hospitality
            </li>
            <li>
              <span className="industries-arrow">→</span> Finance &amp; Business
            </li>
          </ul>

          <ul className="industries-list">
            <li>
              <span className="industries-arrow">→</span> Real Estate &amp; Rentals
            </li>
            <li>
              <span className="industries-arrow">→</span> Education &amp; E-Learning
            </li>
            <li>
              <span className="industries-arrow">→</span> Interior Design &amp;
              Architecture
            </li>
            <li>
              <span className="industries-arrow">→</span> Engineering &amp;
              Manufacturing
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT: image with background shape */}
      <div className="industries-right">
        <div className="industries-bg-shape" />
        <img
          src={industriesImage}
          alt="Mobile app screens"
          className="industries-image"
        />
      </div>
    </section>
  );
};

export default IndustriesSection;
