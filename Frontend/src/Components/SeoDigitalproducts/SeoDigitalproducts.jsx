import React from "react";
import "./SeoDigitalproducts.css";
import img1 from "../../assets/digitalProductImages/img1.svg"
import img2 from "../../assets/digitalProductImages/img2.svg"
import img3 from "../../assets/digitalProductImages/img3.svg"
import img4 from "../../assets/digitalProductImages/img4.svg"
import img5 from "../../assets/digitalProductImages/img5.svg"
import img6 from "../../assets/digitalProductImages/img6.svg"
import img7 from "../../assets/digitalProductImages/img7.svg"
import img8 from "../../assets/digitalProductImages/img8.svg"
import img9 from "../../assets/digitalProductImages/img9.svg"

const SeoDigitalproducts = () => {
  const cards = [
    {
      title: "Keyword Optimization",
        icon: img1,
       hoverColor: "#ef2f2f",
      points: [
        "Thoroughly research keywords that your target audience uses.",
        "Optimize your website and product descriptions with those keywords.",
        "Get prominent positions in search results and bring more organic traffic.",
      ],
    },
    {
      title: "Product Descriptions",
        icon: img2,
      hoverColor:"#003d4f",
      points: [
        "Create engaging and informative product descriptions.",
        "Highlight the unique features and benefits of your digital products.",
        "Make customers interested in exploring further and making a purchase.",
      ],
    },
    {
      title: "Technical Perfection",
      icon: img3, 
    hoverColor:"#f64a68",
      points: [
        "Improve your website's technical aspects such as speed, security.",
        "Ensure seamless performance across devices and browsers.",
        "Enhance overall user experience with clean architecture and optimized loading.",
        "Boost search engine rankings while gaining customer trust and engagement.",
      ],
    },
    {
      title: "Social Validation & Testimonials",
      icon: img4,
    hoverColor:"#1f3e7b",
      points: [
        "Include authentic customer reviews and testimonials in product presentations.",
        "Showcase real-world satisfaction to influence buying decisions.",
        "Build trust and confidence through social proof.",
        "Increase conversions by reassuring potential customers.",
      ],
    },
    {
      title: "Inspiring Video Experiences",
      icon: img5,
    hoverColor:"#1a7d55",
      points: [
        "Produce appealing videos showcasing product features and use cases.",
        "Demonstrate real-world applications of your digital products.",
        "Help customers visualize value and functionality.",
        "Drive sales through immersive and engaging video experiences.",
      ],
    },
    {
      title: "Enhanced Visibility",
      icon: img6,
    hoverColor:"#6836b3",
      points: [
        "Improve product visibility through higher search rankings.",
        "Increase exposure across relevant digital channels.",
        "Make your brand more recognizable and discoverable.",
        "Reach potential buyers actively searching for similar solutions.",
      ],
    },
    {
      title: "Targeted Conversion Funnel",
      icon: img7,
    hoverColor:"#f47d35",
      points: [
        "Align SEO strategy with customer intent and behavior.",
        "Attract highly relevant organic traffic to product pages.",
        "Guide visitors smoothly through the conversion journey.",
        "Increase the likelihood of turning visitors into paying customers.",
      ],
    },
    {
      title: "Trust and Authority",
      icon: img8,
    hoverColor:"#a030b5",
      points: [
        "Achieve top rankings to establish brand credibility.",
        "Position your business as an industry authority.",
        "Build long-term trust with potential buyers.",
        "Encourage confident purchasing decisions.",
      ],
    },
    {
      title: "Competitive Edge",
      icon: img9,
    hoverColor:"#2893bd",
      points: [
        "Use strategic SEO tactics to outperform competitors.",
        "Identify gaps and opportunities in the market.",
        "Stand out in crowded online marketplaces.",
        "Gain a dominant and sustainable competitive position.",
      ],
    },
  ];

  return (
    <section className="feature-cards-section">
    <div className="heading">
      <h1>The potential of SEO in digital products sale</h1>
      <p>SEO for digital product online sales involves optimizing your website and content for higher rankings in search engine results. Being one of the leading SEO agencies in Bangalore, Webomindapps aids clients by using keywords in titles, meta descriptions, and content, and building quality backlinks to improve SEO. We help digital product sellers succeed with smart strategies.</p>
    </div>
      <div className="feature-cards-grid">
        {cards.map((card, i) => (
          <div className="feature-card" key={i} style={{ "--hover-color": card.hoverColor }}>
            <div className="feature-card-header">
              <h3>{card.title}</h3>
              <img src={card.icon} alt={card.title} />
            </div>

            <ul>
              {card.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>

            <div className="color-box"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeoDigitalproducts;
