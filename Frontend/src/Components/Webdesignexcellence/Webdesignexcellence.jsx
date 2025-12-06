import React, { useEffect, useRef, useState } from 'react';
import './Webdesignexcellence.css';

const stats = [
  { id: 'years', labelTop: 'Years of', labelBottom: 'Experience', value: 12, color: '#4F46E5' },
  { id: 'projects', labelTop: 'Projects', labelBottom: 'Delivered', value: 100, color: '#8B5CF6'},
  { id: 'countries', labelTop: 'Countries', labelBottom: 'Served', value: 25, color: '#10B981' },
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

function animateCounter(el, start, end, duration, onFinish) {
  let startTime = null;
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    const current = Math.round(start + (end - start) * eased);
    el.textContent = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      if (onFinish) onFinish();
    }
  };
  requestAnimationFrame(step);
}

const Webdesignexcellence = () => {
  const sectionRef = useRef(null);
  const countersRef = useRef({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          stats.forEach((s, i) => {
            const el = countersRef.current[s.id];
            if (el && !el.__started) {
              el.__started = true;
              setTimeout(() => {
                const duration = s.value > 500 ? 1200 : 800;
                animateCounter(el, 0, s.value, duration);
              }, i * 220);
            }
          });

          section.classList.add('Webdesignexcellence--visible');
          observer.unobserve(section);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      root: null,
      threshold: 0.15,
    });

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="Webdesignexcellence"
      ref={sectionRef}
      aria-labelledby="Webdesignexcellence-heading"
    >
      <div className="Webdesignexcellence__inner">
        {/* Left Content Section */}
        <div className="Webdesignexcellence__left">
          <div className="Webdesignexcellence__header">
            <div className="Webdesignexcellence__subtitle">TECH EXCELLENCE</div>

            <h2 id="Webdesignexcellence-heading" className="Webdesignexcellence__title">
              <span className="Webdesignexcellence__title-line">Building Digital Solutions</span>
              <span className="Webdesignexcellence__title-line Webdesignexcellence__title-accent">
                With Cutting-Edge Technology
              </span>
            </h2>

            <p className="Webdesignexcellence__description">
              We develop robust web applications and digital experiences using modern technologies,
              delivering scalable solutions that drive business growth and exceed client expectations.
            </p>
          </div>

          {/* Stats Section - Clean Circular Design */}
          <div className="Webdesignexcellence__stats">
            {stats.map((s) => (
              <div key={s.id} className="Webdesignexcellence__stat">
                <div className="Webdesignexcellence__stat-container">
                  <div
                    className="Webdesignexcellence__stat-circle"
                    style={{ '--stat-color': s.color }}
                  >
                    <div className="Webdesignexcellence__stat-circle-inner">
                      <svg className="Webdesignexcellence__progress-ring" viewBox="0 0 100 100">
                        <circle
                          className="Webdesignexcellence__progress-ring-bg"
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          strokeWidth="2"
                        />
                        <circle
                          className="Webdesignexcellence__progress-ring-fill"
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          strokeWidth="2"
                          strokeDasharray="283"
                          strokeDashoffset="283"
                        />
                      </svg>

                      <div className="Webdesignexcellence__stat-content">
                        <div
                          className="Webdesignexcellence__stat-number"
                          ref={(el) => (countersRef.current[s.id] = el)}
                          aria-live="polite"
                        >
                          0
                        </div>
                        <div className="Webdesignexcellence__stat-suffix">+</div>
                      </div>
                    </div>
                  </div>

                  <div className="Webdesignexcellence__stat-labels">
                    <div className="Webdesignexcellence__stat-top">{s.labelTop}</div>
                    <div className="Webdesignexcellence__stat-bottom">{s.labelBottom}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="Webdesignexcellence__cta">
            <button className="Webdesignexcellence__cta-button" type="button">
              <span>Explore Our Tech Stack</span>
              <svg
                className="Webdesignexcellence__cta-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className="Webdesignexcellence__trust">
              <div className="Webdesignexcellence__trust-icon">✓</div>
              <span>Trusted by tech innovators</span>
            </div>
          </div>
        </div>

        {/* Right Illustration Section */}
        <div className="Webdesignexcellence__right" aria-hidden="true">
          <div className="Webdesignexcellence__illustration-container">
            <div className="Webdesignexcellence__svg-wrapper">
              {/* Keep the long inline SVG exactly as before (unchanged visuals/animations) */}
              <svg
                className="Webdesignexcellence__illustration"
                viewBox="0 0 600 500"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-hidden="true"
              >
                {/* SVG defs and shapes (copied from your provided SVG) */}
                <defs>
                  <linearGradient id="gdBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
                  </linearGradient>

                  <linearGradient id="gdCode" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7E22CE" />
                  </linearGradient>

                  <linearGradient id="gdTech" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>

                  <filter id="wdxShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#4F46E5" floodOpacity="0.1" />
                  </filter>

                  <filter id="wdxGlow">
                    <feGaussianBlur stdDeviation="3" result="blurred" />
                    <feComposite in="SourceGraphic" in2="blurred" operator="over" />
                  </filter>

                  <pattern id="pReact" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="8" fill="none" stroke="#61DAFB" strokeWidth="2" strokeDasharray="1,3">
                      <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="20s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="20" cy="20" r="15" fill="none" stroke="#61DAFB" strokeWidth="1" opacity="0.6">
                      <animateTransform attributeName="transform" type="rotate" from="360 20 20" to="0 20 20" dur="15s" repeatCount="indefinite"/>
                    </circle>
                  </pattern>

                  <pattern id="pNode" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="15" cy="15" r="12" fill="#339933" opacity="0.1"/>
                    <path d="M15 5L20 10L15 15L10 10L15 5" fill="#339933" opacity="0.7"/>
                  </pattern>
                </defs>

                <rect x="0" y="0" width="600" height="500" fill="url(#gdBg)" rx="30" />
                <rect x="50" y="50" width="100" height="100" fill="url(#pReact)" opacity="0.1" rx="10"/>
                <rect x="450" y="350" width="80" height="80" fill="url(#pNode)" opacity="0.1" rx="10"/>

                <g filter="url(#wdxShadow)">
                  <rect x="120" y="80" width="360" height="220" rx="15" fill="#1F2937" />
                  <rect x="135" y="95" width="330" height="190" rx="8" fill="#111827" />

                  <rect x="270" y="300" width="60" height="30" fill="#374151" />
                  <rect x="280" y="330" width="40" height="20" fill="#4B5563" rx="3" />

                  <g>
                    <rect x="145" y="105" width="310" height="30" rx="5" fill="#374151" />
                    <circle cx="165" cy="120" r="5" fill="#EF4444" />
                    <circle cx="185" cy="120" r="5" fill="#F59E0B" />
                    <circle cx="205" cy="120" r="5" fill="#10B981" />

                    <g fill="#E5E7EB" fontFamily="'Monaco', 'Courier New', monospace" fontSize="12">
                      <text x="150" y="150">1</text>
                      <text x="150" y="170">2</text>
                      <text x="150" y="190">3</text>
                      <text x="150" y="210">4</text>
                      <text x="150" y="230">5</text>
                      <text x="150" y="250">6</text>

                      <text x="170" y="150" fill="#60A5FA">import</text>
                      <text x="220" y="150" fill="#FFFFFF">React</text>
                      <text x="260" y="150" fill="#60A5FA">from</text>
                      <text x="290" y="150" fill="#F87171">'react'</text>

                      <text x="170" y="170" fill="#10B981">const</text>
                      <text x="210" y="170" fill="#FBBF24">App</text>
                      <text x="240" y="170" fill="#FFFFFF">=</text>
                      <text x="255" y="170" fill="#FFFFFF">()</text>
                      <text x="270" y="170" fill="#FFFFFF">=&gt;</text>

                      <text x="185" y="190" fill="#A78BFA">return</text>
                      <text x="235" y="190" fill="#FFFFFF">(</text>

                      <text x="200" y="210" fill="#FFFFFF">&lt;</text>
                      <text x="210" y="210" fill="#34D399">div</text>
                      <text x="240" y="210" fill="#60A5FA">className</text>
                      <text x="290" y="210" fill="#F87171">="app"</text>
                      <text x="320" y="210" fill="#FFFFFF">&gt;</text>

                      <text x="200" y="230" fill="#FFFFFF">&lt;/</text>
                      <text x="210" y="230" fill="#34D399">div</text>
                      <text x="240" y="230" fill="#FFFFFF">&gt;</text>

                      <text x="185" y="250" fill="#FFFFFF">)</text>
                    </g>

                    <rect x="325" y="209" width="2" height="15" fill="#60A5FA">
                      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                    </rect>
                  </g>
                </g>

                <g>
                  <g transform="translate(400, 100)">
                    <circle cx="0" cy="0" r="20" fill="none" stroke="#61DAFB" strokeWidth="3" strokeDasharray="1,3">
                      <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#61DAFB" strokeWidth="2" opacity="0.8">
                      <animateTransform attributeName="transform" type="rotate" from="360 0 0" to="0 0 0" dur="8s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="0" cy="0" r="4" fill="#61DAFB"/>
                  </g>

                  <g transform="translate(150, 350)">
                    <rect x="-15" y="-15" width="30" height="30" rx="5" fill="#F7DF1E"/>
                    <text x="0" y="5" textAnchor="middle" fill="#000000" fontFamily="Arial" fontWeight="bold" fontSize="16">JS</text>
                    <animateTransform attributeName="transform" type="translate" values="0,0;0,-10;0,0" dur="3s" repeatCount="indefinite"/>
                  </g>

                  <g transform="translate(500, 200)">
                    <ellipse cx="0" cy="0" rx="25" ry="10" fill="#4F46E5" opacity="0.8"/>
                    <rect x="-20" y="-10" width="40" height="30" rx="5" fill="#4F46E5" opacity="0.9"/>
                    <ellipse cx="0" cy="20" rx="25" ry="10" fill="#4F46E5" opacity="0.8"/>
                    <line x1="-15" y1="-5" x2="-15" y2="15" stroke="#FFFFFF" strokeWidth="2"/>
                    <line x1="0" y1="-5" x2="0" y2="15" stroke="#FFFFFF" strokeWidth="2"/>
                    <line x1="15" y1="-5" x2="15" y2="15" stroke="#FFFFFF" strokeWidth="2"/>
                  </g>
                </g>

                <g stroke="#CBD5E1" strokeWidth="2" strokeDasharray="5,5" fill="none">
                  <path d="M300 180 Q340 200 380 180" />
                  <path d="M250 320 Q280 280 320 270" />
                  <path d="M480 220 Q520 180 550 150" />
                </g>

                <g transform="translate(80, 320)">
                  <rect x="0" y="0" width="100" height="120" rx="8" fill="#1F2937"/>
                  <rect x="10" y="15" width="80" height="15" rx="3" fill="#10B981" opacity="0.8"/>
                  <rect x="10" y="40" width="80" height="15" rx="3" fill="#8B5CF6" opacity="0.8"/>
                  <rect x="10" y="65" width="80" height="15" rx="3" fill="#F59E0B" opacity="0.8"/>
                  <rect x="10" y="90" width="80" height="15" rx="3" fill="#EF4444" opacity="0.8"/>

                  <circle cx="95" cy="22" r="3" fill="#10B981">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="95" cy="47" r="3" fill="#8B5CF6">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite"/>
                  </circle>
                </g>

                <g>
                  <circle cx="200" cy="380" r="3" fill="#4F46E5">
                    <animate attributeName="cy" from="380" to="280" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="220" cy="380" r="3" fill="#8B5CF6">
                    <animate attributeName="cy" from="380" to="280" dur="2s" begin="0.3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="240" cy="380" r="3" fill="#10B981">
                    <animate attributeName="cy" from="380" to="280" dur="2s" begin="0.6s" repeatCount="indefinite"/>
                  </circle>

                  <g transform="translate(300, 380)">
                    <path d="M-25,-5 Q-35,5 -25,15 Q-10,25 5,15 Q15,25 25,15 Q35,5 25,-5 Q15,-15 0,-15 Q-15,-15 -25,-5" 
                          fill="#E0E7FF" opacity="0.8"/>
                    <circle cx="-10" cy="0" r="2" fill="#4F46E5">
                      <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="5" cy="-3" r="2" fill="#8B5CF6">
                      <animate attributeName="r" values="2;3;2" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="15" cy="2" r="2" fill="#10B981">
                      <animate attributeName="r" values="2;3;2" dur="1.5s" begin="1s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                </g>

                <g>
                  <g transform="translate(450, 80)">
                    <path d="M-15,-15 L0,-25 L15,-15 L12,15 L0,20 L-12,15 Z" fill="#E34F26"/>
                    <text x="0" y="5" textAnchor="middle" fill="white" fontFamily="Arial" fontWeight="bold" fontSize="12">5</text>
                  </g>

                  <g transform="translate(490, 80)">
                    <path d="M-15,-15 L0,-25 L15,-15 L12,15 L0,20 L-12,15 Z" fill="#1572B6"/>
                    <text x="0" y="5" textAnchor="middle" fill="white" fontFamily="Arial" fontWeight="bold" fontSize="12">3</text>
                  </g>

                  <g transform="translate(530, 80)">
                    <rect x="-12" y="-12" width="24" height="24" rx="5" fill="#7C3AED"/>
                    <path d="M-8,-4 L0,4 L8,-4" stroke="white" strokeWidth="2" fill="none"/>
                    <path d="M-8,4 L0,-4 L8,4" stroke="white" strokeWidth="2" fill="none"/>
                  </g>
                </g>
              </svg>
            </div>

            <div className="Webdesignexcellence__stats-overlay">
              <div className="Webdesignexcellence__stats-item">
                <div className="Webdesignexcellence__stats-value">99.9%</div>
                <div className="Webdesignexcellence__stats-label">Uptime</div>
              </div>
              <div className="Webdesignexcellence__stats-item">
                <div className="Webdesignexcellence__stats-value">&lt;100ms</div>
                <div className="Webdesignexcellence__stats-label">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Webdesignexcellence;
