import React, { useEffect, useRef, useState } from "react";
import "./Websitedesignservices.css";

const services = [
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/palette.svg",
    title: "Custom Web Design",
    description:
      "Build a strong online presence with PR WEBSTOCK, your trusted partner for web design in Bhubaneswar.",
    bullets: [
      "Custom web design tailored to your business goals",
      "Clean coding for faster performance",
      "SEO-ready structure",
      "Scalable website solutions",
    ],
    color: "#4F46E5",
    gradient: "linear-gradient(135deg, #4F46E5 0%, #7E22CE 100%)",
    delay: 0,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/brand-wordpress.svg",
    title: "WordPress Design",
    description: "We deliver powerful WordPress websites with full customization.",
    bullets: [
      "Custom WordPress themes",
      "Mobile responsive design",
      "SEO friendly",
      "Fast loading performance",
    ],
    color: "#21759B",
    gradient: "linear-gradient(135deg, #21759B 0%, #1A5F7A 100%)",
    delay: 50,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/layout.svg",
    title: "UI/UX Design",
    description: "Clean, user-friendly interfaces for better conversions.",
    bullets: [
      "User-focused design",
      "Clean interface",
      "Easy navigation",
      "Conversion driven layout",
    ],
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    delay: 100,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/device-desktop.svg",
    title: "CMS Web Design",
    description: "Manage your website easily with CMS solutions.",
    bullets: [
      "Easy admin dashboard",
      "SEO optimized structure",
      "Simple management",
      "Scalable system",
    ],
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    delay: 150,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/target.svg",
    title: "Landing Page Design",
    description: "High converting landing pages for marketing.",
    bullets: [
      "Conversion focused",
      "Fast loading",
      "Mobile friendly",
      "Marketing integration",
    ],
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
    delay: 200,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/refresh.svg",
    title: "Website Redesign",
    description: "Modern redesign for outdated websites.",
    bullets: [
      "Modern UI upgrade",
      "Better performance",
      "Improved UX",
      "Brand refresh",
    ],
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
    delay: 250,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/apps.svg",
    title: "Web App Design",
    description: "Powerful web applications for businesses.",
    bullets: [
      "Dashboard systems",
      "API integration",
      "Modern UI",
      "Performance focused",
    ],
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    delay: 300,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/bolt.svg",
    title: "AMP Web Design",
    description: "Lightning fast mobile pages.",
    bullets: [
      "AMP setup",
      "Fast mobile loading",
      "SEO optimized",
      "Better engagement",
    ],
    color: "#F97316",
    gradient: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
    delay: 350,
  },
  {
    icon: "https://cdn.jsdelivr.net/npm/@tabler/icons@2.46.0/icons/shopping-cart.svg",
    title: "E-commerce Design",
    description: "Complete online store solutions.",
    bullets: [
      "Product pages",
      "Secure checkout",
      "Payment integration",
      "Analytics support",
    ],
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
    delay: 400,
  },
];

export default function Websitedesignservices() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  /* Pagination */
  const cardsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(services.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = services.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: sectionRef.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  /* Animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  return (
    <section className="wds" ref={sectionRef}>
      <div className="wds__container">

        <div className="wds__header">
          <h2 className="wds__heading">
            Website Design Services
            <span className="wds__heading-accent">
              by PR WEBSTOCK in Bhubaneswar
            </span>
          </h2>

          <p className="wds__subtitle">
            Transform your digital presence with our professional web design services.
          </p>
        </div>

        {/* GRID */}
        <div className="wds__grid">
          {currentCards.map((service, idx) => {
            const realIndex = indexOfFirstCard + idx;

            return (
              <article
                key={realIndex}
                ref={(el) => (cardsRef.current[realIndex] = el)}
                className="wds__card"
                style={{
                  "--delay": `${service.delay}ms`,
                  "--card-color": service.color,
                  "--card-gradient": service.gradient,
                }}
              >
                <div
                  className="wds__card-bg"
                  style={{ background: service.gradient }}
                ></div>

                <div className="wds__card-content">
                  <div
                    className="wds__card-icon-wrapper"
                    style={{ background: service.gradient }}
                  >
                    <img src={service.icon} alt="" className="wds__card-icon" />
                  </div>

                  <h3 className="wds__card-title">{service.title}</h3>
                  <p className="wds__card-description">
                    {service.description}
                  </p>

                  <ul className="wds__card-bullets">
                    {service.bullets.map((b, i) => (
                      <li key={i} className="wds__card-bullet">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="wds__pagination">
          <button
            className="wds__page-btn"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`wds__page-number ${
                currentPage === i + 1 ? "active" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="wds__page-btn"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </section>
  );
}