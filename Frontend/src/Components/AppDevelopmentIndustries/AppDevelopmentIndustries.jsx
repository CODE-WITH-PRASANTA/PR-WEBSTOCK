import React from "react";
import "./AppDevelopmentIndustries.css";

// 🔁 Replace this with your actual image path
import industriesImage from "../../assets/Industries-We-Serve.webp";

const IndustriesSection = () => {
  return (
    <section className="industries-section">
      {/* LEFT: text + lists */}
      <div className="industries-left">
        <h2 className="industries-title">Industries we serve</h2>

        <p className="industries-intro">
          As a leading mobile app development company in Bangalore, we are proud
          of our extensive client base, built on years of trust and delivering
          top-notch solutions to a global user community. Our services have
          catered to diverse industries, solidifying our reputation as a
          reliable provider in the ever-evolving technology landscape.
        </p>

        <div className="industries-lists">
          <ul className="industries-list">
            <li>
              <span className="industries-arrow">→</span> Health &amp; Fitness
            </li>
            <li>
              <span className="industries-arrow">→</span> Retail &amp; Fashion
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
              <span className="industries-arrow">→</span> Rentals &amp; Booking
            </li>
            <li>
              <span className="industries-arrow">→</span> Education &amp; IT
            </li>
            <li>
              <span className="industries-arrow">→</span> Interiors &amp;
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
