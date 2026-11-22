"use client";

import { useState } from "react";
import "./Faq.css";

const faqCategories = [
    {
        id: "general",
        label: "General & Vision",
        items: [
            {
                question: "What is Neuaurelius?",
                answer:
                    "Neuaurelius Private Limited is a research-driven technology company working at the intersection of robotics, artificial intelligence, and advanced engineering. Our objective is to develop technologies that enable intelligent systems to interact with, understand, and operate in the physical world.",
            },
            {
                question: "What is the primary vision of Neuaurelius?",
                answer:
                    "Our vision is to advance Generalized Embodied Intelligence by developing systems that can perceive their surroundings, reason about situations, adapt to changing conditions, and interact with the physical world.",
            },
            {
                question: "What is Generalized Embodied Intelligence?",
                answer:
                    "Generalized Embodied Intelligence refers to the development of intelligent systems that combine perception, reasoning, learning, and physical interaction. Unlike conventional automation designed around predefined tasks, this approach aims to enable machines to respond and adapt to unfamiliar environments and situations.",
            },
            {
                question: "What areas does Neuaurelius focus its research on?",
                answer:
                    "Our research interests span several interconnected domains, including computational cognition, embodied intelligence, robotic systems, intelligent actuation, energy storage, and efficient computing architectures.",
            },
        ],
    },
    {
        id: "research",
        label: "Research & Technology",
        items: [
            {
                question: "What makes Neuaurelius different from conventional robotics companies?",
                answer:
                    "Neuaurelius approaches robotics as an integrated intelligence and engineering challenge. Rather than treating intelligence, mechanical systems, actuation, and energy management as isolated components, we explore how these disciplines can work together to enable more capable physical systems.",
            },
            {
                question: "Is Neuaurelius developing its own technologies?",
                answer:
                    "Yes. Our research focuses on exploring and developing proprietary technological approaches across intelligent systems and supporting engineering disciplines. Specific architectures, methodologies, and technical developments remain subject to ongoing research and intellectual property considerations.",
                ctaLabel: "Discuss investment or strategic backing",
                ctaTopic: "investments",
            },
            {
                question: "What is the current stage of development?",
                answer:
                    "Neuaurelius is currently between the ideation and prototyping stages, with its research activities at approximately Technology Readiness Level 2 (TRL 2). Our work is focused on developing technical foundations, evaluating research directions, and progressing toward experimental validation.",
            },
            {
                question: "Does Neuaurelius focus only on robotics?",
                answer:
                    "No. Robotics is an important application area, but our broader research interests include the computational, mechanical, and energy-related technologies required to build advanced intelligent systems.",
            },
        ],
    },
    {
        id: "collaboration",
        label: "Research & Collaboration",
        items: [
            {
                question: "Does Neuaurelius collaborate with universities and research institutions?",
                answer:
                    "Yes. We welcome academic collaborations, interdisciplinary research initiatives, and institutional partnerships. We are particularly interested in working with researchers, professors, laboratories, and institutions whose expertise aligns with our research interests.",
                ctaLabel: "Propose an academic or lab collaboration",
                ctaTopic: "research",
            },
            {
                question: "Are there opportunities for students and interns?",
                answer:
                    "Yes. Neuaurelius offers opportunities for students and emerging researchers interested in contributing to research and engineering initiatives. Opportunities may span software, electronics, robotics, mechanical engineering, computational systems, and related disciplines.",
                ctaLabel: "Apply for internships & research roles",
                ctaTopic: "internships",
            },
            {
                question: "Can researchers or professors join the advisory network?",
                answer:
                    "We welcome discussions with experienced researchers, academics, and industry professionals interested in contributing through research guidance, technical mentorship, and institutional collaboration.",
                ctaLabel: "Connect regarding advisory roles",
                ctaTopic: "research",
            },
            {
                question: "How can an organisation collaborate with Neuaurelius?",
                answer:
                    "Organisations interested in research partnerships, technical collaboration, component development, or institutional engagement can contact our team directly. Collaboration proposals are evaluated based on technical relevance and mutual objectives.",
                ctaLabel: "Submit a collaboration inquiry",
                ctaTopic: "research",
            },
        ],
    },
    {
        id: "inquiries",
        label: "Company & Inquiries",
        items: [
            {
                question: "Where is Neuaurelius based?",
                answer:
                    "Neuaurelius Private Limited operates from its corporate and research ecosystem at the Atal Incubation Centre, Manipal University Jaipur, Rajasthan, with its registered office in the Greater Kolkata Metropolitan Area, West Bengal, India.",
            },
            {
                question: "How can I contact Neuaurelius?",
                answer:
                    "For general inquiries, research collaborations, institutional partnerships, and other professional communications, you can reach our team at post@neuaurelius.com or submit a direct inquiry below.",
                ctaLabel: "Open the contact form",
                ctaTopic: "general",
            },
            {
                question: "Where can I find updates about Neuaurelius?",
                answer:
                    "Updates regarding our research activities, publications, institutional collaborations, and organisational developments will be shared through our official website and communication channels.",
            },
            {
                question: "Can I request technical information about ongoing research?",
                answer:
                    "Yes. General information about our research interests and publicly disclosed developments can be requested through our official communication channels. Certain technical information may remain confidential due to ongoing research and intellectual property considerations.",
                ctaLabel: "Request technical brief",
                ctaTopic: "general",
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

    const handleNavigateToContact = (topic = "general") => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(
                new CustomEvent("neuaurelius:select-contact", {
                    detail: { topic },
                })
            );
            const target = document.getElementById("contact");
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
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
                        details across our architecture and research focus, or{" "}
                        <button
                            type="button"
                            className="faq-inline-link"
                            onClick={() => handleNavigateToContact("general")}
                        >
                            contact our team directly
                        </button>
                        .
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
                                    <p>{item.answer}
                                      <br />
                                      {item.ctaLabel && (
                                          <button
                                              type="button"
                                              className="faq-answer-cta"
                                              onClick={() =>
                                                  handleNavigateToContact(
                                                      item.ctaTopic
                                                  )
                                              }
                                          >
                                              <span>{item.ctaLabel}</span>
                                              <i
                                                  className="bx bx-right-arrow-alt"
                                                  aria-hidden="true"
                                              />
                                          </button>
                                      )}</p>

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
