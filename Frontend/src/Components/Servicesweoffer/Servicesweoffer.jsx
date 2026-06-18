import React, { useState } from "react";
import {
  FiFileText,
  FiSmartphone,
  FiZap,
  FiRefreshCw,
  FiDroplet,
  FiMapPin,
  FiMonitor,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

import "./Servicesweoffer.css";

const Servicesweoffer = () => {
  const [openCard, setOpenCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "Static Web Design",
      icon: <FiFileText />,
      color: "#6C3CF0",
      description:
        "Fast and reliable static websites with clean coding and high performance.",
      extra:
        "Perfect for portfolios, company profiles, startups and business websites.",
    },
    {
      id: 2,
      title: "Responsive Web Design",
      icon: <FiSmartphone />,
      color: "#17B26A",
      description:
        "Responsive websites that adapt smoothly across mobile, tablet and desktop.",
      extra:
        "Provides seamless browsing experience and improved engagement.",
    },
    {
      id: 3,
      title: "Dynamic Web Design",
      icon: <FiZap />,
      color: "#F59E0B",
      description:
        "Dynamic websites with real-time updates and interactive functionality.",
      extra:
        "Ideal for portals, dashboards, booking systems and web applications.",
    },
    {
      id: 4,
      title: "Adaptive Web Design",
      icon: <FiRefreshCw />,
      color: "#EC4899",
      description:
        "Adaptive layouts optimized specifically for different devices.",
      extra:
        "Delivers faster performance and enhanced user experiences.",
    },
    {
      id: 5,
      title: "Liquid Web Design",
      icon: <FiDroplet />,
      color: "#06B6D4",
      description:
        "Flexible liquid layouts that scale smoothly across screens.",
      extra:
        "Content automatically adjusts proportionally for responsiveness.",
    },
    {
      id: 6,
      title: "Single Page Design",
      icon: <FiMapPin />,
      color: "#8B5CF6",
      description:
        "Modern single-page websites with smooth navigation and speed.",
      extra:
        "Perfect for portfolios, startups, landing pages and products.",
    },
    {
      id: 7,
      title: "Fixed Design",
      icon: <FiMonitor />,
      color: "#2563EB",
      description:
        "Fixed-layout websites with precise design and structure control.",
      extra:
        "Ensures pixel-perfect consistency across all user sessions.",
    },
  ];

  const toggleCard = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  return (
    <section className="Servicesweoffer">
      <div className="Servicesweoffer-container">

        <div className="Servicesweoffer-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className="Servicesweoffer-card"
              style={{ "--serviceColor": service.color }}
            >
              <div className="Servicesweoffer-cardTop">
                <div className="Servicesweoffer-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <button
                  className="Servicesweoffer-toggle"
                  onClick={() => toggleCard(service.id)}
                >
                  {openCard === service.id ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </button>
              </div>

              <p className="Servicesweoffer-description">
                {service.description}
              </p>

              <div
                className={`Servicesweoffer-expand ${
                  openCard === service.id
                    ? "Servicesweoffer-expandActive"
                    : ""
                }`}
              >
                <p>{service.extra}</p>
              </div>

              <button
                className="Servicesweoffer-expandBtn"
                onClick={() => toggleCard(service.id)}
              >
                Click to expand
                {openCard === service.id ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicesweoffer;