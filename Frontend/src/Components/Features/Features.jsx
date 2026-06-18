import React from "react";
import "./Features.css";
import PricingBanner from "../../assets/Breadcrum.webp";

const Features = ({ onArrowClick }) => {
  return (
    <section
         className="blog-hero"
         style={{ backgroundImage: `url(${PricingBanner})` }}
       >
         <div className="blog-hero-overlay" />
   
         <div className="blog-hero-content">
           <div className="blog-breadcrumb-pill">
             
           </div>
   
           <h6 className="blog-hero-title">GET MANY MORE FEATURES </h6>
         </div>
   
         <button
           className="blog-scroll-indicator"
           type="button"
           onClick={onArrowClick}
         >
           <span className="blog-scroll-arrow">↓</span>
         </button>
       </section>
       
  );
};

export default Features;
