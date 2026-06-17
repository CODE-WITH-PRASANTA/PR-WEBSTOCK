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
    title: "Dedicated Support",
    text: "PR WEBSTOCK provides continuous support and maintenance services to ensure your mobile application remains secure, updated, and optimized for long-term success.",
    icon: iconSupport,
  },
  {
    title: "Advanced Security",
    text: "Our Bhubaneswar, Odisha development team follows industry-standard security practices to protect applications from cyber threats, unauthorized access, and data breaches.",
    icon: iconProtection,
  },
  {
    title: "High Performance Apps",
    text: "PR WEBSTOCK develops fast, responsive, and scalable mobile applications designed to deliver outstanding user experiences across Android and iOS platforms.",
    icon: iconPerformance,
  },
  {
    title: "Experienced Development Team",
    text: "Our skilled developers specialize in Android app development, iOS app development, and cross-platform solutions, delivering reliable results for businesses of all sizes.",
    icon: iconResources,
  },
  {
    title: "Quality & User Experience",
    text: "At PR WEBSTOCK, we focus on intuitive UI/UX design, robust functionality, and seamless user experiences that help businesses improve customer engagement and retention.",
    icon: iconService,
  },
  {
    title: "Complete Mobile App Solutions",
    text: "Based in Bhubaneswar, Odisha, PR WEBSTOCK offers end-to-end mobile app development services, including strategy, design, development, testing, deployment, and ongoing support.",
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
      Why Choose PR WEBSTOCK for Mobile App Development?
    </h2>

      <div className="why-intro-row">
        <div className="why-intro-line" />
      
      <p className="why-intro-text">
         PR WEBSTOCK is a trusted mobile app development company in Bhubaneswar,
         Odisha, delivering innovative Android, iOS, and cross-platform applications
         for startups, businesses, and enterprises. Our experienced team combines
         modern technologies, creative design, and proven development practices to
         build scalable, secure, and high-performing mobile applications. From
         consultation and development to deployment and ongoing support, PR WEBSTOCK
          is committed to delivering reliable digital solutions that help businesses
         grow in today's competitive market.
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
