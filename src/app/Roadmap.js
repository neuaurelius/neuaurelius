"use client";

import { useEffect, useRef, useState } from "react";
import "./Roadmap.css";

const milestones = [
    {
        phase: "PHASE 01",
        status: "COMPLETED",
        tone: "sage",
        title: "Actuator & Drive Validation",
        summary:
            "Bench-testing high-torque, proprioceptive compliant actuators to validate thermal stability, backdrivability, and low-latency force feedback.",
        deliverables: ["Custom Brushless Drive", "Thermal & Load Profiling"],
    },
    {
        phase: "PHASE 02",
        status: "IN PROGRESS",
        tone: "amber",
        title: "Embodied Control & Sim-to-Real",
        summary:
            "Training whole-body locomotion and dexterous manipulation policies in high-fidelity physics simulation for zero-shot hardware transfer.",
        deliverables: ["Whole-Body Policy Stack", "Onboard Sensor Fusion"],
    },
    {
        phase: "PHASE 03",
        status: "UPCOMING",
        tone: "lavender",
        title: "Full-Scale Chassis Integration",
        summary:
            "Unifying structural frame, power distribution, and onboard compute into our first complete bipedal humanoid platform.",
        deliverables: ["Integrated Power Bus", "Tetherless Balance Trials"],
    },
    {
        phase: "PHASE 04",
        status: "TARGET",
        tone: "neutral",
        title: "First Machine Reveal & Field Pilots",
        summary:
            "Public unveiling of our inaugural humanoid prototype alongside controlled operational pilots in structured indoor environments.",
        deliverables: ["Hardware Reveal", "Controlled Pilot Deployment"],
    },
];

export default function Roadmap() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="roadmap"
            className={`roadmap-section ${visible ? "is-visible" : ""}`}
        >
            <div className="roadmap-container">
                <div className="roadmap-header">
                    <span className="roadmap-pill">DEVELOPMENT ROADMAP</span>
                    <h2 className="roadmap-title">
                        FROM BENCH VALIDATION TO PHYSICAL DEPLOYMENT
                    </h2>
                    <p className="roadmap-subtitle">
                        Our engineering milestones leading up to the reveal of
                        our first generalized humanoid platform.
                    </p>
                </div>

                <div className="roadmap-grid">
                    {milestones.map((item, idx) => (
                        <article
                            key={item.phase}
                            className={`roadmap-card roadmap-card--${item.tone}`}
                            style={{ "--card-delay": `${idx * 0.09}s` }}
                        >
                            <div className="roadmap-card-top">
                                <span className="roadmap-phase">
                                    {item.phase}
                                </span>
                                <span
                                    className={`roadmap-status status--${item.tone}`}
                                >
                                    {item.status === "IN PROGRESS" && (
                                        <span
                                            className="status-pulse"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {item.status}
                                </span>
                            </div>

                            <div className="roadmap-card-body">
                                <h3>{item.title}</h3>
                                <p>{item.summary}</p>
                            </div>

                            <div className="roadmap-tags">
                                {item.deliverables.map((tag) => (
                                    <span key={tag} className="roadmap-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
