import React, { useState } from "react";
import "./IndustrySoftware.css";

import devImg from "../../assets/service-details-feature-img.webp";      // 1st big image
import faqImg from "../../assets/service-details-faq-img.webp";      // 2nd image

const faqData = [
  {
    q: "01. What is Task Management and how does it work?",
    a: "Task Management helps you organize, prioritize, and monitor tasks efficiently across your team or organization."
  },
  {
    q: "02. Is Zenfy suitable for my business?",
    a: "Yes, Zenfy supports small, medium, and large enterprises with flexible workflows and collaboration tools."
  },
  {
    q: "03. The system requirements using Task Management?",
    a: "Zenfy runs in all modern browsers and requires no additional server setup or special hardware."
  },
  {
    q: "04. How can I upgrade my subscription?",
    a: "You can upgrade anytime through your dashboard under Billing → Manage Subscription."
  },
  {
    q: "05. How can I upgrade my subscription?",
    a: "Upgrading can be done instantly, and your new features activate immediately."
  }
];

export default function SoftwareSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="software-wrapper">

      {/* ---------- PART 1 : SOFTWARE DEVELOPMENT ---------- */}
      <div className="software-grid">
        <div className="software-left">
          <h1 className="sw-title">
            Software <br />
            <span className="sw-highlight">Development.</span>
          </h1>

          <p className="sw-text">
            Where innovation meets passion in a journey that started with a simple idea and a
            shared dream. Founded in recent year we embarked on a mission to bring the new
            innovation and introduce the technology. From humble beginnings to our current
            aspirations, every step has been fueled by a relentless commitment.
          </p>

          <div className="sw-list-grid">
            <ul>
              <li>Custom Software</li>
              <li>Mobile Application</li>
              <li>Software Consulting</li>
            </ul>
            <ul>
              <li>Web Application</li>
              <li>Enterprise Software</li>
              <li>Maintenance and Support</li>
            </ul>
          </div>
        </div>

        <div className="software-right">
          <img src={devImg} alt="Software Development" className="sw-img" />
        </div>
      </div>

      {/* ---------- PART 2 : IMAGE + FAQ ---------- */}
      <div className="faq-grid">
        <div className="faq-left">
          <img src={faqImg} alt="Team Work" className="faq-img" />
        </div>

        <div className="faq-right">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">

              <div
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{item.q}</span>
                <span className="faq-plus">{openIndex === index ? "−" : "+"}</span>
              </div>

              <div
                className={`faq-answer ${openIndex === index ? "open" : ""}`}
              >
                {item.a}
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
