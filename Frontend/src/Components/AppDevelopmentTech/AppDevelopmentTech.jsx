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
      "Our team of proficient engineers stays abreast of the latest technology.",
      "We have expertise in Android and iOS development.",
      "Our qualified and creative developers deliver exceptional results.",
      "We consistently align our work with project requirements.",
      "Trust us to bring your app vision to life with brilliance and precision.",
    ],
  },
  {
    title: "Alexa Integration",
    icon: iconAlexa,
    points: [
      "Webomindapps specializes in developing Alexa integrated apps.",
      "Our skilled developers help enhance device productivity and functionality.",
      "We offer guidance through the Alexa compliance and certification process.",
      "Our team and network of partners have the expertise to help you succeed.",
      "Confide in us for intelligent Alexa integration.",
    ],
  },
  {
    title: "Chatbot Integration",
    icon: iconChatbot,
    points: [
      "Our chatbots leverage AI, ML, and NLP technologies to analyze and understand human speech.",
      "They generate appropriate responses and facilitate seamless communication between humans and computers.",
      "Automating customer interactions enhances customer engagement.",
      "Our mobile application developers specialize in developing smart chatbots.",
      "Our chatbots help businesses win customer confidence.",
    ],
  },
  {
    title: "GPS Integration",
    icon: iconGPS,
    points: [
      "Vehicle tracking solutions offer numerous advantages including enhanced productivity and better driver behavior.",
      "Customized real-time vehicle tracking solutions.",
      "Cost-effective offerings to diverse customer requirements.",
      "We build a simplified compliance management system.",
      "We develop integrated systems for your fleet management.",
    ],
  },
];

const TechnologyIntegration = () => {
  return (
    <section className="ti-section">
      <h2 className="ti-title">Technology integration in mobile application</h2>

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
