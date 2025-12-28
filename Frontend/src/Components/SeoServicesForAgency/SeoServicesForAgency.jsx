import React from "react";
import onPageIcon from "../../assets/on-page-seo.png";
import offPageIcon from "../../assets/off-page-seo.png";
import technicalseo from "../../assets/tecnical-seo.png";
import localseo from "../../assets/local-seo.png";
import internationalseo from "../../assets/international-seo.png";
import ecommerceseo from "../../assets/ecommerce-seo.png";
import "./SeoServicesForAgency.css";

const services = [
  {
    title: "On-page SEO",
    icon: onPageIcon,
    points: [
      "Detailed keyword research and strategic placement",
      "Optimized title tags and meta descriptions",
      "High-quality, useful content creation",
      "SEO-friendly URLs for better indexing",
    ],
  },
  {
    title: "Off-page SEO",
    icon: offPageIcon,
    points: [
      "High-authority backlink acquisition",
      "Social media content promotion",
      "Guest posting on trusted websites",
    ],
  },
  {
    title: "Technical SEO",
    icon: technicalseo,
    points: [
      "Website crawlability improvements",
      "Page speed optimization",
      "Fixing crawl errors & broken links",
    ],
  },
  {
    title: "Local SEO",
    icon: localseo,
    points: [
      "Google Business Profile optimization",
      "Local citations & keyword targeting",
      "Improved local search visibility",
    ],
  },
  {
    title: "International SEO",
    icon: internationalseo,
    points: [
      "Target global audiences beyond India",
      "Multi-language & region-based SEO",
      "International SERP optimization",
    ],
  },
  {
    title: "E-commerce SEO",
    icon: ecommerceseo,
    points: [
      "SEO for Magento, WooCommerce, Shopify",
      "Optimized product & category pages",
      "Conversion-focused SEO strategies",
    ],
  },
];

const SeoServicesForAgency = () => {
  return (
    <section className="seo-services">

      {/* Heading */}
      <h2 className="seo-services-heading">
        Result-driven SEO services offered by SEO agency in Bhubaneswar
      </h2>

      <div className="seo-grid">
        {services.map((service, index) => (
          <div className="seo-card" key={index}>
            <img src={service.icon} alt={service.title} />
            <h3>{service.title}</h3>
            <ul>
              {service.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </section>
  );
};

export default SeoServicesForAgency;
