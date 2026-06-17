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
        <h1 className="App-breadcrum__title">
          Mobile App Development Company in Bhubaneswar, Odisha
        </h1>

        <p className="App-breadcrum__subtitle">
          PR WEBSTOCK is a trusted mobile app development company in
          Bhubaneswar, Odisha, helping startups, businesses, and enterprises
          transform their ideas into powerful mobile applications. Our team
          specializes in designing and developing custom Android, iOS, and
          cross-platform mobile apps that deliver exceptional user experiences
          and measurable business growth.
          <br /><br />
         
        </p>

        <a
          className="App-breadcrum__cta"
          href="/contact"
          aria-label="Talk to our expert"
        >
          <span className="App-breadcrum__cta-text">
            Talk to Our Expert
          </span>

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