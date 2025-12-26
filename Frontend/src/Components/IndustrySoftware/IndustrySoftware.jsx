import React, { useState } from "react";
import "./IndustrySoftware.css";

import devImg from "../../assets/service-details-feature-img.webp";      // 1st big image
import faqImg from "../../assets/service-details-faq-img.webp";      // 2nd image

const faqData = [
  {
    q: "01. How long does PR Webstock take to develop custom software?",
    a: "Development time depends on project complexity. Smaller software takes 2–4 weeks, while advanced applications may take 1–3 months. We always share timelines clearly before starting."
  },
  {
    q: "02. Do you provide hosting, domain, and maintenance?",
    a: "Yes! PR Webstock provides free hosting & domain setup support, along with long-term software maintenance and technical support."
  },
  {
    q: "03. Will my software or app work on all devices?",
    a: "Absolutely. We build fully responsive and mobile-friendly software that works across all devices including mobile, tablet, and desktop."
  },
  {
    q: "04. Can you integrate payment gateways or third-party APIs?",
    a: "Yes. We integrate Razorpay, Stripe, PhonePe, Paytm, Google APIs, and any custom third-party API required for your business."
  },
  {
    q: "05. Is my data secure with PR Webstock?",
    a: "Yes, we follow enterprise-level security practices including encrypted data handling, secure authentication, and safe API communication."
  },
  {
  q: "06. Can PR Webstock customize software according to my business needs?",
  a: "Yes! Every software we build is fully customized based on your workflow, goals, and requirements. We don’t use generic templates — everything is designed to match your exact business process."
  },
  {
    q: "07. Will I be able to manage my software without technical knowledge?",
    a: "Definitely! We design simple, user-friendly dashboards so you can manage everything easily without coding skills. We also provide training and video tutorials for your team."
  },
  {
    q: "08. Do you provide updates or new feature additions in the future?",
    a: "Yes, PR Webstock offers continuous upgrades, new modules, and feature expansions as your business grows. You can request new features anytime, and our team will handle the enhancement smoothly."
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
           Our Software <br />
            <span className="sw-highlight">Development Work</span>

          </h1>

         <p className="sw-text">
            At PR Webstock, we build high-performance software solutions designed to help 
            businesses scale faster and work smarter. Our development process focuses on 
            custom design, clean architecture, and seamless user experience—ensuring every 
            project meets industry standards and delivers measurable results. Whether you 
            need a custom software application, mobile app, enterprise-level system, or 
            API-based automation, we deliver solutions that are secure, scalable, and 
            fully optimized for your business needs.
          </p>


         <div className="sw-list-grid">
            <ul>
              <li>Custom Software Development</li>
              <li>Mobile App Development (Android & iOS)</li>
              <li>Responsive Web Applications</li>
              <li>API Integration & Automation</li>
            </ul>

            <ul>
              <li>Payment Gateway Integration</li>
              <li>Free Domain & Hosting Setup Support</li>
              <li>Enterprise-Level Security</li>
              <li>Maintenance & Long-Term Support</li>
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
