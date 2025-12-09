import React from "react";
import "./GetFreeDemoContact.css";

const ContactPage = () => {
  return (
    <section className="contact-page">

      {/* LEFT SIDE */}
      <div className="contact-left">
        <h2 className="section-title">Get in touch</h2>

        <p className="section-subtitle">
          Lorem ipsum dolor sit amet consectetur adipiscing elit mattis faucibus
          odio feugiat arc dolor.
        </p>

        {/* GOOGLE MAP */}
        <div className="map-wrapper">
          <iframe
            title="Esplanade Mall Bhubaneswar"
            src="https://www.google.com/maps?q=Esplanade+One+Mall+Bhubaneswar&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="contact-right">
        <h2 className="section-title">Fill Up The Form</h2>

        <p className="section-subtitle">
          Your email address will not be published. Required fields are marked *
        </p>

        {/* NAME FIELD */}
        <div className="form-row">
          <div className="icon-box">
            <svg viewBox="0 0 24 24">
              <path
                d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-3.3 0-6 2.2-6 5v1h12v-1c0-2.8-2.7-5-6-5z"
                fill="none"
                strokeWidth="1.6"
              />
            </svg>
          </div>
          <input type="text" placeholder="Your Name*" className="form-input" />
        </div>

        {/* EMAIL FIELD */}
        <div className="form-row">
          <div className="icon-box">
            <svg viewBox="0 0 24 24">
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                fill="none"
                strokeWidth="1.6"
              />
              <path d="M3 7l9 6 9-6" fill="none" strokeWidth="1.6" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Email Address*"
            className="form-input"
          />
        </div>

        {/* MESSAGE FIELD */}
        <div className="form-row">
          <div className="icon-box">
            <svg viewBox="0 0 24 24">
              <path
                d="M4 4h16v12H7l-3 3V4z"
                fill="none"
                strokeWidth="1.6"
              />
            </svg>
          </div>
          <textarea
            rows="4"
            placeholder="Enter Your Message here"
            className="form-input textarea-input"
          />
        </div>

        {/* BUTTON */}
        <button className="submit-btn">
          <span className="submit-icon">
            <svg viewBox="0 0 24 24">
              <path
                d="M3 11l18-8-8 18-2-7-8-3z"
                fill="none"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          Get In Touch
        </button>
      </div>
    </section>
  );
};

export default ContactPage;
