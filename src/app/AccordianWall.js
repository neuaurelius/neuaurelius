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
            "https://images.unsplash.com/photo-1777649162085-4d68cd451c39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "03",
        title: "Adaptive Computation",
        description:
            "Computational systems that dynamically adapt perception, planning and control to changing environments.",
        image:
            "https://images.unsplash.com/photo-1583525957866-ea1cdcb4f46a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: "04",
        title: "Encrypted Communication",
        description:
            "Secure communication architectures enabling intelligent machines to exchange information with resilience and trust.",
        image:
            "https://images.unsplash.com/photo-1517928260182-5688aead3066?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

export default function AccordionWall() {
    const [active, setActive] = useState(0);
    const [introVisible, setIntroVisible] = useState(false);
    const introRef = useRef(null);

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
    }, []);

    return (
        <section className="systems-section">



            <div
                ref={introRef}
                className={`systems-intro ${introVisible ? "is-visible" : ""}`}
            >
                <h1>
                    <span className="intro-line">WE ARE BUILDING HUMANOID ROBOTS</span>
                </h1>
                <h1>
                    <span className="intro-line">ROBOTS WHICH CAN WORK IN YOUR OFFICE,</span>
                    <span className="intro-line">HELP DOCTORS IN SURGERIES AND</span>
                    <span className="intro-line">SCIENTISTS TO EXPLORE HARSH AREAS.</span>
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

                            <div className="system-top">

                            </div>

                            {/* Collapsed */}
                            <div className="system-collapsed">
                                <span>{system.title}</span>
                            </div>

                            {/* Expanded */}
                            <div className="system-info">
                                <div className="system-info-inner">



                                    <h2>{system.title}</h2>

                                    <p>{system.description}</p>

                                    <SpecularButton
                                        size="lg"
                                        radius={60}
                                        tint="#ffffff"
                                        tintOpacity={0}
                                        blur={0}
                                        textColor="#f5f5f5"
                                        lineColor="#ffffff"
                                        baseColor="#525252"
                                        intensity={1}
                                        shineSize={10}
                                        shineFade={40}
                                        thickness={1}
                                        speed={0.35}
                                        followMouse
                                        proximity={250}
                                        autoAnimate={false}
                                        onClick={() => console.log('clicked')}
                                        className="explore-btn"

                                    >
                                        Explore
                                    </SpecularButton>

                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}