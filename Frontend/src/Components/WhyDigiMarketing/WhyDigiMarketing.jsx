import React from "react";
import "./WhyDigiMarketing.css";

const features = [
  {
    title: "Tailored Strategies for Every Client",
    desc: "We customize marketing plans based on your industry, goals, and audience to deliver maximum ROI.",
    icon: "📊",
  },
  {
    title: "Data-Driven Approach",
    desc: "Every decision is backed by analytics, insights, and real-time performance tracking.",
    icon: "📈",
  },
  {
    title: "Experienced Team of Experts",
    desc: "Our 12+ years of experience helps brands grow with confidence and clarity.",
    icon: "👥",
  },
  {
    title: "Transparent Communication & Reporting",
    desc: "We provide regular updates, reports, and actionable insights throughout the journey.",
    icon: "💬",
  },
  {
    title: "Focus on Client Success",
    desc: "Your growth is our priority. We go the extra mile to ensure tangible results.",
    icon: "🎯",
  },
  {
    title: "Proven Track Record",
    desc: "We’ve helped numerous brands scale with measurable and sustainable success.",
    icon: "📄",
  },
];

const WhyWebomindapps = () => {
  return (
    <section className="why-section">
      <h2 className="why-heading">
        Why is Webomindapps the Best Digital Marketing Company in Bangalore?
      </h2>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyWebomindapps;
