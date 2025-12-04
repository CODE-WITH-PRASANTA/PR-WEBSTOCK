// File: src/components/Footer/Footer.jsx
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
import logo from '../../assets/prwebstock_logo.png'
import bglogo from '../../assets/footer-logo-bg.png'

const services = [
  { name: 'Managed Services', icon: '⚡' },
  { name: 'Cloud Services', icon: '☁️' },
  { name: 'IT Consulting & Advisory', icon: '💼' },
  { name: 'Network Connectivity', icon: '🌐' },
  { name: 'Cyber Security', icon: '🛡️' },
  { name: 'ERP Solutions', icon: '📊' },
  { name: 'Web Development', icon: '💻' },
  { name: 'Mobile Development', icon: '📱' }
];

const reviews = [
  { platform: 'Clutch', rating: 5, count: 50, color: '#273270' },
  { platform: 'Google', rating: 5, count: 50, color: '#1a73e8' }
];

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    label: 'Call Any Time',
    value: '2-965-871-8617'
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Address',
    value: 'Dhaka, Bangladesh'
  },
  {
    icon: <FaEnvelope />,
    label: 'Say Hello',
    value: 'info@example.com'
  }
];

const socialLinks = [
  { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
  { icon: <FaTwitter />, href: '#', label: 'Twitter' },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: '#', label: 'Instagram' }
];

const StarRating = ({ rating }) => (
  <div className="zenfy-star-rating" aria-label={`Rating: ${rating} out of 5`}>
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} className="zenfy-star" />
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer className="zenfy-footer" role="contentinfo">
      <div className="zenfy-footer-inner">
        <div className="zenfy-footer-columns">
          
          {/* Left Column - Services */}
          <div className="zenfy-footer-col zenfy-footer-col-services">
            <h4 id="footer-solutions" className="zenfy-footer-heading">Our Solutions</h4>
            <div className="zenfy-accent-line" aria-hidden="true"></div>
            
            <div className="zenfy-services-grid" role="list">
              {services.map((service, index) => (
                <div key={index} className="zenfy-service-item" role="listitem">
                  <span className="zenfy-service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                  <span className="zenfy-service-text">{service.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Center Column - Logo */}
          <div className="zenfy-footer-col zenfy-footer-col-logo">
            <div className="zenfy-brand-container" aria-hidden="true">

              {/* Background logo (larger, centered and subtle) */}
              <img
                src={bglogo}
                alt="Zenfy background emblem"
                className="zenfy-bglogo-img"
                aria-hidden="true"
              />

              {/* Foreground logo placed centered on top of background emblem */}
              <div className="zenfy-brand-logo" aria-hidden="false">
                <img
                  src={logo}
                  alt="Zenfy logo"
                  className="zenfy-logo-img"
                />
              </div>
              
            </div>
          </div>
          
          {/* Right Column - About & Reviews */}
          <div className="zenfy-footer-col zenfy-footer-col-about">
            <div className="zenfy-badge">What Sets Us Apart</div>
            <h3 className="zenfy-about-title">Excellence in Every Pixel</h3>
            <p className="zenfy-about-desc">
              Welcome to Zenfy, where innovation meets passion. We started with a simple idea 
              and a shared dream to transform digital experiences through cutting-edge 
              technology and unparalleled creativity.
            </p>
            
            <div className="zenfy-reviews-section">
              <div className="zenfy-reviews-title">Trusted By Clients Worldwide</div>
              <div className="zenfy-review-grid">
                {reviews.map((review, index) => (
                  <div key={index} className="zenfy-review-card">
                    <div className="zenfy-review-platform">
                      <span 
                        className="zenfy-platform-logo" 
                        style={{ color: review.color }}
                      >
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

        {/* Contact cards */}
        <div className="zenfy-contact-cards" role="group" aria-label="Contact information">
          {contactInfo.map((contact, index) => (
            <div key={index} className="zenfy-contact-card">
              <div className="zenfy-contact-icon" aria-hidden="true">
                {contact.icon}
              </div>
              <div className="zenfy-contact-info">
                <div className="zenfy-contact-label">{contact.label}</div>
                <div className="zenfy-contact-value">{contact.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="zenfy-footer-bottom">
          <div className="zenfy-copyright">
            Copyright 2024 <strong>Zenfy</strong> | Design By{' '}
            <a href="#" className="zenfy-credit-link" aria-label="Egens Lab">
              Egens Lab
            </a>
          </div>
          
          <div className="zenfy-footer-links" aria-label="Footer links">
            <a href="#" className="zenfy-footer-link">Support Policy</a>
            <a href="#" className="zenfy-footer-link">Terms & Conditions</a>
            <a href="#" className="zenfy-footer-link">Privacy Policy</a>
          </div>
          
          <div className="zenfy-social-links" aria-label="Social links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="zenfy-social-link"
                aria-label={social.label}
              >
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


