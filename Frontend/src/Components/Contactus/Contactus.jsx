import React, { useState, useEffect } from "react";
import "./Contactus.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
const SOCIALS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/917789801327",
    icon: <FaWhatsapp size={20} />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/r/19FmoTVEgT/",
    icon: <FaFacebookF size={20} />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/prwebstock?igsh=dDhmMHdtczd2ZGxx",
    icon: <FaInstagram size={20} />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/pr-webstock/",
    icon: <FaLinkedinIn size={20} />,
  },
];


const fields = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    label: "Subject",
    name: "subject",
    type: "text",
    placeholder: "Project or inquiry",
  },
];

const ContactUs = () => {
  const [form, setForm] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

      const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("access_key", "7ea3f90e-a50c-40f3-9078-ba132a07a037");
      formData.append("name", form.fullName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("subject", form.subject);
      formData.append("message", form.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("🎉 Thank you! Your message has been sent successfully.");

        setForm({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    };

  return (
    <section className="zen-section" aria-labelledby="contact-heading">
      <div className="zen-inner">
        <div className={`zen-left ${animated ? 'zen-animated' : ''}`}>
          <div className="zen-left-inner">
            <span className="zen-subtle zen-fade-in" style={{ '--zen-delay': '0.1s' }}>
              <span className="zen-subtle-icon">✦</span>
              Drop us a line
              <span className="zen-subtle-icon">✦</span>
            </span>

            <h2 id="contact-heading" className="zen-title zen-slide-up" style={{ '--zen-delay': '0.2s' }}>
              Connect with Us
            </h2>

            <p className="zen-desc zen-fade-in" style={{ '--zen-delay': '0.3s' }}>
            Whether you need a stunning website, powerful CRM, mobile app, e-commerce solution,
              or complete digital transformation — PR WEBSTOCK is here to elevate your brand with 
              innovation, strategy, and meaningful digital experiences.
            </p>

            <div className="zen-contact-blocks">
              <div className="zen-contact-row zen-slide-up" style={{ '--zen-delay': '0.4s' }}>
                <div className="zen-icon" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.13 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.73 3.04a2 2 0 0 1-.45 2.11L8.91 10.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.97.36 1.99.61 3.04.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="zen-contact-text">
                  <div className="zen-contact-label">General Inquiries</div>
                 <div className="zen-contact-value">
                    <a
                        href="https://wa.me/917789801327"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="zen-contact-link"
                      >
                      +91 7789 801 327
                    </a>
                  </div>
                </div>
              </div>

              <div className="zen-contact-row zen-slide-up" style={{ '--zen-delay': '0.5s' }}>
                <div className="zen-icon" aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 8l-9 6-9-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              <div className="zen-contact-text">
                <div className="zen-contact-label">Email Us</div>

                <div className="zen-contact-value">
                  <a
                    href="mailto:prwebstock.com@gmail.com"
                    className="zen-contact-link"
                  >
                    prwebstock.com@gmail.com
                  </a>
                </div>
              </div>
              </div>
            </div>

            <div className="zen-social">
              <div className="zen-social-title zen-fade-in" style={{ '--zen-delay': '0.6s' }}>
                Follow PR WEBSTOCK on Social Platforms
              </div>

          <div className="zen-social-icons">
              {SOCIALS.map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="zen-social-btn zen-fade-in-scale"
                  aria-label={s.name}
                  title={s.name}
                  style={{ "--zen-delay": `${0.7 + i * 0.05}s` }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>  
            </div>
          </div>
        </div>

        <aside className={`zen-right ${animated ? 'zen-animated' : ''}`} aria-labelledby="form-heading">
          <div className="zen-form-card zen-slide-up" style={{ '--zen-delay': '0.3s' }} role="form" aria-label="Contact form">
            <h3 id="form-heading" className="zen-form-title">Got Questions? I'm Here to Help!</h3>
            <hr className="zen-sep" />

            <form onSubmit={handleSubmit} className="zen-form">
              <div className="zen-grid">
                {[
                  { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Your full name', delay: '0.1s' },
                  { label: 'Company / Organization *', name: 'company', type: 'text', placeholder: 'Company name', required: true, delay: '0.15s' },
                  { label: 'Phone *', name: 'phone', type: 'tel', placeholder: '+1 (555) 555-5555', required: true, delay: '0.2s' },
                  { label: 'Company email *', name: 'email', type: 'email', placeholder: 'you@company.com', required: true, delay: '0.25s' },
                  { label: 'Your Subject *', name: 'subject', type: 'text', placeholder: 'Short subject', required: true, full: true, delay: '0.3s' }
                ].map((field, index) => (
                  <label key={index} className={`zen-field ${field.full ? 'full' : ''} zen-fade-in`} style={{ '--zen-delay': field.delay }}>
                    <span className="zen-label">{field.label}</span>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </label>
                ))}

                <label className="zen-field full zen-fade-in" style={{ '--zen-delay': '0.35s' }}>
                  <span className="zen-label">Message *</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="6"
                    required
                  />
                </label>
              </div>

              <div className="zen-form-actions zen-fade-in" style={{ '--zen-delay': '0.4s' }}>
               <button type="submit" className="zen-submit">
                    Send Message
                    <span className="zen-submit-arrow">→</span>
                  </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactUs;
