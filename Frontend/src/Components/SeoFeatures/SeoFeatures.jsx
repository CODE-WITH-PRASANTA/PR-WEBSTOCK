import React from "react";
import "./SeoFeatures.css";

function SeoFeatures() {
  const features = [
    {
      title: "Improved rankings",
      description:
        "We offer search engine optimization services that can help you rank higher in search results regardless of your niche.",
    },
    {
      title: "Increased sales",
      description:
        "Expand your customer reach and increase sales with innovative marketing strategies.",
    },
    {
      title: "Multiply your leads",
      description:
        "Gain exposure to potential customers actively seeking your products or services.",
    },
    {
      title: "Access to top SEO tools",
      description:
        "Accelerated results, streamlined decision-making, and optimized tactics using advanced SEO tools.",
    },
    {
      title: "Global presence",
      description:
        "Reach new customers around the world with tailored marketing campaigns.",
    },
    {
      title: "Deep expertise",
      description:
        "With a decade of experience, we help clients achieve consistent SEO success.",
    },
  ];

  return (
    <section className="seo-features">
      <h2 className="seo-features__heading">
        What Makes <span>Webomindapps</span> the Best SEO Company in Bhubaneswar?
      </h2>

      <div className="seo-features__container">
        {features.map((item, index) => (
          <div className="seo-features__card" key={index}>
            <span className="seo-features__accent"></span>
            <h3 className="seo-features__title">{item.title}</h3>
            <p className="seo-features__description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SeoFeatures;
