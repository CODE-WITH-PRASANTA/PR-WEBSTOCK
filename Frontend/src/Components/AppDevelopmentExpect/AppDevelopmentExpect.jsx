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
    title: "Best UI / UX Design",
    text: "PR WEBSTOCK creates modern and user-friendly UI/UX designs that improve customer engagement and deliver seamless digital experiences. Our Bhubaneswar, Odisha team focuses on intuitive interfaces that align with your business goals.",
    accentColor: "#0f766e",
    icon: iconUiUx,
  },
  {
    title: "High Performance",
    text: "As a trusted mobile app development company in Bhubaneswar, Odisha, PR WEBSTOCK develops fast, responsive, and high-performing applications using optimized code and modern technologies.",
    accentColor: "#f97373",
    icon: iconPerformance,
  },
  {
    title: "Compatibility",
    text: "PR WEBSTOCK ensures mobile applications work seamlessly across Android, iOS, and multiple devices. Our compatibility-focused development approach helps businesses reach a wider audience.",
    accentColor: "#fb7185",
    icon: iconCompatibility,
  },
  {
    title: "Reliable Solutions",
    text: "Businesses trust PR WEBSTOCK for reliable mobile app development services. We follow proven development practices to deliver stable, scalable, and efficient applications with long-term value.",
    accentColor: "#1d4ed8",
    icon: iconReliability,
  },
  {
    title: "Advanced Security",
    text: "Security is a priority at PR WEBSTOCK. Our Bhubaneswar, Odisha development team implements industry-standard security measures to protect user data and ensure secure mobile applications.",
    accentColor: "#059669",
    icon: iconSecurity,
  },
  {
    title: "Custom Development",
    text: "Every business has unique requirements. PR WEBSTOCK delivers customized mobile app development solutions tailored to your industry, objectives, and growth strategy for maximum business impact.",
    accentColor: "#7c3aed",
    icon: iconCustomization,
  },
];


const ExpectSection = () => {
  return (
    <section className="expect-section">
    
<h2 className="expect-title">
  What Can You Expect from PR WEBSTOCK?
</h2>

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
