import React, { useState } from "react";
import "./Contactus.css";

import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "#",
    icon: <FaLinkedin size={20} />,
  },
  {
    name: "Facebook",
    href: "#",
    icon: <FaFacebook size={20} />,
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter size={20} />,
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram size={20} />,
  },
  {
    name: "YouTube",
    href: "#",
    icon: <FaYoutube size={20} />,
  },
  {
    name: "GitHub",
    href: "#",
    icon: <FaGithub size={20} />,
  },
];

const ContactUs = () => {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted", form);

    alert("Thanks — form submitted (demo).");

    setForm({
      fullName: "",
      company: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      className="zen-section"
      aria-labelledby="contact-heading"
    >
      <div className="zen-inner">

        {/* =========================
            LEFT CONTENT
        ========================= */}

        <div className="zen-left">
          <div className="zen-left-inner">

            <span className="zen-subtle">
              <span className="zen-subtle-icon">✦</span>

              Drop us a line

              <span className="zen-subtle-icon">✦</span>
            </span>

            <h2
              id="contact-heading"
              className="zen-title"
            >
              Connect with Us
            </h2>

            <p className="zen-desc">
              Whether you need a stunning website, powerful CRM,
              mobile app, e-commerce solution, or complete digital
              transformation — PR WEBSTOCK is here to elevate your
              brand with innovation, strategy, and meaningful digital
              experiences.
            </p>

            {/* =========================
                CONTACT DETAILS
            ========================= */}

            <div className="zen-contact-blocks">

              {/* Phone */}

              <div className="zen-contact-row">
                <div
                  className="zen-icon"
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2
                      19.86 19.86 0 0 1-8.63-3.13
                      19.5 19.5 0 0 1-6-6
                      A19.86 19.86 0 0 1 2.09 4.18
                      2 2 0 0 1 4 2h3a2 2 0 0 1 2
                      1.72c.12 1.05.37 2.07.73 3.04
                      a2 2 0 0 1-.45 2.11L8.91 10.91
                      a16 16 0 0 0 6 6l1.05-1.05
                      a2 2 0 0 1 2.11-.45
                      c.97.36 1.99.61 3.04.73
                      A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="zen-contact-text">
                  <div className="zen-contact-label">
                    General Inquiries
                  </div>

                  <div className="zen-contact-value">
                    +91 7789 801 327
                  </div>
                </div>
              </div>

              {/* Email */}

              <div className="zen-contact-row">
                <div
                  className="zen-icon"
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13
                      A2.5 2.5 0 0 0 21 15.5v-7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M21 8l-9 6-9-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="zen-contact-text">
                  <div className="zen-contact-label">
                    Email Us
                  </div>

                  <div className="zen-contact-value">
                    prwebstock.com@gmail.com
                  </div>
                </div>
              </div>

            </div>

            {/* =========================
                SOCIAL MEDIA
            ========================= */}

            <div className="zen-social">

              <div className="zen-social-title">
                Follow PR WEBSTOCK on Social Platforms
              </div>

              <div className="zen-social-icons">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="zen-social-btn"
                    aria-label={social.name}
                    title={social.name}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* =========================
            RIGHT FORM
        ========================= */}

        <aside
          className="zen-right"
          aria-labelledby="form-heading"
        >
          <div
            className="zen-form-card"
            role="form"
            aria-label="Contact form"
          >

            <h3
              id="form-heading"
              className="zen-form-title"
            >
              Got Questions? I'm Here to Help!
            </h3>

            <hr className="zen-sep" />

            <form
              onSubmit={handleSubmit}
              className="zen-form"
            >

              <div className="zen-grid">

                {/* Full Name */}

                <label className="zen-field">
                  <span className="zen-label">
                    Full Name
                  </span>

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </label>

                {/* Company */}

                <label className="zen-field">
                  <span className="zen-label">
                    Company / Organization *
                  </span>

                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    required
                  />
                </label>

                {/* Phone */}

                <label className="zen-field">
                  <span className="zen-label">
                    Phone *
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 555-5555"
                    required
                  />
                </label>

                {/* Email */}

                <label className="zen-field">
                  <span className="zen-label">
                    Company email *
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                  />
                </label>

                {/* Subject */}

                <label className="zen-field full">
                  <span className="zen-label">
                    Your Subject *
                  </span>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Short subject"
                    required
                  />
                </label>

                {/* Message */}

                <label className="zen-field full">
                  <span className="zen-label">
                    Message *
                  </span>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    required
                  />
                </label>

              </div>

              {/* Submit */}

              <div className="zen-form-actions">

                <button
                  type="submit"
                  className="zen-submit"
                >
                  Submit Now

                  <span
                    className="zen-submit-arrow"
                    aria-hidden="true"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12h14M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

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