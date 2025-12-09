import React from "react";
import "./AppDevelopmentExpect.css";

/* IMPORT YOUR SVG ICONS */
import iconUiUx from "../../assets/iimg-1.webp";
import iconPerformance from "../../assets/iimg-2.webp";
import iconCompatibility from "../../assets/iimg-3.webp";
import iconReliability from "../../assets/iimg-4.webp";
import iconSecurity from "../../assets/iimg-5.webp";
import iconCustomization from "../../assets/iimg-6.webp";

const cards = [
  {
    title: "Best UI / UX design",
    text: "We excel in UI/UX design, creating visually stunning and intuitive user interfaces that enhance user experience. Our UI and UX design strategy is user-focused.",
    accentColor: "#0f766e",
    icon: iconUiUx,
  },
  {
    title: "Performance",
    text: "Our top-notch services not only ensure exceptional quality but also guarantee high-performance apps. We employ qualified and optimized code to deliver superior results.",
    accentColor: "#f97373",
    icon: iconPerformance,
  },
  {
    title: "Compatibility",
    text: "Compatibility is a crucial aspect of mobile app development, and at Webomindapps, we ensure seamless functionality across various operating systems and mobile devices.",
    accentColor: "#fb7185",
    icon: iconCompatibility,
  },
  {
    title: "Reliability",
    text: "Webomindapps prioritizes stringent quality control and optimal performance, delivering efficient and reliable mobile applications. Our commitment to excellence minimizes maintenance and ensures a seamless user experience.",
    accentColor: "#1d4ed8",
    icon: iconReliability,
  },
  {
    title: "Security",
    text: "We recognize industry-specific security requirements and prioritize maximum protection for your mobile app. Our standardized security practices ensure comprehensive safety and 100% secure applications.",
    accentColor: "#059669",
    icon: iconSecurity,
  },
  {
    title: "Customization",
    text: "Every app demands sophisticated coding while allowing easy customization. We deliver advanced apps that can be tailored quickly for a personalized experience.",
    accentColor: "#7c3aed",
    icon: iconCustomization,
  },
];

const ExpectSection = () => {
  return (
    <section className="expect-section">
      <h2 className="expect-title">What can you expect from Webomindapps?</h2>

      <div className="expect-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="expect-card"
            style={{ "--accent": card.accentColor }}
          >
            {/* Right-side accent strip + hover overlay */}
            <div className="expect-accent" />

            <div className="expect-card-inner">
              {/* Icon */}
              <img src={card.icon} alt="" className="expect-icon-svg" />

              {/* Title */}
              <h3 className="expect-card-title">{card.title}</h3>

              {/* Description */}
              <p className="expect-card-text">{card.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpectSection;
