import React from "react";
import "./ContactMap.css";

const OfficeLocations = () => {
  const mapSrc =
    "https://www.google.com/maps?q=608A,Grand+Bazar,Bamphakuda,Phulnakhara,Bhubaneswar,Odisha+754001&output=embed";

  return (
    <section className="office-section">
      <div className="office-container">

   
        <div className="prws-header">

          <div className="prws-badge">
            <span className="prws-badge-icon">★</span>
            <span>PR WEBSTOCK</span>
          </div>

          <h2 className="prws-heading">
            Best <span>Web Development Company</span>
            <br />
            in Bhubaneswar
          </h2>

          <p className="prws-description">
            PR WEBSTOCK is a leading web development company in Bhubaneswar,
            specializing in Website Design, E-Commerce Development, SEO,
            Digital Marketing, Branding, UI/UX Design, and Custom Software
            Solutions. We help startups, businesses, and enterprises build
            powerful digital experiences that drive growth, generate leads,
            and increase online visibility.
          </p>

        </div>


        <div className="Contact-Sec-content">

          <div className="Contact-Sec-card">
            <h3 className="Contact-Sec-company">PR WEBSTOCK</h3>

            <p className="Contact-Sec-tagline">
              Empowering Businesses with Modern Web Solutions & Digital Growth.
            </p>

            <div className="Contact-Sec-info">

              <div className="Contact-Sec-item">
                <div className="Contact-Sec-icon">📍</div>
                <div>
                  <h4>Office Address</h4>
                  <p>
                    608A, Grand Bazar, Bamphakuda,
                    Phulnakhara, Bhubaneswar,
                    Odisha - 754001
                  </p>
                </div>
              </div>

              <div className="Contact-Sec-item">
                <div className="Contact-Sec-icon">📞</div>
                <div>
                  <h4>Phone Number</h4>
                  <p>
                    <a href="tel:+917789801327">
                      +91 77898 01327
                    </a>
                    <br />
                    <a href="tel:+916372545244">
                      +91 63725 45244
                    </a>
                  </p>
                </div>
              </div>

              <div className="Contact-Sec-item">
                <div className="Contact-Sec-icon">✉️</div>
                <div>
                  <h4>Email Address</h4>
                  <p>
                    <a href="mailto:prwebstock.com@gmail.com">
                      prwebstock.com@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="Contact-Sec-item">
                <div className="Contact-Sec-icon">🕒</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>
                    Monday - Saturday: 8:00 AM - 9:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="Contact-Sec-map">
            <iframe
              title="PR WEBSTOCK Office Location"
              src={mapSrc}
              loading="lazy"
              allowFullScreen
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default OfficeLocations;

