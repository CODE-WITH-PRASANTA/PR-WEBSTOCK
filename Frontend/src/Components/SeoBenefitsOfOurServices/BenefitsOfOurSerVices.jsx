
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
      desc: "Custom SEO strategies for sustainable business growth.",
    },
    {
      step: "02",
      icon: seoanalysis,
      title: "Content Gap Analysis",
      desc: "Identify opportunities to improve content performance.",
    },
    {
      step: "03",
      icon: seonavigation,
      title: "Website Navigation",
      desc: "Improve user experience and search visibility.",
    },
    {
      step: "04",
      icon: seospeed,
      title: "Site Speed Optimization",
      desc: "Faster websites that rank and convert better.",
    },
    {
      step: "05",
      icon: seoux,
      title: "User Experience",
      desc: "Better engagement through optimized website journeys.",
    },
    {
      step: "06",
      icon: seomarketanalysis,
      title: "Market Analysis",
      desc: "Understand competitors and target audiences.",
    },
    {
      step: "07",
      icon: seoroi,
      title: "Higher ROI",
      desc: "Generate more leads from organic search traffic.",
    },
    {
      step: "08",
      icon: seobrandpromotion,
      title: "Brand Visibility",
      desc: "Increase online reach and brand awareness.",
    },
    {
      step: "09",
      icon: seoraking,
      title: "Better Rankings",
      desc: "Improve keyword rankings on search engines.",
    },
    {
      step: "10",
      icon: seoreasrch,
      title: "Keyword Research",
      desc: "Target valuable keywords that drive traffic.",
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
            snapTo: gsap.utils.snap(2 / (total - 1)),
            duration: 0.3,
            ease: "power1.inOut",
          },
          end: () => `+=${window.innerWidth * 0.5 * (total - 1)}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (total - 1));

            panels.forEach((panel, i) => {
              if (panel) {
                panel.classList.toggle("active", i === index);
              }
            });
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="heading">
        <h1>
          Benefits of Choosing PR WEBSTOCK SEO Services in Bhubaneswar, Odisha
        </h1>

        <p className="heading-description">
          PR WEBSTOCK helps businesses in Bhubaneswar, Odisha improve Google
          rankings, increase organic traffic, and generate quality leads
          through proven SEO strategies tailored for long-term growth.
        </p>
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
                  <img
                    className="icon"
                    src={card.icon}
                    alt={card.title}
                  />
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

