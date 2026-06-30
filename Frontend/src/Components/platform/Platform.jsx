import React from "react";
import "./Platform.css";

// Import Image
import sideImage from "../../assets/socialmedia.jpeg";

export default function Platform() {
 const items = [
  {
    no: "01",
    title: "Facebook Marketing & Advertising",
    desc: "PR WEBSTOCK helps businesses in Bhubaneswar reach targeted customers through strategic Facebook marketing, audience engagement, and high-performing ad campaigns."
  },
  {
    no: "02",
    title: "Instagram Growth & Brand Building",
    desc: "We create engaging Instagram content, Reels, Stories, and promotional campaigns that increase visibility, engagement, and brand awareness."
  },
  {
    no: "03",
    title: "LinkedIn Marketing Solutions",
    desc: "Strengthen your professional presence and generate quality business leads through customized LinkedIn marketing strategies."
  },
  {
    no: "04",
    title: "X (Twitter) Engagement Strategy",
    desc: "Stay connected with your audience through trend-focused content, conversations, and real-time engagement on X."
  },
  {
    no: "05",
    title: "YouTube Shorts Marketing",
    desc: "Increase reach and audience engagement with creative YouTube Shorts designed to showcase your products and services effectively."
  },
  {
    no: "06",
    title: "WhatsApp Business Marketing",
    desc: "Build direct customer relationships through personalized WhatsApp campaigns, updates, promotions, and customer support."
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
