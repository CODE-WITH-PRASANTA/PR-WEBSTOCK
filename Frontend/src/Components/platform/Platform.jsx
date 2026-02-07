import React from "react";
import "./Platform.css";

// Import Image
import sideImage from "../../assets/ai-agent-industry.webp";

export default function Platform() {
  const items = [
    {
      no: "01",
      title: "Facebook ads & page management",
      desc: "As a certified Facebook ad expert, we create and manage targeted ad campaigns, increase post visibility, and enhance your business page for consistent performance and audience interaction."
    },
    {
      no: "02",
      title: "Instagram reels, stories, and shopping",
      desc: "We help you grow your brand using high-performing Reels, Stories, and product tagging features—combining creativity with analytics to increase reach and boost sales."
    },
    {
      no: "03",
      title: "LinkedIn B2B campaigns",
      desc: "We craft powerful LinkedIn content focused on leadership, lead generation, and professional engagement for B2B brands aiming to connect with decision-makers."
    },
    {
      no: "04",
      title: "Twitter (X) trends & engagement",
      desc: "We help you stay active and relevant by tapping into real-time trends, conversations, and hashtags—boosting visibility on X."
    },
    {
      no: "05",
      title: "YouTube shorts strategy",
      desc: "We help create sharp, engaging short-form content aligned with your brand's voice and goals to grow your video presence."
    },
    {
      no: "06",
      title: "WhatsApp business broadcast campaigns",
      desc: "We create customized message campaigns for WhatsApp Business—helping you communicate fast and personally with your audience."
    }
  ];

  return (
    <section className="platform-wrapper">
      {/* LEFT CONTENT */}
      <div className="platform-left">
        <h1 className="platform-title">
          Platform-specific expertise <br /> that drives results
        </h1>

        <div className="platform-list">
          {items.map((item, index) => (
            <div className="platform-item" key={index}>
              <h2 className="platform-number">{item.no}</h2>
              <div className="platform-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="platform-right">
        <img src={sideImage} alt="AI Industry" />
      </div>
    </section>
  );
}
