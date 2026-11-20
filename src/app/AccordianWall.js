"use client";

import { useEffect, useRef, useState } from "react";
import "./AccordianWall.css";

const systems = [
    {
        id: "01",
        tag: "ACTUATION RESEARCH",
        title: "Precision Actuation",
        description:
            "Exploring proprioceptive and compliant actuation concepts aimed at smooth, repeatable physical control.",
        image:
            "./assets/precise.png",
    },
    {
        id: "02",
        tag: "POWER ARCHITECTURE",
        title: "Efficient Energy",
        description:
            "Studying energy distribution and thermal layouts designed to support sustained operation in compact humanoid forms.",
        image:
            "./assets/energy.png",
    },
    {
        id: "03",
        tag: "EMBODIED INTELLIGENCE",
        title: "Adaptive Computation",
        description:
            "Formulating onboard computational models that connect perception, spatial planning, and low-level motor control.",
        image:
            "./assets/adaptive.png",
    }
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

function AccordionSkeleton() {
    return (
        <section className="systems-section systems-loading">
            <div className="systems-intro systems-intro-skeleton">
                <div className="skeleton-line skeleton-intro-pill" />
                <div className="skeleton-line skeleton-intro-line skeleton-intro-large" />
                <div className="skeleton-line skeleton-intro-line skeleton-intro-medium" />
                <div className="skeleton-line skeleton-intro-line skeleton-intro-small" />
            </div>

            <div className="systems-wall systems-wall-skeleton">
                {systems.map((system, index) => (
                    <article
                        key={system.id}
                        className={`system-card system-card-skeleton ${
                            index === 0 ? "expanded" : ""
                        }`}
                    >
                        <div className="system-skeleton-image" />
                        <div className="system-skeleton-shade" />

                        <div className="system-skeleton-title">
                            <span className="skeleton-line skeleton-title-line" />
                        </div>

                        {index === 0 && (
                            <div className="system-skeleton-info">
                                <span className="skeleton-line skeleton-info-title" />
                                <span className="skeleton-line skeleton-info-text" />
                                <span className="skeleton-line skeleton-info-text skeleton-info-text-two" />
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}

export default function AccordionWall() {
    const [active, setActive] = useState(0);
    const [introVisible, setIntroVisible] = useState(false);
    const [domainsVisible, setDomainsVisible] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const introRef = useRef(null);
    const domainsRef = useRef(null);
    const imageRefs = useRef([]);

    useEffect(() => {
        let cancelled = false;

        const preloadImages = async () => {
            const images = systems.map((system, index) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.decoding = "async";
                    img.fetchPriority = index === 0 ? "high" : "low";

                    img.onload = async () => {
                        try {
                            await img.decode();
                        } catch {
                            // Safe fallback if decode() rejects
                        }
                        resolve();
                    };

                    img.onerror = () => resolve();
                    img.src = system.image;
                    imageRefs.current[index] = img;
                });
            });

            await Promise.race([
                Promise.all(images),
                new Promise((resolve) => setTimeout(resolve, 900)),
            ]);

            if (!cancelled) {
                setLoaded(true);
            }
        };

        preloadImages();

        return () => {
            cancelled = true;
        };
    }, []);

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
    }, [loaded]);

    if (!loaded) {
        return <AccordionSkeleton />;
    }

    return (
        <section className="systems-section" id="aboutus">
            {/* =====================================================
                1. CENTERED EDITORIAL STATEMENT WITH BOXICONS CHIPS
               ===================================================== */}
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

            {/* =====================================================
                2. INTERACTIVE SUBSYSTEMS ACCORDION WALL
               ===================================================== */}
            <div className="systems-wall">
                {systems.map((system, index) => {
                    const expanded = active === index;

                    return (
                        <article
                            key={system.id}
                            className={`system-card ${
                                expanded ? "expanded" : ""
                            }`}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => setActive(index)}
                            aria-expanded={expanded}
                        >
                            <img
                                className="system-image"
                                src={system.image}
                                alt=""
                                aria-hidden="true"
                                draggable="false"
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                                fetchPriority={index === 0 ? "high" : "low"}
                                onError={(event) => {
                                    event.currentTarget.classList.add(
                                        "image-failed"
                                    );
                                }}
                            />

                            <div className="system-shade" />

                            <div className="system-top">
                                <span className="system-number">
                                    {system.id}
                                </span>
                            </div>

                            <div className="system-collapsed">
                                <span>{system.title}</span>
                            </div>

                            <div className="system-info">
                                <div className="system-info-inner">
                                    <span className="system-tag">
                                        {system.tag}
                                    </span>

                                    <h3>{system.title}</h3>

                                    <p>{system.description}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* =====================================================
                3. BEYOND THE WALL: TARGET APPLICATION DOMAINS
               ===================================================== */}
            <div
                ref={domainsRef}
                className={`systems-beyond ${
                    domainsVisible ? "is-visible" : ""
                }`}
            >
                <div className="beyond-header">
                    <h3 className="beyond-title">
                        TARGET ENVIRONMENTS FOR
                        <span className="beyond-title-accent">
                            {" "}EMBODIED RESEARCH
                        </span>
                    </h3>
                </div>

                <div className="domains-grid">
                    {domains.map((domain, idx) => (
                        <article
                            key={domain.title}
                            className={`domain-card domain-card--${domain.tone}`}
                            style={{ "--card-delay": `${idx * 0.1}s` }}
                        >
                            <div
                                className="domain-card-icon"
                                aria-hidden="true"
                            >
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
