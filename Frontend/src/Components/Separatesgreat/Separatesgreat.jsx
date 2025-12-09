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
    desc: 'Optimize the website for mobile devices. Failure to do so can result in a poor user experience, content overlapping, and dropdown issues. Mobile devices are the most commonly used for browsing the web, so ensuring you have a mobile-first website is essential.',
    tab: 'teal',
    icon: <MdPhoneIphone />,
    iconType: 'md'
  },
  {
    title: 'Elegant\nDesign Solutions',
    desc: 'Attract a wider audience with our custom, aesthetically elegant website design solutions tailored to your unique business needs.',
    tab: 'blue',
    icon: <FiStar />,
    iconType: 'fi'
  },
  {
    title: 'Graphic\nDesign Solutions',
    desc: "Our company's graphic designs are what set us apart from competitors. Our infographics deliver information effectively by adding liveliness to the content and enhancing the user experience with visually appealing graphic designs.",
    tab: 'red',
    icon: <MdPalette />,
    iconType: 'md'
  },
  {
    title: 'UI/UX\nDesign',
    desc: 'Transform first impressions into lasting ones with exceptional UX design that engages and retains your users.',
    tab: 'pink',
    icon: <MdTouchApp />,
    iconType: 'md'
  },
  {
    title: 'Attractive\nBlog Design',
    desc: 'By selecting our services, you can enhance your blog design, engage your audience, and promote longer reading sessions.',
    tab: 'green',
    icon: <MdArticle />,
    iconType: 'md'
  },
  {
    title: 'Typography &\nReadability',
    desc: 'Choosing the right fonts and ensuring optimal readability is paramount. Our selection of typography ensures a pleasant reading experience.',
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
            <span className="Separatesgreat-title-accent">web design from a mediocre one?</span>
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
                  <span className="Separatesgreat-card-cta">
                    Explore feature
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
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