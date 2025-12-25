import React, { useEffect, useState } from "react";
import "./AppDevelopmentWhyChoose.css";

/* 🔁 Replace these imports with the real SVG paths you have */
import iconSupport from "../../assets/icon-5.webp";
import iconProtection from "../../assets/icon-6.webp";
import iconPerformance from "../../assets/icon-7.webp";
import iconResources from "../../assets/icon-8.webp";
import iconService from "../../assets/icon-9.webp";
import iconSolutions from "../../assets/icon-10.webp";

const CARDS_PER_PAGE = 3;

const cards = [
  {
    title: "Constant support",
    text: `Our dedicated team provides ongoing application maintenance and performance enhancements to ensure your mobile app remains up-to-date and optimized. We offer responsive improvements and feature additions for a dynamic and engaging user experience.`,
    icon: iconSupport,
  },
  {
    title: "App protection measures",
    text: `We maintain a high standard of security by implementing additional layers of protection to safeguard against hacking, malware attacks, phishing attempts, and data breaches, keeping your mobile applications safe.`,
    icon: iconProtection,
  },
  {
    title: "Performance ready approach",
    text: `Our strategic implementation analytics tools allow us to assess user interaction and make necessary improvements. We focus on optimal app loading speed and overall performance for a seamless user journey.`,
    icon: iconPerformance,
  },
  {
    title: "Highly experienced resources",
    text: `Webomindapps boasts a highly skilled engineering team that stays abreast of the latest technological advancements. Our creative developers excel in Android and iOS mobile app development, consistently delivering exceptional results.`,
    icon: iconResources,
  },
  {
    title: "Service quality & user-centricity",
    text: `We are committed to quality services, meeting client requirements through top-notch UI/UX, robust security, and precise functionality delivered within deadlines, empowering you with reliable and user-friendly mobile solutions.`,
    icon: iconService,
  },
  {
    title: "Comprehensive solutions",
    text: `Our mobile app development services cater to unique client requirements, from customized designs to advanced software development. We provide complete support, maintenance, and unmatched scalability for your business.`,
    icon: iconSolutions,
  },
];

const WhyChooseSection = () => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(id);
  }, [totalPages]);

  // Build slides (each with 3 cards)
  const slides = Array.from({ length: totalPages }, (_, pageIndex) =>
    cards.slice(
      pageIndex * CARDS_PER_PAGE,
      pageIndex * CARDS_PER_PAGE + CARDS_PER_PAGE
    )
  );

  return (
    <section className="why-section">
      <h2 className="why-title">
        Why choose Webomindapps as a mobile app development company in Bangalore?
      </h2>

      <div className="why-intro-row">
        <div className="why-intro-line" />
        <p className="why-intro-text">
          Our extensive expertise, unwavering dedication, and proven track record
          set us apart in mobile application development. With a highly skilled
          team, we deliver cutting-edge solutions tailored to your unique needs.
          Our client-centric approach ensures clear communication, timely
          delivery, and utmost customer satisfaction. Trust us to bring your
          mobile app vision to life.
        </p>
      </div>

      {/* Cards slider */}
      <div className="why-cards-shell">
        <div
          className="why-slider"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {slides.map((slideCards, idx) => (
            <div className="why-slide" key={idx}>
              {slideCards.map((card) => (
                <div className="why-card" key={card.title}>
                  <img src={card.icon} alt="" className="why-icon" />
                  <h3 className="why-card-title">{card.title}</h3>
                  <p className="why-card-text">{card.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots pagination */}
      <div className="why-dots">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`why-dot ${idx === page ? "active" : ""}`}
            onClick={() => setPage(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;
