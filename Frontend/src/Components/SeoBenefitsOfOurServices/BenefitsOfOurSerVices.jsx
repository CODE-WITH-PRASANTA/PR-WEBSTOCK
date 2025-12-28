import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./BenefitsOfOurSerVices.css";

import seoplaning from "../../assets/seo-planing.png";
import seoanalysis from "../../assets/seo-analysis.png";
import seonavigation from "../../assets/seo-navigation.png";
import seospeed from "../../assets/seo-speed.png";
import seoux from "../../assets/seo-ux.png";
import seomarketanalysis from "../../assets/seo-market-analysis.png";
import seoroi from "../../assets/seo-roi.png";
import seobrandpromotion from "../../assets/seo-brand-promotion.png";
import seoraking from "../../assets/seo-ranking.png";
import seoreasrch from "../../assets/seo-reserch.png";

gsap.registerPlugin(ScrollTrigger);

export default function BenefitsOfOurSerVices() {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  const cards = [
    {
      step: "01",
      icon: seoplaning,
      title: "SEO Planning",
      desc: "A strategic SEO strategy for your business helps us improve rankings.",
    },
    {
      step: "02",
      icon: seoanalysis,
      title: "Content Gap Analysis",
      desc: "Identifying content gaps to create relevant and useful content.",
    },
    {
      step: "03",
      icon: seonavigation,
      title: "Optimize Website Navigation",
      desc: "Optimizing navigation helps crawlers and users move through pages.",
    },
    {
      step: "04",
      icon: seospeed,
      title: "Improve Site Speed",
      desc: "Optimizing website elements to improve speed and SEO.",
    },
    {
      step: "05",
      icon: seoux,
      title: "Enhance User Experience",
      desc: "Better UX strategies to improve rankings.",
    },
    {
      step: "06",
      icon: seomarketanalysis,
      title: "Market Analysis",
      desc: "Identify audience, competitors, and opportunities.",
    },
    {
      step: "07",
      icon: seoroi,
      title: "Increased ROI",
      desc: "Optimized SEO increases visitors and ROI.",
    },
    {
      step: "08",
      icon: seobrandpromotion,
      title: "Organic Brand Promotion",
      desc: "Improve visibility with SEO strategies.",
    },
    {
      step: "09",
      icon: seoraking,
      title: "Improved Website Ranking",
      desc: "Detailed audits help rank higher.",
    },
    {
      step: "10",
      icon: seoreasrch,
      title: "Keyword Research",
      desc: "Finding high-value keywords for better reach.",
    },
  ];

  useEffect(() => {
    const panels = panelsRef.current;
    const total = panels.length;

    const ctx = gsap.context(() => {
      gsap.to(panels, {
        xPercent: -100 * (total - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: gsap.utils.snap(2 / (total - 1)), // 🔥 snap every 2 cards
            duration: 0.3,
            ease: "power1.inOut",
          },
          end: () => `+=${window.innerWidth * 0.5 * (total - 1)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (total - 1));
            panels.forEach((p, i) => p.classList.toggle("active", i === index));
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="heading">
        <h1>Benefits of Hiring Our SEO Services Company in Bangalore India</h1>
      </div>
      <section className="scroll-section" ref={containerRef}>
        <div className="scroll-wrapper">
          {cards.map((card, i) => (
            <div
              key={i}
              className="panel"
              ref={(el) => (panelsRef.current[i] = el)}
            >
              <div className="card">
                <div className="card-header">
                  <img className="icon" src={card.icon} alt={card.title} />
                  <span className="step">{card.step}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
