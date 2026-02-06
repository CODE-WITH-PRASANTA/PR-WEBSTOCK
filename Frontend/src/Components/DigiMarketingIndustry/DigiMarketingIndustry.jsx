import React, { useEffect, useRef, useState } from "react";
import "./DigiMarketingIndustry.css";

// images
import healthcareImg from "../../assets/Health-IndustryDm.webp";
import ecommerceImg from "../../assets/E-commerce-IndustryDM.webp";
import techImg from "../../assets/Technology-IndustryDM.webp";
import travelImg from "../../assets/Travel-and-Hospitality-IndustryDM.webp";
import realEstateImg from "../../assets/Real-Estate-IndustryDM.webp";
import financeImg from "../../assets/Financial-Services-IndustryDM.webp";
import manufacturingImg from "../../assets/Manufacturing-IndustryDM.webp";

const industries = [
  {
    title: "Healthcare industry",
    desc: "We help hospitals, clinics, and healthcare brands attract more patients with SEO, paid ads, and reputation management while ensuring compliance.",
    image: healthcareImg,
  },
  {
    title: "E-commerce industry",
    desc: "From product ads to high-converting landing pages, we optimize your store for more traffic, better sales, and repeat customers.",
    image: ecommerceImg,
  },
  {
    title: "Technology industry",
    desc: "We position tech brands as industry leaders with thought leadership content, SEO, PPC, and LinkedIn marketing to generate high-quality B2B leads.",
    image: techImg,
  },
  {
    title: "Travel and hospitality industry",
    desc: "We boost bookings with engaging social media campaigns, influencer partnerships, and hyper-targeted ads that bring more travellers to your business.",
    image: travelImg,
  },
  {
    title: "Real estate industry",
    desc: "We generate high-intent buyer and seller leads with location-based SEO, targeted PPC campaigns, and immersive virtual tour marketing.",
    image: realEstateImg,
  },
  {
    title: "Financial services industry",
    desc: "We build trust and authority for banks, fintech, and financial advisors with compliance-friendly digital marketing strategies.",
    image: financeImg,
  },
  {
    title: "Manufacturing industry",
    desc: "We help B2B manufacturers reach decision-makers through LinkedIn marketing, SEO-driven content, and lead nurturing strategies.",
    image: manufacturingImg,
  },
];

const IndustrySolutions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsRef = useRef([]);

  // AUTO IMAGE CHANGE ON SCROLL
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="industry-section">
      <h2 className="industry-heading">
        Our industry specific ROI based digital marketing solution
      </h2>

      <div className="industry-container">
        {/* LEFT IMAGE */}
        <div className="industry-image">
          <img
            key={activeIndex}
            src={industries[activeIndex].image}
            alt={industries[activeIndex].title}
          />
          <span className="image-strip"></span>
        </div>

        {/* RIGHT DOMAIN LIST */}
        <div className="industry-list">
          {industries.map((item, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`industry-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
