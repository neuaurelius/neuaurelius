"use client";

import { useEffect, useRef, useState } from "react";
import "./AccordianWall.css";
import SpecularButton from "@/components/SpecularButton";
import CurvedLoop from "@/components/CurvedLoop";

const systems = [
    {
        id: "01",
        title: "Precision Actuation",
        description:
            "Proprioceptive and powerful actuation systems engineered for precise, repeatable and responsive physical control.",
        image:
            "https://images.unsplash.com/photo-1629449502706-828cdde1c0b6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "02",
        title: "Efficient Energy",
        description:
            "Energy architectures designed to maximize power density, efficiency and endurance across intelligent machines.",
        image:
            "https://images.unsplash.com/photo-1777649162085-4d68cd451c39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "03",
        title: "Adaptive Computation",
        description:
            "Computational systems that dynamically adapt perception, planning and control to changing environments.",
        image:
            "https://images.unsplash.com/photo-1583525957866-ea1cdcb4f46a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "04",
        title: "Encrypted Communication",
        description:
            "Secure communication architectures enabling intelligent machines to exchange information with resilience and trust.",
        image:
            "https://images.unsplash.com/photo-1517928260182-5688aead3066?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

function AccordionSkeleton() {
    return (
        <section className="systems-section systems-loading">
            <div className="systems-intro systems-intro-skeleton">
                <div className="skeleton-line skeleton-intro-line skeleton-intro-large" />
                <div className="skeleton-line skeleton-intro-line skeleton-intro-medium" />
                <div className="skeleton-line skeleton-intro-line skeleton-intro-medium" />
                <div className="skeleton-line skeleton-intro-line skeleton-intro-small" />
            </div>

            <div className="systems-wall systems-wall-skeleton">
                {systems.map((system, index) => (
                    <article
                        key={system.id}
                        className={`system-card system-card-skeleton ${index === 0 ? "expanded" : ""
                            }`}
                    >
                        <div className="system-skeleton-image" />

                        <div className="system-skeleton-shade" />

                        <div className="system-skeleton-number">
                            <span className="skeleton-line skeleton-number-line" />
                        </div>

                        <div className="system-skeleton-title">
                            <span className="skeleton-line skeleton-title-line" />
                        </div>

                        {index === 0 && (
                            <div className="system-skeleton-info">
                                <span className="skeleton-line skeleton-info-title" />
                                <span className="skeleton-line skeleton-info-text" />
                                <span className="skeleton-line skeleton-info-text skeleton-info-text-two" />
                                <span className="skeleton-line skeleton-info-text skeleton-info-text-three" />
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
    const [loaded, setLoaded] = useState(false);
    const introRef = useRef(null);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setLoaded(true);
        }, 250);

        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        const intro = introRef.current;

        if (!intro) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntroVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        observer.observe(intro);

        return () => observer.disconnect();
    }, [loaded]);

    if (!loaded) {
        return <AccordionSkeleton />;
    }

    return (
        <section className="systems-section">
            <div
                ref={introRef}
                className={`systems-intro ${introVisible ? "is-visible" : ""
                    }`}
            >
                <h1>
                    <span className="intro-line">
                        WE ARE BUILDING HUMANOID ROBOTS
                    </span>
                </h1>

                <h1>
                    <span className="intro-line">
                        ROBOTS WHICH CAN WORK IN YOUR OFFICE,
                    </span>

                    <span className="intro-line">
                        HELP DOCTORS IN SURGERIES AND
                    </span>

                    <span className="intro-line">
                        SCIENTISTS TO EXPLORE HARSH AREAS.
                    </span>
                </h1>
            </div>

            <div className="systems-wall">
                {systems.map((system, index) => {
                    const expanded = active === index;

                    return (
                        <article
                            key={system.id}
                            className={`system-card ${expanded ? "expanded" : ""
                                }`}
                            onMouseEnter={() => setActive(index)}
                            onClick={() => setActive(index)}
                        >
                            <div
                                className="system-image"
                                style={{
                                    backgroundImage: `url(${system.image})`,
                                }}
                            />

                            <div className="system-shade" />

                            <div className="system-top" />

                            <div className="system-collapsed">
                                <span>{system.title}</span>
                            </div>

                            <div className="system-info">
                                <div className="system-info-inner">
                                    <h2>{system.title}</h2>

                                    <p>{system.description}</p>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}