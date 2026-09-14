"use client";

import DotGrid from "@/components/DotGrid";
import "./Hero.css";
import { useState, useEffect } from "react";

function AnimatedWord({ text, className = "" }) {
    return (
        <div className={`hero-word ${className}`}>
            {text.split("").map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    className="hero-char"
                    style={{
                        "--char-index": index,
                        "--char-total": text.length,
                    }}
                >
                    {char}
                </span>
            ))}
        </div>
    );
}

export default function Hero() {
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!newsletterOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [newsletterOpen]);

    const openNewsletter = () => {
        setNewsletterOpen(true);
        setStatus("idle");
        setMessage("");
    };

    const closeNewsletter = () => {
        setNewsletterOpen(false);

        setTimeout(() => {
            setEmail("");
            setWebsite("");
            setStatus("idle");
            setMessage("");
        }, 200);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (status === "loading") return;

        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    website,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Unable to subscribe right now."
                );
            }

            setStatus("success");
            setMessage(data.message || "You're subscribed.");
            setEmail("");
        } catch (error) {
            setStatus("error");
            setMessage(
                error.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <>
            <section className="hero">
                <div className="hero-ripple">
                    <DotGrid
                        dotSize={4}
                        gap={32}
                        baseColor="#e7e5e5"
                        activeColor="#000000"
                        proximity={230}
                        speedTrigger={340}
                        shockRadius={450}
                        shockStrength={5}
                        maxSpeed={9000}
                        resistance={1650}
                        returnDuration={0.9}
                    />
                </div>

                <div className="hero-content">
                    <div className="hero-main">
                        <div className="hero-typography">
                            <AnimatedWord
                                text="GENERALIZED"
                                className="hero-line-one"
                            />

                            <AnimatedWord
                                text="EMBODIED"
                                className="hero-line-two"
                            />

                            <AnimatedWord
                                text="INTELLIGENCE"
                                className="hero-line-three"
                            />
                        </div>

                        <div className="hero-introduction">
                            <p>
                                We are building a humanoid robot designed to bring
                                Generalized Embodied Intelligence into the physical
                                world. Our first machine is in development and will
                                be revealed soon.
                            </p>

                            <button
                                type="button"
                                className="hero-cta"
                                onClick={openNewsletter}
                            >
                                <span>
                                    Subscribe to Newsletter
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {newsletterOpen && (
                <div
                    className="newsletter-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget
                        ) {
                            closeNewsletter();
                        }
                    }}
                >
                    <div className="newsletter-modal">

                        <button
                            type="button"
                            className="newsletter-close"
                            onClick={closeNewsletter}
                            aria-label="Close newsletter"
                        >
                            ×
                        </button>

                        {status === "success" ? (
                            <div className="newsletter-success">
                                <div className="newsletter-success-mark">
                                    ✓
                                </div>

                                <h2>
                                    You're in.
                                </h2>

                                <p>
                                    We'll let you know when
                                    something important happens.
                                </p>

                                <button
                                    type="button"
                                    className="newsletter-done"
                                    onClick={closeNewsletter}
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="newsletter-heading">

                                    <h2>
                                        Stay in the loop.
                                    </h2>

                                    <p>
                                        Follow the development
                                        of our first machine
                                        and what comes next.
                                    </p>
                                </div>

                                <form
                                    className="newsletter-form"
                                    onSubmit={handleSubmit}
                                >
                                    {/* Honeypot */}
                                    <input
                                        type="text"
                                        name="website"
                                        value={website}
                                        onChange={(event) =>
                                            setWebsite(
                                                event.target.value
                                            )
                                        }
                                        tabIndex="-1"
                                        autoComplete="off"
                                        className="newsletter-honeypot"
                                        aria-hidden="true"
                                    />

                                    <label
                                        htmlFor="newsletter-email"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(
                                                event.target.value
                                            )
                                        }
                                        autoComplete="email"
                                        required
                                        disabled={
                                            status === "loading"
                                        }
                                    />

                                    <button
                                        type="submit"
                                        disabled={
                                            status === "loading"
                                        }
                                    >
                                        {status === "loading"
                                            ? "Subscribing..."
                                            : "Subscribe"}
                                    </button>

                                    {status === "error" && (
                                        <p className="newsletter-error">
                                            {message}
                                        </p>
                                    )}

                                    <p className="newsletter-note">
                                        No noise. Only important
                                        updates from Neuaurelius.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}