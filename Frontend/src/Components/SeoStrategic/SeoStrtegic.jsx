import React from 'react'
import "./SeoStrtegic.css"
import webdevlopment from "../../assets/Web-Development-Cycle.webp"

const SeoStrtegic = () => {
  return (
    <section className="seo-section">
      <div className="seo-container">
        
        {/* Left Image */}
        <div className="seo-image">
          <img src={webdevlopment} alt="SEO Strategy Team" />
        </div>

        {/* Right Content */}
        <div className="seo-content">
          <h2>
           Our Strategic SEO Services That Improve Visibility & Traffic
          </h2>

          <p>
            Building a good SEO strategy does not happen overnight since it needs time to be properly implemented. WebomindApps is the Best SEO agency in Bangalore by following a detailed process to develop and implement SEO strategies. This strategy involves:
          </p>

          <ul className="seo-list">
            <li>
              <span>01</span>
              <div>
                <h4>Keyword Research</h4>
                <p> Identifying keywords with good search volumes that are relevant to your business.</p>
              </div>
            </li>

            <li>
              <span>02</span>
              <div>
                <h4>Content Optimization</h4>
                <p> Content gap analysis of your website and optimization of content by strategically placing these keywords..</p>
              </div>
            </li>

            <li>
              <span>03</span>
              <div>
                <h4>On-Page and Off-Page SEO</h4>
                <p>
                  Implementing on-page SEO strategies that include (meta tags, URLs, content, etc) and off-page SEO (like social links, guest blogging, and backlinks).
                </p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
  )
}

export default SeoStrtegic
