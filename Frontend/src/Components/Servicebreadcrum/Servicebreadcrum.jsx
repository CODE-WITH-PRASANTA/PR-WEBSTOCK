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
        <h1 className="Service-breadcrum__title">Web Design Company in Bangalore</h1>

        <p className="Service-breadcrum__subtitle">
          Your website is your brand’s first impression. As the best web design company in
          Bangalore, with over 12+ years of experience, Webomindapps has delivered 2000+ projects
          and served clients in 25+ countries. We combine speed, security, and design to create an
          online space that truly stands out.
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
