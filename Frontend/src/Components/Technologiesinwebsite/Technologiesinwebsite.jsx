import React, { useState, useEffect, useRef } from "react";
import { 
  FaReact, FaNodeJs, FaPhp, FaWordpress, FaMapPin 
} from "react-icons/fa";
import {
  SiJavascript, SiWoocommerce, SiNextdotjs, SiVuedotjs,
  SiAngular, SiTypescript, SiTailwindcss, SiBootstrap,
  SiHtml5, SiCss3, SiPython, SiDjango, SiLaravel,
  SiMongodb, SiMysql, SiPostgresql, SiDocker, SiGit,
  SiGooglecloud, SiFigma, SiAdobexd
} from "react-icons/si";
import './Technologiesinwebsite.css';

// All available technologies
const allTechnologies = [
  // Frontend
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e", lightColor: "#fff4c6" },
  { name: "React", Icon: FaReact, color: "#61dafb", lightColor: "#d9f7fe" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000", lightColor: "#e5e5e5" },
  { name: "Vue.js", Icon: SiVuedotjs, color: "#41b883", lightColor: "#d4f3e6" },
  { name: "Angular", Icon: SiAngular, color: "#dd0031", lightColor: "#fcd9e1" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178c6", lightColor: "#d6e6f7" },
  { name: "HTML5", Icon: SiHtml5, color: "#e34f26", lightColor: "#fcd9d1" },
  { name: "CSS3", Icon: SiCss3, color: "#1572b6", lightColor: "#d4e6f7" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38bdf8", lightColor: "#dbf2fe" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952b3", lightColor: "#e6dbf7" },
  
  // Backend
  { name: "Node.js", Icon: FaNodeJs, color: "#68a063", lightColor: "#e6f2e5" },
  { name: "Python", Icon: SiPython, color: "#3776ab", lightColor: "#d9e8f7" },
  { name: "Django", Icon: SiDjango, color: "#092e20", lightColor: "#d4e8e0" },
  { name: "PHP", Icon: FaPhp, color: "#777bb4", lightColor: "#e6e7f7" },
  { name: "Laravel", Icon: SiLaravel, color: "#ff2d20", lightColor: "#ffdedb" },
  
  // Database
  { name: "MongoDB", Icon: SiMongodb, color: "#47a248", lightColor: "#dff0df" },
  { name: "MySQL", Icon: SiMysql, color: "#4479a1", lightColor: "#d9e6f2" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791", lightColor: "#d4e2f0" },
  
  // CMS
  { name: "WordPress", Icon: FaWordpress, color: "#21759b", lightColor: "#d6e8f0" },
  { name: "WooCommerce", Icon: SiWoocommerce, color: "#96588a", lightColor: "#f0e6ed" },
  
  // DevOps
  { name: "Docker", Icon: SiDocker, color: "#2496ed", lightColor: "#d9f0fd" },
  { name: "Git", Icon: SiGit, color: "#f05032", lightColor: "#fde0db" },
  { name: "GCP", Icon: SiGooglecloud, color: "#4285f4", lightColor: "#dbe8fd" },
  
  // Design
  { name: "Figma", Icon: SiFigma, color: "#f24e1e", lightColor: "#fde0d9" },
  { name: "Adobe XD", Icon: SiAdobexd, color: "#ff61f6", lightColor: "#ffe0fc" },
];

const TechnologiesModern = () => {
  const [topRowTech, setTopRowTech] = useState(allTechnologies.slice(0, 4));
  const [bottomRowTech, setBottomRowTech] = useState(allTechnologies.slice(4, 8));
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);
  const [isCounterVisible, setIsCounterVisible] = useState(false);
  
  const animationInterval = useRef(null);
  const progressInterval = useRef(null);
  const sectionRef = useRef(null);
  const counterInterval = useRef(null);

  // Intersection Observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsCounterVisible(entry.isIntersecting);
        
        // Start counting when section becomes visible and hasn't counted yet
        if (entry.isIntersecting && !hasCounted) {
          startCountAnimation();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -100px 0px' // Slightly offset
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasCounted]);

  // Count animation function
  const startCountAnimation = () => {
    setHasCounted(true);
    setCount(0);
    
    // Clear any existing interval
    if (counterInterval.current) {
      clearInterval(counterInterval.current);
    }

    // Calculate increment for 2 second duration to reach 30
    const duration = 2000; // 2 seconds
    const steps = 30;
    const incrementTime = duration / steps;

    let currentCount = 0;
    
    counterInterval.current = setInterval(() => {
      currentCount += 1;
      setCount(currentCount);
      
      if (currentCount >= 30) {
        clearInterval(counterInterval.current);
        // Add progress bar animation after counting
        setTimeout(() => {
          const progressBar = document.querySelector('.Technologies-count-progress');
          if (progressBar) {
            progressBar.classList.add('active');
          }
        }, 100);
      }
    }, incrementTime);
  };

  // Get random unique technologies (excluding current ones)
  const getRandomTechs = (count, excludeTechs) => {
    const available = allTechnologies.filter(
      tech => !excludeTechs.some(t => t.name === tech.name)
    );
    
    const shuffled = [...available]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
    
    return shuffled;
  };

  // Rotate BOTH rows
  const rotateBothRows = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Fade out current cards
    const allCards = document.querySelectorAll('.Technologies-tech-card-modern');
    allCards.forEach(card => {
      card.classList.add('fade-out');
    });

    // After fade out, update technologies for BOTH rows
    setTimeout(() => {
      // Get current technologies to exclude
      const currentAllTechs = [...topRowTech, ...bottomRowTech];
      
      // Get new technologies for TOP row (different from current)
      const newTopRow = getRandomTechs(4, currentAllTechs);
      
      // Get new technologies for BOTTOM row (different from current AND new top row)
      const newBottomRow = getRandomTechs(4, [...currentAllTechs, ...newTopRow]);
      
      // Update both rows
      setTopRowTech(newTopRow);
      setBottomRowTech(newBottomRow);
      setProgress(0);
      
      // Start progress bar animation
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval.current);
            return 100;
          }
          return prev + 0.2; // 5 seconds to reach 100%
        });
      }, 10);
      
      // Reset animation state after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }, 600);
  };

  // Auto-rotation setup for BOTH rows
  useEffect(() => {
    if (isAutoRotating) {
      // Initial delay before first rotation
      const initialTimer = setTimeout(() => {
        rotateBothRows();
      }, 2000);

      // Set up interval for subsequent rotations
      animationInterval.current = setInterval(() => {
        if (!isAnimating) {
          rotateBothRows();
        }
      }, 7000); // 7 second total cycle (2s initial + 5s rotation)

      return () => {
        clearTimeout(initialTimer);
        if (animationInterval.current) {
          clearInterval(animationInterval.current);
        }
      };
    }
  }, [isAutoRotating, isAnimating]);

  // Manual rotation for BOTH rows
  const handleManualRotate = () => {
    if (!isAnimating) {
      rotateBothRows();
    }
  };

  // Toggle auto-rotation
  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
    setProgress(0);
    
    if (!isAutoRotating) {
      // Restart rotation
      rotateBothRows();
    } else {
      // Stop rotation
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (counterInterval.current) {
        clearInterval(counterInterval.current);
      }
    };
  }, []);

  return (
    <section className="Technologies-section-modern" ref={sectionRef}>
      <div className="Technologies-container-modern">
        <div className="Technologies-header-modern">
          <h1 className="Technologies-title-modern">
            Technologies in website design
          </h1>
          <p className="Technologies-subtitle-modern">
            Our skillful web designers possess proficiency in leveraging cutting-edge 
            technologies to deliver world-class solutions to clients. As a trusted web 
            design company in Bangalore, we are committed to using latest technologies 
            that help your website to gain a competitive advantage.
          </p>
        </div>

        <div className="Technologies-layout-modern">
          {/* LEFT SIDE - COUNTER with animation */}
          <div className="Technologies-left-modern">
            <div className="Technologies-counter-container">
              <div className="Technologies-number-container">
                {isCounterVisible ? (
                  <div className="Technologies-number-animated">
                    {count}
                    <div className="Technologies-count-progress" />
                  </div>
                ) : (
                  <div className="Technologies-number-static">
                    30+
                  </div>
                )}
              </div>
              <p className="Technologies-left-caption">
                30+ battle-tested technologies to design, build, scale and optimize 
                high-performing websites. We continuously update our tech stack 
                to stay ahead of industry trends.
              </p>
              <div className="Technologies-trusted-badge">
                <FaMapPin className="Technologies-trusted-icon" />
                <span>Trusted Web Design Company in Bangalore</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - 2x4 GRID */}
          <div className="Technologies-right-modern">
            <div className="Technologies-grid-container">
              <div className="Technologies-grid-rows">
                {/* TOP ROW - Now also rotates */}
                <div className="Technologies-row">
                  {topRowTech.map((tech, index) => (
                    <div
                      key={`top-${tech.name}-${index}`}
                      className="Technologies-tech-card-modern"
                      style={{
                        '--tech-color': tech.color,
                        '--tech-color-light': tech.lightColor,
                      }}
                    >
                      <div
                        className="Technologies-tech-icon-modern"
                        style={{ color: tech.color }}
                      >
                        {React.createElement(tech.Icon)}
                      </div>
                      <span className="Technologies-tech-name-modern">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* BOTTOM ROW - Also rotates */}
                <div className="Technologies-row">
                  {bottomRowTech.map((tech, index) => (
                    <div
                      key={`bottom-${tech.name}-${index}`}
                      className="Technologies-tech-card-modern"
                      style={{
                        '--tech-color': tech.color,
                        '--tech-color-light': tech.lightColor,
                      }}
                    >
                      <div
                        className="Technologies-tech-icon-modern"
                        style={{ color: tech.color }}
                      >
                        {React.createElement(tech.Icon)}
                      </div>
                      <span className="Technologies-tech-name-modern">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesModern;