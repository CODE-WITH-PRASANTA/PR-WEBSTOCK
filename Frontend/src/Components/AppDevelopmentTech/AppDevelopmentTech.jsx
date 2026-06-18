import React from "react";
import "./AppDevelopmentTech.css";

/* IMPORT YOUR ORIGINAL SVG ICONS */
import iconIoT from "../../assets/icon-1.webp";
import iconAlexa from "../../assets/icon-2.webp";
import iconChatbot from "../../assets/icon-3.webp";
import iconGPS from "../../assets/icon-4.webp";

const techBlocks = [
  {
    title: "IoT Solutions Integration",
    icon: iconIoT,
    points: [
      "PR WEBSTOCK develops IoT-enabled mobile applications for smart and connected business solutions.",
      "Our Bhubaneswar, Odisha development team integrates modern IoT technologies for real-time data monitoring.",
      "We build scalable Android and iOS applications with advanced IoT capabilities.",
      "Our solutions improve automation, operational efficiency, and user experience.",
      "Businesses trust PR WEBSTOCK for reliable IoT application development services.",
    ],
  },
  {
    title: "Alexa Integration",
    icon: iconAlexa,
    points: [
      "PR WEBSTOCK offers seamless Alexa integration for mobile and smart device applications.",
      "Our developers create voice-enabled solutions that improve accessibility and user engagement.",
      "We help businesses implement intelligent voice assistant functionality.",
      "Our Bhubaneswar, Odisha team follows industry best practices for Alexa development.",
      "Deliver smarter customer experiences through advanced voice technology integration.",
    ],
  },
  {
    title: "Chatbot Integration",
    icon: iconChatbot,
    points: [
      "PR WEBSTOCK develops AI-powered chatbots for websites and mobile applications.",
      "Our chatbot solutions use Artificial Intelligence and Natural Language Processing technologies.",
      "Automate customer support and improve user engagement with intelligent conversations.",
      "We create custom chatbot solutions tailored to business requirements.",
      "Our Bhubaneswar, Odisha team helps businesses provide faster and smarter customer support.",
    ],
  },
  {
    title: "GPS Integration",
    icon: iconGPS,
    points: [
      "PR WEBSTOCK provides GPS-enabled mobile application development for location-based services.",
      "Real-time tracking solutions help businesses improve operational efficiency and customer satisfaction.",
      "Our custom GPS integrations support logistics, transportation, and fleet management systems.",
      "We develop secure and scalable location tracking solutions for Android and iOS applications.",
      "Based in Bhubaneswar, Odisha, we deliver reliable GPS-powered mobile app solutions.",
    ],
  },
];


const TechnologyIntegration = () => {
  return (
    <section className="ti-section">

    <h2 className="ti-title">
      Advanced Technology Integration in Mobile Applications
    </h2>

      <div className="ti-grid">
        {techBlocks.map((block, index) => (
          <div
            key={block.title}
            className={`ti-cell 
              ${index % 2 === 0 ? "ti-cell-left" : "ti-cell-right"} 
              ${index < 2 ? "ti-cell-top" : "ti-cell-bottom"}
            `}
          >
            <div className="ti-cell-header">
              <img src={block.icon} alt="" className="ti-icon-img" />
              <h3 className="ti-heading">{block.title}</h3>
            </div>

            <ul className="ti-list">
              {block.points.map((point) => (
                <li key={point} className="ti-list-item">
                  <span className="ti-arrow">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnologyIntegration;
