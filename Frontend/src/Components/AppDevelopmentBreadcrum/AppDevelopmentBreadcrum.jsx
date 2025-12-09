import React from 'react';
import './AppDevelopmentBreadcrum.css';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import breadcrumvideo from '../../assets/mobile-application-banner.mp4';

const Appbreadcrum = () => {
  return (
    <section className="App-breadcrum" aria-label="App hero">
      <video
        className="App-breadcrum__video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={breadcrumvideo} type="video/mp4" />
      </video>

      <div className="App-breadcrum__overlay" />

      <div className="App-breadcrum__content">
        <h1 className="App-breadcrum__title">Reliable mobile app development company in Bangalore to build custom apps</h1>

        <p className="App-breadcrum__subtitle">
          Unleash your digital impact through our mobile app development expertise. We empower businesses across industries with cutting-edge UI/UX designs, IoT, and AI, crafting dynamic app solutions for diverse challenges.
        </p>

        <a className="App-breadcrum__cta" href="/contact" aria-label="Talk to our expert">
          <span className="App-breadcrum__cta-text">Talk to our expert</span>

          <span className="App-breadcrum__icons" aria-hidden="true">
            <FiArrowUpRight className="icon icon--initial" />
            <FiArrowRight className="icon icon--hover" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Appbreadcrum;
