import React from 'react';
import './Footer.css';
import { 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaStar, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram 
} from 'react-icons/fa';

import logo from '../../assets/prwebstock_logo.png';
import bglogo from '../../assets/footer-logo-bg.png';

/* ------------------------------------
   PR WEBSTOCK – SERVICES
------------------------------------ */
const services = [
  { name: 'Web Development', icon: '💻' },
  { name: 'App Development', icon: '📱' },
  { name: 'CRM Software Development', icon: '📊' },
  { name: 'SEO & Digital Marketing', icon: '🚀' },
  { name: 'Cloud Solutions', icon: '☁️' },

  // UPDATED SERVICE 1
  { name: 'Payment Gateway Solutions', icon: '💳' },

  { name: 'E-Commerce Solutions', icon: '🛒' },

  // UPDATED SERVICE 2
  { name: 'Social Media Management', icon: '📣' }
];


/* ------------------------------------
   CLIENT REVIEWS
------------------------------------ */
const reviews = [
  { platform: 'Clutch', rating: 5, count: 50, color: '#273270' },
  { platform: 'Google', rating: 5, count: 80, color: '#1a73e8' }
];

/* ------------------------------------
   CONTACT INFO
------------------------------------ */
const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    label: 'Call Anytime',
    value: '+91 7789 801 327'
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Office Location',
    value: 'Unit 32, Nexus Esplanade, Bhubaneswar'
  },
  {
    icon: <FaEnvelope />,
    label: 'Email Us',
    value: 'prwebstock.com@gmail.com'
  }
];

const socialLinks = [
  { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' }
];

/* ------------------------------------
   STAR RATING UI
------------------------------------ */
const StarRating = ({ rating }) => (
  <div className="zenfy-star-rating" aria-label={`Rating: ${rating} out of 5`}>
    {[...Array(rating)].map((_, i) => (
      <FaStar key={i} className="zenfy-star" />
    ))}
  </div>
);

/* ------------------------------------
   FOOTER COMPONENT
------------------------------------ */
const Footer = () => {
  return (
    <footer className="zenfy-footer" role="contentinfo">
      <div className="zenfy-footer-inner">

        <div className="zenfy-footer-columns">

          {/* LEFT COLUMN — SERVICES */}
          <div className="zenfy-footer-col zenfy-footer-col-services">
            <h4 className="zenfy-footer-heading">Our Services</h4>
            <div className="zenfy-accent-line"></div>

            <div className="zenfy-services-grid">
              {services.map((service, index) => (
                <div key={index} className="zenfy-service-item">
                  <span className="zenfy-service-icon">{service.icon}</span>
                  <span className="zenfy-service-text">{service.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN — LOGO */}
          <div className="zenfy-footer-col zenfy-footer-col-logo">
            <div className="zenfy-brand-container">

              <img
                src={bglogo}
                alt="Brand background"
                className="zenfy-bglogo-img"
              />

              <div className="zenfy-brand-logo">
                <img src={logo} alt="PR WEBSTOCK Logo" className="zenfy-logo-img" />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN — ABOUT SECTION */}
          <div className="zenfy-footer-col zenfy-footer-col-about">
           <div className="zenfy-badge">Why We Stand Ahead</div>

            <h3 className="zenfy-about-title">Your Trusted Partner for Scalable.</h3>

            <p className="zenfy-about-desc">
              At PR WEBSTOCK, we transform ideas into digital reality. With a deep passion 
              for technology and creativity, we build high-quality digital products that 
              help businesses grow, scale, and stand out in the competitive marketplace.
            </p>

            <div className="zenfy-reviews-section">
              <div className="zenfy-reviews-title">Trusted by Clients Worldwide</div>

              <div className="zenfy-review-grid">
                {reviews.map((review, index) => (
                  <div key={index} className="zenfy-review-card">
                    <div className="zenfy-review-platform">
                      <span className="zenfy-platform-logo" style={{ color: review.color }}>
                        {review.platform}
                      </span>
                    </div>

                    <StarRating rating={review.rating} />
                    <div className="zenfy-review-count">({review.count} reviews)</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* CONTACT CARDS */}
        <div className="zenfy-contact-cards">
          {contactInfo.map((contact, index) => (
            <div key={index} className="zenfy-contact-card">
              <div className="zenfy-contact-icon">{contact.icon}</div>

              <div className="zenfy-contact-info">
                <div className="zenfy-contact-label">{contact.label}</div>
                <div className="zenfy-contact-value">{contact.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM FOOTER */}
        <div className="zenfy-footer-bottom">
          <div className="zenfy-copyright">
            © {new Date().getFullYear()} <strong>PR WEBSTOCK</strong> — All Rights Reserved.
          </div>

          <div className="zenfy-footer-links">
            <a href="#">Support Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>

          <div className="zenfy-social-links">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} aria-label={social.label}>
                {social.icon}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
