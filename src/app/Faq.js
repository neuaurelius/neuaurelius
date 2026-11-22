"use client";

import { useState } from "react";
import "./Faq.css";

const faqCategories = [
    {
        id: "general",
        label: "General & Vision",
        items: [
            {
                question: "What is Generalized Embodied Intelligence?",
                answer:
                    "Rather than programming a machine for a single repetitive task, Generalized Embodied Intelligence integrates spatial perception, reasoning, and compliant physical control so a humanoid robot can adapt across unstructured, human-centered environments.",
            },
            {
                question: "When will Neuaurelius reveal its first humanoid robot?",
                answer:
                    "Our first full-scale machine is currently undergoing subsystem validation and chassis integration. Major engineering milestones and our reveal window will be shared first through our research publications and newsletter.",
            },
            {
                question: "How is Neuaurelius approaching hardware and software integration?",
                answer:
                    "We co-design our compliant actuation, power distribution, and onboard compute stack alongside our control policies—ensuring tight latency bounds between perception and physical execution.",
            },
            {
                question: "Will the platform be deployed commercially or in research pilots first?",
                answer:
                    "Our initial rollout focuses on controlled operational pilots in structured indoor environments before scaling toward broader commercial deployment.",
            },
        ],
    },
    {
        id: "architecture",
        label: "Hardware & Actuation",
        items: [
            {
                question: "Why focus on proprioceptive and compliant actuation?",
                answer:
                    "Compliant, backdrivable actuators allow the robot to sense and regulate external contact forces directly through motor current and joint feedback—critical for safe, repeatable physical manipulation around humans.",
            },
            {
                question: "How does the power architecture support sustained operation?",
                answer:
                    "We are designing a high-efficiency power distribution bus and thermal layout tailored to compact humanoid form factors, minimizing energy losses during continuous locomotion and manipulation.",
            },
            {
                question: "Does the robot rely on cloud compute or onboard inference?",
                answer:
                    "Core perception, spatial planning, and low-level motor control loops run deterministically onboard so the system remains responsive and safe regardless of network connectivity.",
            },
        ],
    },
    {
        id: "domains",
        label: "Target Environments",
        items: [
            {
                question: "Which environments are your systems designed to operate in?",
                answer:
                    "We are researching architectures across three core domains: everyday workplace and logistics operations, clinical and surgical assistance, and autonomous scientific exploration in hazardous field environments.",
            },
            {
                question: "How do you ensure physical safety around human teams?",
                answer:
                    "Safety is enforced across both mechanical and software layers through passive mechanical compliance, real-time force-limiting control loops, and deterministic human-in-the-loop oversight.",
            },
            {
                question: "Can the platform adapt to existing human workspaces?",
                answer:
                    "Yes. A bipedal humanoid form factor is specifically chosen so the machine can navigate stairs, doorways, and standard workbenches without requiring costly facility retrofits.",
            },
        ],
    },
    {
        id: "research",
        label: "Research & Inquiries",
        items: [
            {
                question: "Where can I read Neuaurelius's technical papers and updates?",
                answer:
                    "Our latest technical notes, architecture breakdowns, and engineering milestones are published directly in the Publications section on this site and sent via our newsletter.",
            },
            {
                question: "How can academic labs or partners collaborate with you?",
                answer:
                    "We welcome institutional exchanges, component partnerships, and research inquiries. Reach out at post@neuaurelius.com—please do not send confidential or proprietary material without a prior agreement.",
            },
            {
                question: "Where is Neuaurelius based?",
                answer:
                    "Neuaurelius Pvt Ltd operates with its corporate and R&D base at the Atal Incubation Center, Manipal University Jaipur, and its registered office in the Greater Kolkata Metropolitan Area, West Bengal.",
            },
        ],
    },
];

export default function Faq() {
    const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0].id);
    const [openIndex, setOpenIndex] = useState(0);

    const activeCategory =
        faqCategories.find((cat) => cat.id === activeCategoryId) ||
        faqCategories[0];

    const handleCategorySelect = (id) => {
        if (id === activeCategoryId) return;
        setActiveCategoryId(id);
        setOpenIndex(0);
    };

    const toggleQuestion = (index) => {
        setOpenIndex((prev) => (prev === index ? -1 : index));
    };

    return (
        <section id="faq" className="faq-section">
            <div className="faq-card">


                {/* Centered Header */}
                <div className="faq-header">
                    <span className="faq-pill">FAQ</span>
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                    <p className="faq-subtitle">
                        Our platform is built to bring Generalized Embodied
                        Intelligence into the physical world. Explore technical
                        details across our architecture and research focus.
                    </p>
                </div>

                {/* Two-Column Interactive Tabs + Accordion */}
                <div className="faq-layout">
                    {/* Left Column: Category Selectors */}
                    <div
                        className="faq-tabs"
                        role="tablist"
                        aria-label="FAQ Categories"
                    >
                        {faqCategories.map((category) => {
                            const isSelected = category.id === activeCategoryId;

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isSelected}
                                    className={`faq-tab-btn ${
                                        isSelected ? "is-active" : ""
                                    }`}
                                    onClick={() =>
                                        handleCategorySelect(category.id)
                                    }
                                >
                                    <span>{category.label}</span>
                                    <i
                                        className="bx bx-chevron-right"
                                        aria-hidden="true"
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Column: Question Accordion Stack */}
                    <div className="faq-accordion" role="tabpanel">
                        {activeCategory.items.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={`${activeCategory.id}-${item.question}`}
                                    className={`faq-item ${
                                        isOpen ? "is-open" : ""
                                    }`}
                                >
                                    <button
                                        type="button"
                                        className="faq-trigger"
                                        onClick={() => toggleQuestion(index)}
                                        aria-expanded={isOpen}
                                    >
                                        <span className="faq-question">
                                            {item.question}
                                        </span>
                                        <span
                                            className="faq-toggle-icon"
                                            aria-hidden="true"
                                        >
                                            <i
                                                className={`bx ${
                                                    isOpen ? "bx-x" : "bx-plus"
                                                }`}
                                            />
                                        </span>
                                    </button>

                                    <div className="faq-panel">
                                        <div className="faq-panel-inner">
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
