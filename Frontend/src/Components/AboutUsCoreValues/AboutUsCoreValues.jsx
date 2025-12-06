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

        {/* VALUE 1 */}
        <div className="about-us-core-values__item">
          <img src={iconImg1} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Innovation Through Clean Code</h3>
          <p className="about-us-core-values__desc">
            PR WEBSTOCK builds every digital product using modern tech and clean,
            scalable code. We innovate with purpose—ensuring performance, security,
            and long-term growth for every business we serve.
          </p>
        </div>

        {/* VALUE 2 */}
        <div className="about-us-core-values__item">
          <img src={iconImg2} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Transparent & Reliable Workflow</h3>
          <p className="about-us-core-values__desc">
            From planning to deployment, our process is fully transparent—
            real-time updates, clear communication, and accountability at every
            stage to ensure a smooth and predictable delivery.
          </p>
        </div>

        {/* VALUE 3 */}
        <div className="about-us-core-values__item">
          <img src={iconImg3} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Client-First Development Approach</h3>
          <p className="about-us-core-values__desc">
            We design and develop with your business goals in mind. Every decision,
            feature, and design element is tailored to maximize user experience and
            deliver measurable results for your brand.
          </p>
        </div>

        {/* VALUE 4 */}
        <div className="about-us-core-values__item">
          <img src={iconImg4} className="about-us-core-values__icon" alt="" />
          <h3 className="about-us-core-values__title">Cost-Efficient, High-Value Solutions</h3>
          <p className="about-us-core-values__desc">
            We deliver premium-quality websites, apps, and software at competitive
            pricing—ensuring every business, from startups to enterprises, gets the
            best return on investment.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutUsCoreValues;
