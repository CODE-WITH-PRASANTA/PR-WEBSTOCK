import React from "react";
import "./ContactMap.css";

const OfficeLocations = () => {
  const mapSrc =
    "https://www.google.com/maps?q=Unit%20No.%2032,%20721,%20Cuttack%20-%20Puri%20Rd,%20Rasulgarh%20Industrial%20Estate,%20Industrial%20Area%20Estate,%20Rasulgarh,%20Bhubaneswar,%20Odisha%20751010&output=embed";

  return (
    <section className="office-section">
      <div className="office-header">
        <div className="office-tag">
          <span className="office-tag-dot">★</span>
          <span>Office Addresses</span>
        </div>

        <h2 className="office-title">
          Our <span>Office</span> Locations.
        </h2>

        <p className="office-subtitle">
          Feel free adapt this based on the specific managed services, features,
          and unique selling points your IT service company provides.
        </p>
      </div>

      <div className="office-content">
        {/* LEFT CARD */}
        <div className="office-card">
          <div className="office-card-body">
            <h3 className="office-country">India</h3>
            <p className="office-city">Bhubaneswar</p>

            <p className="office-address">
              Unit No. 32, 721, Cuttack - Puri Rd, Rasulgarh Industrial Estate,
              Industrial Area Estate, Rasulgarh, Bhubaneswar, Odisha 751010
            </p>

            <div className="office-hours">
              <div className="office-hours-icon">🕒</div>
              <div>
                <p className="office-hours-label">Working Hours</p>
                <p className="office-hours-line">
                  Mon to Sat : <span>8am - 9pm</span>
                </p>
                <p className="office-hours-line">
                  Sunday : <span className="office-hours-closed">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAP */}
        <div className="office-map-wrapper">
          <iframe
            title="Bhubaneswar office location"
            src={mapSrc}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocations;
