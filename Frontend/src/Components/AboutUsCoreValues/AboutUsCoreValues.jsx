import React from "react";
import "./AboutUsCoreValues.css";

import iconImg1 from "../../assets/icon-img1.webp";
import iconImg2 from "../../assets/icon-img2.webp";
import iconImg3 from "../../assets/icon-img3.webp";
import iconImg4 from "../../assets/icon-img4.webp";

const AboutUsCoreValues = () => {
  return (
    <section className="about-us-core-values">
      <div className="about-us-core-values__grid">

        <div className="about-us-core-values__item">
          <img src={iconImg1} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Expertise and Innovation</h3>
          <p className="about-us-core-values__desc">
            We pride ourselves staying at the front of innovation, constantly pushing
            boundaries and redefining what's possible.
          </p>
        </div>

        <div className="about-us-core-values__item">
          <img src={iconImg2} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Transparent Process</h3>
          <p className="about-us-core-values__desc">
            Our transparent process is designed to demystify the journey from
            concept to delivery.
          </p>
        </div>

        <div className="about-us-core-values__item">
          <img src={iconImg3} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Client-Centric Approach</h3>
          <p className="about-us-core-values__desc">
            Our dedicated team takes the time to listen & collaborate, ensuring that
            every interaction is a step toward your success.
          </p>
        </div>

        <div className="about-us-core-values__item">
          <img src={iconImg4} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Cost-Effective</h3>
          <p className="about-us-core-values__desc">
            Our commitment to cost-effective solutions is ingrained in our mission.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutUsCoreValues;
