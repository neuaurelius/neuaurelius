"use client";

import { useState, useEffect, useRef } from "react";
import "./Contact.css";

const INQUIRY_TOPICS = [
    {
        id: "investments",
        label: "Investments",
        orgLabel: "Fund / Venture Firm / Entity",
        orgPlaceholder: "e.g., Frontier Ventures",
        linkLabel: "Firm Website or LinkedIn (Optional)",
        linkPlaceholder: "https://",
        messagePlaceholder:
            "Share your investment thesis, stage focus, or interest in Neuaurelius...",
    },
    {
        id: "research",
        label: "Research & Collaboration",
        orgLabel: "University / Lab / Organisation",
        orgPlaceholder: "e.g., Robotics & AI Lab, IIT / MIT",
        linkLabel: "Lab Page, Publication, or Website (Optional)",
        linkPlaceholder: "https://",
        messagePlaceholder:
            "Describe the proposed research direction, hardware/software synergy, or partnership scope...",
    },
    {
        id: "internships",
        label: "Internships & Talent",
        orgLabel: "University / Current Affiliation",
        orgPlaceholder: "e.g., B.Tech / M.S. in Robotics, CS, or ECE",
        linkLabel: "GitHub / Portfolio / Google Scholar / Resume URL",
        linkPlaceholder: "https://github.com/...",
        messagePlaceholder:
            "Tell us about your background in robotics, control systems, ML, electronics, or simulation...",
    },
    {
        id: "general",
        label: "General & Inquiries",
        orgLabel: "Organisation (Optional)",
        orgPlaceholder: "Company or publication name",
        linkLabel: "Reference Link (Optional)",
        linkPlaceholder: "https://",
        messagePlaceholder: "How can our team help you?",
    },
];

export default function Contact() {
    const [selectedTopicId, setSelectedTopicId] = useState("investments");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");
    const [referenceLink, setReferenceLink] = useState("");
    const [message, setMessage] = useState("");
    const [botcheck, setBotcheck] = useState(false);
    const [honeypotText, setHoneypotText] = useState("");

    const loadedAtRef = useRef(Date.now());
    const [status, setStatus] = useState("idle"); // idle | submitting | success | error
    const [errorMessage, setErrorMessage] = useState("");

    const activeTopic =
        INQUIRY_TOPICS.find((t) => t.id === selectedTopicId) ||
        INQUIRY_TOPICS[0];

    useEffect(() => {
        loadedAtRef.current = Date.now();
    }, []);

    // Listen for deep-links triggered from FAQ items
    useEffect(() => {
        const handleSelectTopic = (event) => {
            const incomingTopic = event?.detail?.topic;
            if (
                incomingTopic &&
                INQUIRY_TOPICS.some((t) => t.id === incomingTopic)
            ) {
                setSelectedTopicId(incomingTopic);
                setStatus("idle");
                setErrorMessage("");
            }
        };

        window.addEventListener("neuaurelius:select-contact", handleSelectTopic);
        return () =>
            window.removeEventListener(
                "neuaurelius:select-contact",
                handleSelectTopic
            );
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Silent bot traps (checkbox honeypot, text honeypot, or <2s instant script submit)
        if (botcheck || honeypotText || Date.now() - loadedAtRef.current < 2000) {
            setStatus("success");
            return;
        }

        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
        if (!accessKey) {
            setStatus("error");
            setErrorMessage(
                "Contact form key is missing. Please email post@neuaurelius.com directly."
            );
            return;
        }

        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `[Neuaurelius — ${activeTopic.label}] Inquiry from ${name}`,
                    from_name: "Neuaurelius Website",
                    inquiry_type: activeTopic.label,
                    name,
                    email,
                    organization: organization || "Not specified",
                    reference_link: referenceLink || "None",
                    message,
                    botcheck: "",
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setName("");
                setEmail("");
                setOrganization("");
                setReferenceLink("");
                setMessage("");
            } else {
                setStatus("error");
                setErrorMessage(
                    result.message || "Unable to send message. Please try again."
                );
            }
        } catch {
            setStatus("error");
            setErrorMessage(
                "Network error. Please try again or email post@neuaurelius.com."
            );
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-shell">
                {/* Centered Top Header */}
                <div className="contact-header">
                    <h2 className="contact-title">Contact Us</h2>
                    <p className="contact-subtitle">
                        Whether you are backing frontier embodied AI, proposing
                        an institutional research collaboration, or applying to
                        build alongside our engineering team, select a track and
                        reach us directly.
                    </p>
                </div>

                {/* Horizontal Form Card */}
                <div className="contact-form-card">
                    {status === "success" ? (
                        <div className="contact-success-box">
                            <div className="contact-success-icon">
                                <i className="bx bx-check" aria-hidden="true" />
                            </div>
                            <h3>Inquiry Received</h3>
                            <p>
                                Thank you for reaching out regarding{" "}
                                <strong>{activeTopic.label}</strong>. Your
                                message has been routed to our team at{" "}
                                <span>post@neuaurelius.com</span>.
                            </p>
                            <button
                                type="button"
                                className="contact-reset-btn"
                                onClick={() => setStatus("idle")}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form
                            className="contact-form-horizontal"
                            onSubmit={handleSubmit}
                            autoComplete="off"
                        >
                            {/* Dual Spam Honeypots (Free Tier) */}
                            <input
                                type="checkbox"
                                name="botcheck"
                                checked={botcheck}
                                onChange={(e) => setBotcheck(e.target.checked)}
                                className="contact-honeypot"
                                tabIndex="-1"
                                aria-hidden="true"
                            />
                            <input
                                type="text"
                                name="company_website"
                                value={honeypotText}
                                onChange={(e) =>
                                    setHoneypotText(e.target.value)
                                }
                                className="contact-honeypot"
                                tabIndex="-1"
                                autoComplete="off"
                                aria-hidden="true"
                            />

                            {/* LEFT COLUMN: Inquiry Type + Contact Details */}
                            <div className="contact-col-left">
                                <div className="contact-topic-block">
                                    <span className="contact-field-label">
                                        Select Inquiry Type
                                    </span>

                                    <div
                                        className="contact-topics"
                                        role="tablist"
                                        aria-label="Inquiry Tracks"
                                    >
                                        {INQUIRY_TOPICS.map((topic) => {
                                            const isActive =
                                                topic.id === selectedTopicId;
                                            return (
                                                <button
                                                    key={topic.id}
                                                    type="button"
                                                    role="tab"
                                                    aria-selected={isActive}
                                                    className={`contact-topic-btn ${
                                                        isActive
                                                            ? "is-active"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedTopicId(
                                                            topic.id
                                                        );
                                                        if (status !== "idle")
                                                            setStatus("idle");
                                                    }}
                                                >
                                                    {topic.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="contact-row">
                                    <div className="contact-field">
                                        <label htmlFor="contact-name">
                                            Full Name *
                                        </label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            placeholder="Dr. / Mr. / Ms. Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            disabled={status === "submitting"}
                                        />
                                    </div>

                                    <div className="contact-field">
                                        <label htmlFor="contact-email">
                                            Work or Academic Email *
                                        </label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            name="contact_work_email"
                                            autoComplete="one-time-code"
                                            required
                                            placeholder="name@organisation.com"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            disabled={status === "submitting"}
                                        />
                                    </div>
                                </div>

                                <div className="contact-row">
                                    <div className="contact-field">
                                        <label htmlFor="contact-org">
                                            {activeTopic.orgLabel}
                                        </label>
                                        <input
                                            id="contact-org"
                                            type="text"
                                            placeholder={
                                                activeTopic.orgPlaceholder
                                            }
                                            value={organization}
                                            onChange={(e) =>
                                                setOrganization(e.target.value)
                                            }
                                            disabled={status === "submitting"}
                                        />
                                    </div>

                                    <div className="contact-field">
                                        <label htmlFor="contact-link">
                                            {activeTopic.linkLabel}
                                        </label>
                                        <input
                                            id="contact-link"
                                            type="url"
                                            placeholder={
                                                activeTopic.linkPlaceholder
                                            }
                                            value={referenceLink}
                                            onChange={(e) =>
                                                setReferenceLink(e.target.value)
                                            }
                                            disabled={status === "submitting"}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Message + Submit Button */}
                            <div className="contact-col-right">
                                <div className="contact-field contact-field--grow">
                                    <label htmlFor="contact-message">
                                        Proposal / Message *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        required
                                        placeholder={
                                            activeTopic.messagePlaceholder
                                        }
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        disabled={status === "submitting"}
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="contact-error">
                                        {errorMessage}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="contact-submit-btn"
                                    disabled={status === "submitting"}
                                >
                                    <span>
                                        {status === "submitting"
                                            ? "Routing Inquiry..."
                                            : `Send ${activeTopic.label} Inquiry`}
                                    </span>
                                    <span
                                        className="contact-submit-icon"
                                        aria-hidden="true"
                                    >
                                        <i className="bx bx-right-arrow-alt" />
                                    </span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
