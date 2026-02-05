import React from "react";
import "./BusinessesChoose.css";

const BusinessesChoose = () => {
  const items = [
    {
      icon: "/assets/icons/roi.svg",
      title: "3X ROI in 90 Days (avg.)",
      desc:
        "We focus on strategies that deliver quick, measurable results. Our performance marketing approach has helped businesses consistently achieve up to 3X ROI within just 90 days, making sure your investment turns into growth fast.",
    },
    {
      icon: "/assets/icons/industry.svg",
      title: "Compete with Industry Leaders",
      desc:
        "With smart planning and the right tools, we help your business grow and compete with the leading brands in your industry whether you're just starting out or scaling up. Our proven strategies make sure you stand out in competitive markets.",
    },
    {
      icon: "/assets/icons/visibility.svg",
      title: "Scale Brand Visibility Locally and Globally",
      desc:
        "From hyper-local SEO to international campaigns, we expand your reach where it matters. We design strategies that strengthen your presence in Bangalore while opening up new markets beyond your current boundaries.",
    },
    {
      icon: "/assets/icons/conversion.svg",
      title: "Convert More Visitors into Buyers",
      desc:
        "We help your business grow by converting online visitors into paying customers. Through CRO, targeted content, and UX enhancements, we reduce drop-offs and guide more users toward taking action whether that means purchases, signups, or lead generation.",
    },
    {
      icon: "/assets/icons/team.svg",
      title: "Dedicated Strategy and Execution Team",
      desc:
        "As a trusted digital marketing company in Bangalore, we offer you a full-service team dedicated to your growth—from concept development and planning to smooth execution and ongoing performance optimization.",
    },
  ];

  return (
    <section className="why-section">
      <h2 className="why-title">Why Bangalore Businesses Choose Webomindapps</h2>

      <div className="why-grid">
        {items.map((item, index) => (
          <div className="why-card" key={index}>
            <img src={item.icon} alt="icon" className="why-icon" />
            <h3 className="why-card-title">{item.title}</h3>
            <p className="why-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessesChoose;




