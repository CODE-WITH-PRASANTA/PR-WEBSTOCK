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
    title: "On-Page SEO",
    icon: onPageIcon,
    points: [
      "Keyword optimization",
      "Meta tags & content SEO",
      "SEO-friendly website structure",
      "Improved page relevance",
    ],
  },
  {
    title: "Off-Page SEO",
    icon: offPageIcon,
    points: [
      "Quality backlink building",
      "Brand promotion",
      "Authority growth",
    ],
  },
  {
    title: "Technical SEO",
    icon: technicalseo,
    points: [
      "Faster website speed",
      "Crawlability improvements",
      "Fix SEO technical issues",
    ],
  },
  {
    title: "Local SEO",
    icon: localseo,
    points: [
      "Google Business Profile optimization",
      "Local keyword targeting",
      "Better local visibility",
    ],
  },
  {
    title: "International SEO",
    icon: internationalseo,
    points: [
      "Global audience targeting",
      "Multi-region SEO",
      "International search visibility",
    ],
  },
  {
    title: "E-commerce SEO",
    icon: ecommerceseo,
    points: [
      "Product page optimization",
      "Category page SEO",
      "Higher online sales",
    ],
  },
];

const SeoServicesForAgency = () => {
  return (
    <section className="seo-services">
      <h2 className="seo-services-heading">
        SEO Services by PR WEBSTOCK in Bhubaneswar, Odisha
      </h2>

      <p className="seo-services-description">
        <span>PR WEBSTOCK</span> provides professional SEO services in{" "}
        <span>Bhubaneswar, Odisha</span>, helping businesses improve Google
        rankings, increase organic traffic, and generate quality leads. Our SEO
        experts deliver customized strategies designed for long-term online
        growth.
      </p>

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