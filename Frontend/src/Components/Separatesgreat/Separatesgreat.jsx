import React from 'react';
import './Separatesgreat.css';
import { 
  FiSmartphone, 
  FiStar, 
  FiImage, 
  FiLayout, 
  FiFileText, 
  FiType 
} from 'react-icons/fi';
import { 
  MdPhoneIphone, 
  MdDesignServices, 
  MdPalette, 
  MdTouchApp, 
  MdArticle, 
  MdTextFields 
} from 'react-icons/md';

const cardData = [
  {
    title: 'Mobile-Friendly\nDesign',
    desc: 'At PR WEBSTOCK , we build mobile-first websites that perform smoothly across all devices. Based in Bhubaneswar and serving businesses all over India, our coding-based web design ensures fast loading, clean layouts, and a seamless browsing experience.',
    tab: 'teal',
    icon: <MdPhoneIphone />,
    iconType: 'md'
  },
  {
    title: 'Elegant\nDesign Solutions',
    desc: 'Stand out online with elegant web design solutions from PR WEBSTOCK. We create visually refined, professional websites tailored to your business goals, helping brands connect with a wider audience through the best web design in Bhubaneswar and beyond.',
    tab: 'blue',
    icon: <FiStar />,
    iconType: 'fi'
  },
  {
    title: 'Graphic\nDesign Solutions',
    desc: 'Enhance your website’s impact with creative graphic design by PR WEBSTOCK. From custom visuals to engaging infographics, we design graphics that improve user experience and support top website solutions built on clean coding.',
    tab: 'red',
    icon: <MdPalette />,
    iconType: 'md'
  },
  {
    title: 'UI/UX\nDesign',
    desc: 'Create strong first impressions with user-focused UI/UX design by PR WEBSTOCK. Based in Bhubaneswar and serving clients across India, we design intuitive interfaces that improve usability, engagement, and overall website performance through clean, coding-based web design.',
    tab: 'pink',
    icon: <MdTouchApp />,
    iconType: 'md'
  },
  {
    title: 'Attractive\nBlog Design',
    desc: 'Enhance your content experience with attractive blog design from PR WEBSTOCK. We create clean, readable, and engaging blog layouts that encourage longer reading time and support SEO-friendly web design for businesses across India.',
    tab: 'green',
    icon: <MdArticle />,
    iconType: 'md'
  },
  {
    title: 'Typography &\nReadability',
    desc: 'Good typography improves user experience and clarity. PR WEBSTOCK carefully selects fonts and layouts to ensure easy readability, visual balance, and a smooth reading experience, delivering top website solutions built with precision and clean coding.',
    tab: 'purple',
    icon: <MdTextFields />,
    iconType: 'md'
  },
];

const Separatesgreat = () => {
  return (
    <section className="Separatesgreat-container">
      <div className="Separatesgreat-inner">
        <div className="Separatesgreat-header">
          <h2 className="Separatesgreat-title">
            <span className="Separatesgreat-title-main">What separates a great</span>
            <span className="Separatesgreat-title-accent">Great Web Design from an Average One?</span>
          </h2>
          <p className="Separatesgreat-subtitle">
            Discover the key elements that elevate user experience and drive engagement
          </p>
        </div>

        <div className="Separatesgreat-cards">
          {cardData.map((c, i) => (
            <article className="Separatesgreat-card" key={i} aria-labelledby={`sg-card-${i}`}>
              {/* Premium hover background pattern */}
              <div className="Separatesgreat-card-hover-bg" aria-hidden>
                <div className="Separatesgreat-card-hover-pattern"></div>
              </div>
              
              {/* Gradient overlay on hover */}
              <div className="Separatesgreat-card-hover-gradient" aria-hidden />
              
              {/* Tab indicator */}
              <div className={`Separatesgreat-card-tab Separatesgreat-card-tab--${c.tab}`} aria-hidden />
              
              {/* Card content */}
              <div className="Separatesgreat-card-content">
                <div className="Separatesgreat-card-head">
                  <div className="Separatesgreat-card-head-inner">
                    
                    <h3 id={`sg-card-${i}`} className="Separatesgreat-card-title">
                      {c.title.split('\n').map((line, idx) => (
                        <span key={idx} className="Separatesgreat-card-title-line">
                          {line}
                          {idx < c.title.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                  </div>

                  <div className="Separatesgreat-card-icon">
                    <div className="Separatesgreat-card-icon-wrapper">
                      {c.icon}
                    </div>
                  </div>
                </div>

                <p className="Separatesgreat-card-desc">{c.desc}</p>
                
               <div className="Separatesgreat-card-footer">
                    <a
                      href="https://wa.me/917789801327?text=Hi%20PR%20WEBSTOCK!%20🚀%0A%0AI%20am%20interested%20in%20exploring%20a%20demo%20for%20your%20services.%20Please%20share%20more%20details%20about%20website%20development,%20digital%20marketing,%20and%20pricing.%20%0A%0ALooking%20forward%20to%20connecting!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="Separatesgreat-card-cta"
                    >
                      Explore Demo
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Separatesgreat;