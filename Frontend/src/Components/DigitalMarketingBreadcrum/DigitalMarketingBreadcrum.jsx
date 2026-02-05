import React from 'react';
import './DigitalMarketingBreadcrum.css';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import breadcrumvideo from '../../assets/DGM BREADCRUM.mp4';

const DigitalMarketingBreadcrum = () => {
  return (
    <section className="DigitalMarketing-breadcrum" aria-label="App hero">
      <video
        className="DigitalMarketing-breadcrum__video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={breadcrumvideo} type="video/mp4" />
      </video>

      <div className="DigitalMarketing-breadcrum__overlay" />

      <div className="DigitalMarketing-breadcrum__content">
        <h1 className="DigitalMarketing-breadcrum__title">Digital Marketing Company in Bangalore</h1>

        <p className="DigitalMarketing-breadcrum__subtitle">
Increase traffic, leads, and sales with a certified, performance-first digital marketing partner.        </p>

        <a className="DigitalMarketing-breadcrum__cta" href="/contact" aria-label="Talk to our expert">
          <span className="DigitalMarketing-breadcrum__cta-text">Talk to our expert</span>

          <span className="DigitalMarketing-breadcrum__icons" aria-hidden="true">
            <FiArrowUpRight className="icon icon--initial" />
            <FiArrowRight className="icon icon--hover" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default DigitalMarketingBreadcrum;
