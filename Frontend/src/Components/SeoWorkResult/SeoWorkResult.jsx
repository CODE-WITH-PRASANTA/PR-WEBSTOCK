import React from "react";
import "./SeoWorkResult.css";

import image1 from "../../assets/workResultImage/rec1.webp";
import image2 from "../../assets/workResultImage/rec2.webp";
import image3 from "../../assets/workResultImage/rec3.webp";
import image4 from "../../assets/workResultImage/rec4.webp";
import image5 from "../../assets/workResultImage/rec5.webp";
import image6 from "../../assets/workResultImage/rec6.webp";

const images = [
  { img: image1 },
  { img: image2 },
  { img: image3 },
  { img: image4 },
  { img: image5 },
  { img: image6 },
];

const SeoWorkResult = () => {
  return (
    <section className="seo-work-section">
      <div className="seo-work-header">
        <h1>Our SEO Work Results</h1>
        <p>
          We believe in delivering top-notch SEO services and demonstrate our
          success through real results. Here are a few glimpses of the outcomes
          we’ve achieved for our clients.
        </p>
      </div>

      <div className="seo-work-grid">
        {images.map((item, index) => (
          <div className="img-container" key={index}>
            <img src={item.img} alt={`SEO work result ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeoWorkResult;
