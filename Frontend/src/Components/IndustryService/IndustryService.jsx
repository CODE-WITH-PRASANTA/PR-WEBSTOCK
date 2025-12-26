import React from "react";
import "./IndustryService.css";

// import your exact icons here
import iconTechnical from "../../assets/Technical.webp";
import iconHelpdesk from "../../assets/help-desk.webp";
import iconManaged from "../../assets/IT-services.webp";
import iconConsulting from "../../assets/IT-consulting.webp";
import iconNetwork from "../../assets/Support.webp";

const features = [
  {
    icon: iconTechnical,
    title: "Instagram Management",
    text: 
      "PR WEBSTOCK manages your Instagram professionally with content planning, reel creation, daily posting, hashtag strategy, and audience engagement to grow your brand organically."
  },
  {
    icon: iconHelpdesk,
    title: "Facebook Page Management",
    text:
      "From creative posts to community management, PR WEBSTOCK handles your Facebook Page with result-driven strategies that boost reach, engagement, and brand visibility."
  },
  {
    icon: iconManaged,
    title: "Website Blog Management",
    text:
      "We research, write, optimize, and publish SEO-friendly blogs that help increase website ranking, improve domain authority, and bring consistent organic traffic."
  },
  {
    icon: iconConsulting,
    title: "Social Media Strategy & Consulting",
    text:
      "PR WEBSTOCK crafts a complete social media strategy including competitor analysis, content pillars, branding guidelines, and monthly growth plans for measurable results."
  },
  {
    icon: iconNetwork,
    title: "Advertising & Campaign Optimization",
    text:
      "We run and optimize Facebook & Instagram ads to maximize ROI. From audience targeting to creative testing — PR WEBSTOCK ensures every campaign performs at peak efficiency."
  }
];


export default function ServiceFeatures() {
  return (
    <section className="sf-section">
      <div className="sf-container">
        {/* LEFT SIDE */}
       <div className="sf-left">
            <div className="sf-badge">
              <span className="sf-badge-dot" />
              <span className="sf-badge-text">Social Media Management</span>
              <span className="sf-badge-dot" />
            </div>

            <h2 className="sf-title">
              Powerful SMM Services That
              <br />
              <span className="sf-title-light">Grow Your Online Presence.</span>
            </h2>

            <p className="sf-description">
              PR WEBSTOCK provides complete Social Media Management (SMM) services to help 
              businesses build a strong digital presence. We handle Instagram, Facebook,  
              website blogs, ad campaigns, content strategy, and brand identity management 
              with a professional and ROI-focused approach.
            </p>
          </div>


        {/* RIGHT SIDE */}
        <div className="sf-right">
          {features.map((item) => (
            <div className="sf-item" key={item.title}>
              <div className="sf-icon-wrap">
                <img src={item.icon} alt={item.title} className="sf-icon" />
              </div>
              <div className="sf-item-text">
                <h3 className="sf-item-title">{item.title}</h3>
                <p className="sf-item-desc">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
