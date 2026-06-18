
import React from "react";
import "./SeoWorkResult.css";

import image1 from "../../assets/rec1.webp";
import image2 from "../../assets/rec2.webp";
import image3 from "../../assets/rec3.webp";
import image4 from "../../assets/rec4.webp";
import image5 from "../../assets/rec5.webp";
import image6 from "../../assets/rec6.webp";

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
        <h1>
          SEO Results Delivered by PR WEBSTOCK in Bhubaneswar, Odisha
        </h1>

        <p>
          PR WEBSTOCK helps businesses in Bhubaneswar, Odisha improve Google
          rankings, increase organic traffic, and generate quality leads.
          These results showcase the impact of our SEO strategies and our
          commitment to delivering measurable business growth.
        </p>
      </div>

      <div className="seo-work-grid">
        {images.map((item, index) => (
          <div className="img-container" key={index}>
            <img
              src={item.img}
              alt={`PR WEBSTOCK SEO Result ${index + 1} - Bhubaneswar Odisha`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SeoWorkResult;

