
import React from "react";
import "./SeoStrtegic.css";
import webdevlopment from "../../assets/Web-Development-Cycle.webp";

const SeoStrtegic = () => {
  return (
    <section className="seo-section">
      <div className="seo-container">

        {/* Left Image */}
        <div className="seo-image">
          <img
            src={webdevlopment}
            alt="PR WEBSTOCK SEO Services in Bhubaneswar Odisha"
          />
        </div>

        {/* Right Content */}
        <div className="seo-content">
          <h2>
            Strategic SEO Services by PR WEBSTOCK in Bhubaneswar, Odisha
          </h2>

          <p>
            PR WEBSTOCK helps businesses in Bhubaneswar, Odisha improve
            search rankings, increase organic traffic, and attract quality
            leads through effective SEO strategies tailored to their goals.
          </p>

          <ul className="seo-list">
            <li>
              <span>01</span>
              <div>
                <h4>Keyword Research</h4>
                <p>
                  Find high-value keywords that connect your business with
                  potential customers.
                </p>
              </div>
            </li>

            <li>
              <span>02</span>
              <div>
                <h4>Content Optimization</h4>
                <p>
                  Optimize website content to improve visibility and search
                  engine performance.
                </p>
              </div>
            </li>

            <li>
              <span>03</span>
              <div>
                <h4>On-Page & Off-Page SEO</h4>
                <p>
                  Build authority and improve rankings through proven SEO
                  techniques and quality backlinks.
                </p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default SeoStrtegic;
