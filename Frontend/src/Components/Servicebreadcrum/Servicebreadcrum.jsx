import React from 'react';
import './Servicebreadcrum.css';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import breadcrumvideo from '../../assets/web-designing-breadcrumb.mp4';

const Servicebreadcrum = () => {
  return (
    <section className="Service-breadcrum" aria-label="Service hero">
      <video
        className="Service-breadcrum__video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={breadcrumvideo} type="video/mp4" />
      </video>

      <div className="Service-breadcrum__overlay" />

      <div className="Service-breadcrum__content">
        <h1 className="Service-breadcrum__title">PR WEBSTOCK – Best Web Design Company in Bhubaneswar</h1>

        <p className="Service-breadcrum__subtitle">
          At PR WEBSTOCK, we help businesses in All Over India grow with modern, fast, and result-driven web design solutions. We specialize in coding-based websites that are clean, responsive, and built for performance. Whether you’re a startup, local business, or growing company, we create websites that look professional and convert visitors into customers.
        </p>

        <a className="Service-breadcrum__cta" href="/contact" aria-label="Talk to our expert">
          <span className="Service-breadcrum__cta-text">Talk to our expert</span>

          <span className="Service-breadcrum__icons" aria-hidden="true">
            <FiArrowUpRight className="icon icon--initial" />
            <FiArrowRight className="icon icon--hover" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Servicebreadcrum;
