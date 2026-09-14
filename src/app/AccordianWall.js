"use client";

import { useEffect, useRef, useState } from "react";
import "./AccordianWall.css";

const systems = [
    {
        id: "01",
        title: "Precision Actuation",
        description:
            "Proprioceptive and powerful actuation systems engineered for precise, repeatable and responsive physical control.",
        image:
            "https://images.unsplash.com/photo-1629449502706-828cdde1c0b6?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "02",
        title: "Efficient Energy",
        description:
            "Energy architectures designed to maximize power density, efficiency and endurance across intelligent machines.",
        image:
            "https://images.unsplash.com/photo-1777649162085-4d68cd451c39?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "03",
        title: "Adaptive Computation",
        description:
            "Computational systems that dynamically adapt perception, planning and control to changing environments.",
        image:
            "https://images.unsplash.com/photo-1583525957866-ea1cdcb4f46a?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "04",
        title: "Encrypted Communication",
        description:
            "Secure communication architectures enabling intelligent machines to exchange information with resilience and trust.",
        image:
            "https://images.unsplash.com/photo-1517928260182-5688aead3066?q=80&w=1600&auto=format&fit=crop",
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
    const imageRefs = useRef([]);

    /*
     * Preload all accordion images.
     *
     * This prevents the first accordion interaction from fighting
     * against image decoding/network work.
     */
    useEffect(() => {
        let cancelled = false;

        const preloadImages = async () => {
            const images = systems.map((system, index) => {
                return new Promise((resolve) => {
                    const img = new Image();

                    img.decoding = "async";

                    if (index === 0) {
                        img.fetchPriority = "high";
                    } else {
                        img.fetchPriority = "low";
                    }

                    img.onload = async () => {
                        try {
                            await img.decode();
                        } catch {
                            // Image can still be used if decode() fails.
                        }

                        resolve();
                    };

                    img.onerror = () => resolve();

                    img.src = system.image;

                    imageRefs.current[index] = img;
                });
            });

            /*
             * Don't make the entire page wait indefinitely for Unsplash.
             * We only use the preload to warm the browser cache.
             */
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

    /*
     * Intro intersection observer.
     */
    useEffect(() => {
        const intro = introRef.current;

        if (!intro) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIntroVisible(entry.isIntersecting);
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -5% 0px",
            }
        );

        observer.observe(intro);

        return () => observer.disconnect();
    }, [loaded]);

    if (!loaded) {
        return <AccordionSkeleton />;
    }

    return (
        <section className="systems-section" id="aboutus">
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
                                fetchPriority={
                                    index === 0 ? "high" : "low"
                                }
                                onError={(event) => {
                                    event.currentTarget.classList.add(
                                        "image-failed"
                                    );
                                }}
                            />

                            <div className="system-shade" />



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