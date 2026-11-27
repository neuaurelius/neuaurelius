"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./AccordianWall.css";

const systems = [
  {
    id: "01",
    tag: "ACTUATION RESEARCH",
    title: "Precision Actuation",
    description:
      "Exploring proprioceptive and compliant actuation concepts aimed at smooth, repeatable physical control.",
    image: "/assets/precise.png",
  },
  {
    id: "02",
    tag: "POWER ARCHITECTURE",
    title: "Efficient Energy",
    description:
      "Studying energy distribution and thermal layouts designed to support sustained operation in compact humanoid forms.",
    image: "/assets/energy.png",
  },
  {
    id: "03",
    tag: "EMBODIED INTELLIGENCE",
    title: "Adaptive Computation",
    description:
      "Formulating onboard computational models that connect perception, spatial planning, and low-level motor control.",
    image: "/assets/adaptive.png",
  },
];

const domains = [
  {
    tone: "amber",
    icon: "bx bx-buildings",
    title: "Workplace & Operations",
    description:
      "Researching general-purpose manipulation and navigation concepts intended for everyday indoor human environments.",
  },
  {
    tone: "lavender",
    icon: "bx bx-dna",
    title: "Clinical & Surgical Assistance",
    description:
      "Investigating high-precision motion and controlled-force architectures to support medical teams in structured settings.",
  },
  {
    tone: "sage",
    icon: "bx bx-compass",
    title: "Extreme & Scientific Exploration",
    description:
      "Exploring autonomous perception and resilient system designs suited for remote or hazardous field environments.",
  },
];

export default function AccordionWall() {
  const [active, setActive] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [domainsVisible, setDomainsVisible] = useState(true);

  const introRef = useRef(null);
  const domainsRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    const domainsEl = domainsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === intro && entry.isIntersecting) {
            setIntroVisible(true);
          }
          if (entry.target === domainsEl && entry.isIntersecting) {
            setDomainsVisible(true);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -4% 0px",
      }
    );

    if (intro) observer.observe(intro);
    if (domainsEl) observer.observe(domainsEl);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="systems-section" id="aboutus">
      <div
        ref={introRef}
        className={`systems-intro ${introVisible ? "is-visible" : ""}`}
      >
        <span className="systems-about-pill">ABOUT US</span>

        <h2 className="systems-statement">
          <span className="intro-line">
            At Neuaurelius, we are researching humanoid
          </span>
          <span className="intro-line">
            robotics, compliant actuation,{" "}
            <span
              className="inline-accent-chip chip-amber"
              aria-hidden="true"
            >
              <i className="bx bx-cog" />
            </span>
          </span>
          <span className="intro-line">
            and embodied{" "}
            <span
              className="inline-accent-chip chip-lavender"
              aria-hidden="true"
            >
              <i className="bx bx-chip" />
            </span>{" "}
            intelligence for workplaces,
          </span>
          <span className="intro-line">
            surgeries, and scientific exploration{" "}
            <span
              className="inline-accent-chip chip-sage"
              aria-hidden="true"
            >
              <i className="bx bx-globe" />
            </span>
          </span>
        </h2>
      </div>

      <div className="systems-wall">
        {systems.map((system, index) => {
          const expanded = active === index;

          return (
            <article
              key={system.id}
              className={`system-card ${expanded ? "expanded" : ""}`}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-expanded={expanded}
            >
              <Image
                className="system-image"
                src={system.image}
                alt={system.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index === 0}
                draggable={false}
              />

              <div className="system-shade" />

              <div className="system-top">
                <span className="system-number">{system.id}</span>
              </div>

              <div className="system-collapsed">
                <span>{system.title}</span>
              </div>

              <div className="system-info">
                <div className="system-info-inner">
                  <span className="system-tag">{system.tag}</span>
                  <h3>{system.title}</h3>
                  <p>{system.description}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div
        ref={domainsRef}
        className={`systems-beyond ${domainsVisible ? "is-visible" : ""}`}
      >
        <div className="beyond-header">
          <h3 className="beyond-title">
            ENVIRONMENTS WE ARE DESIGNING OUR BOTS TO WORK IN
          </h3>
        </div>

        <div className="domains-grid">
          {domains.map((domain, idx) => (
            <article
              key={domain.title}
              className={`domain-card domain-card--${domain.tone}`}
              style={{ "--card-delay": `${idx * 0.1}s` }}
            >
              <div className="domain-card-icon" aria-hidden="true">
                <i className={domain.icon} />
              </div>

              <div className="domain-card-body">
                <h4>{domain.title}</h4>
                <p>{domain.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
