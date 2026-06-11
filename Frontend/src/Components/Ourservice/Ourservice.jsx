import React from "react";
import "./Ourservice.css";

// ICON IMPORTS (WEBP)
import icon1 from "../../assets/1.webp";
import icon2 from "../../assets/2.webp";
import icon3 from "../../assets/3.webp";
import icon4 from "../../assets/4.webp";
import icon5 from "../../assets/5n.webp";
import icon6 from "../../assets/6.webp";
import icon7 from "../../assets/7.webp";
import icon8 from "../../assets/8.webp";
import icon9 from "../../assets/9.webp";

export default function Ourservice() {
  const data = [
    {
      icon: icon1,
      title: "Social media strategy and planning",
      desc: "We create customized strategies that support your business objectives and deliver lasting results. At Webomindapps, we offer SMM services in Bangalore designed to help your brand grow through well-planned, cross-platform marketing efforts.",
    },
    {
      icon: icon2,
      title: "Content creation and creative design",
      desc: "From attractive visuals to engaging copy, we provide full-scale content marketing for social media that keeps your audience engaged and your brand message consistent.",
    },
    {
      icon: icon3,
      title: "Facebook & Instagram ad management",
      desc: "Our team manages end-to-end Meta ad campaigns targeting the right audience, optimizing budgets, and driving better results through strategic execution.",
    },
    {
      icon: icon4,
      title: "LinkedIn B2B campaigns",
      desc: "We help B2B brands run effective LinkedIn campaigns that build industry connections, generate qualified leads, and strengthen professional presence.",
    },
    {
      icon: icon5,
      title: "Profile optimization & branding",
      desc: "We make sure your social media profiles reflect a strong and consistent brand identity through optimized bios, cover designs, and profile imagery.",
    },
    {
      icon: icon6,
      title: "Community building & engagement",
      desc: "Engage your audience meaningfully with our support—from comment replies to interactive content, we help you grow a loyal online community.",
    },
    {
      icon: icon7,
      title: "Influencer collaboration",
      desc: "Reach a wider audience by teaming up with influencers who truly match your brand’s tone, values, and personality. These partnerships help build trust and boost visibility.",
    },
    {
      icon: icon8,
      title: "Social media analytics & monitoring",
      desc: "We use detailed performance tracking & reporting tools to monitor growth, measure engagement, and refine strategies for better ROI.",
    },
    {
      icon: icon9,
      title: "WhatsApp & Threads marketing",
      desc: "Reach your audience directly with personalized, conversational marketing campaigns on WhatsApp and Threads—great for updates, offers, and feedback.",
    },
  ];

  return (
    <section className="ss-wrapper">
      <h1 className="ss-heading">Our social media marketing services</h1>

      <div className="ss-grid">
        {data.map((item, index) => (
          <div className="ss-card" key={index}>
            <img src={item.icon} alt={item.title} className="ss-icon" />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


