"use client";

import "./Hero.css";
import { useState, useEffect } from "react";

// Zero-registration invisible PoW CAPTCHA generator
async function generateProofOfWork(nonce = 0) {
    const timestamp = Date.now();
    const challenge = `pow_${timestamp}_${Math.random().toString(36).substring(2)}`;

    let solvedNonce = 0;
    while (true) {
        const msg = `${challenge}:${solvedNonce}`;
        const msgBuffer = new TextEncoder().encode(msg);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        if (hashHex.startsWith("000")) {
            return { challenge, nonce: solvedNonce, hash: hashHex };
        }
        solvedNonce++;
    }
}

function AnimatedWord({ text, className = "", lineIndex = 0 }) {
    return (
        <div className="hero-word-mask">
            <div
                className={`hero-word ${className}`}
                style={{ "--line-index": lineIndex }}
            >
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
        </div>
    );
}

export default function Hero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [newsletterOpen, setNewsletterOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    // Trigger choreographed entrance on first paint
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsLoaded(true);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

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
            const powToken = await generateProofOfWork();

            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    website,
                    captchaToken: powToken,
                }),
            });

            const data = await response.json();

            if (response.status === 409 || data.code === "ALREADY_EXISTS" || data.alreadySubscribed) {
                setStatus("already_subscribed");
                setMessage(data.message || "This email is already subscribed to our newsletter.");
                return;
            }

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Unable to subscribe right now."
                );
            }

            setStatus("success");
            setMessage(data.message || "You're subscribed.");
            setEmail("");
        } catch (error) {
            setStatus("error");
            setMessage(
                error.message || "Something went wrong. Please try again."
            );
        }
    };

    return (
        <>
            {/* Hidden SVG Optical Filter for True Fractal / Reeded Glass Displacement */}
            <svg
                width="0"
                height="0"
                style={{ position: "absolute", pointerEvents: "none" }}
                aria-hidden="true"
            >
                <defs>
                    <filter
                        id="fractal-glass-refraction"
                        x="-10%"
                        y="-10%"
                        width="120%"
                        height="120%"
                        colorInterpolationFilters="sRGB"
                    >
                        {/* Vertical fluted ribs + organic wave distortion */}
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.065 0.002"
                            numOctaves="2"
                            seed="7"
                            result="ribNoise"
                        />
                        <feTurbulence
                            type="turbulence"
                            baseFrequency="0.008 0.025"
                            numOctaves="2"
                            seed="14"
                            result="waveNoise"
                        />
                        <feBlend
                            in="ribNoise"
                            in2="waveNoise"
                            mode="screen"
                            result="combinedMap"
                        />

                        {/* Displace R, G, B channels at slightly different scales for chromatic prism edges */}
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="combinedMap"
                            scale="34"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="dispRed"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="combinedMap"
                            scale="24"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="dispGreen"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="combinedMap"
                            scale="14"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            result="dispBlue"
                        />

                        {/* Isolate RGB channels and recombine */}
                        <feColorMatrix
                            in="dispRed"
                            type="matrix"
                            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                            result="redOnly"
                        />
                        <feColorMatrix
                            in="dispGreen"
                            type="matrix"
                            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                            result="greenOnly"
                        />
                        <feColorMatrix
                            in="dispBlue"
                            type="matrix"
                            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                            result="blueOnly"
                        />

                        <feBlend
                            in="redOnly"
                            in2="greenOnly"
                            mode="screen"
                            result="rg"
                        />
                        <feBlend
                            in="rg"
                            in2="blueOnly"
                            mode="screen"
                            result="refracted"
                        />
                    </filter>
                </defs>
            </svg>

            <section className={`hero ${isLoaded ? "hero-loaded" : ""}`}>
                {/* Atmospheric Background + Refracted Humanoid Render */}
                <div className="cyber-hero-bg" aria-hidden="true">
                    <div className="cyber-ambient-glow" />

                    {/* SVG Fractal Glass Filter applied directly to the humanoid stage */}
                    <div className="cyber-figure-stage">
                        <div className="cyber-figure-wrapper">
                            <img
                                src="/assets/humanoid.png"
                                alt=""
                                className="cyber-figure-ghost"
                            />
                            <img
                                src="/assets/humanoid.png"
                                alt=""
                                className="cyber-figure-img"
                            />

                            <div className="cyber-visor-beam">
                                <div className="visor-bloom" />
                                <div className="visor-bar-primary" />
                                <div className="visor-bar-secondary" />
                            </div>
                        </div>
                    </div>

                    {/* Vertical Fluted Glass Specular Rib Lines */}
                    <div className="cyber-fractal-ribs" />

                    <div className="cyber-vignette" />
                </div>

                {/* Bottom Split Content Layout (Unfiltered, Razor-Sharp) */}
                <div className="hero-content">
                    <div className="hero-main">
                        <div className="hero-typography">
                            <AnimatedWord
                                text="GENERALIZED"
                                className="hero-line-one"
                                lineIndex={0}
                            />
                            <AnimatedWord
                                text="EMBODIED"
                                className="hero-line-two"
                                lineIndex={1}
                            />
                            <AnimatedWord
                                text="INTELLIGENCE"
                                className="hero-line-three"
                                lineIndex={2}
                            />
                        </div>

                        <div className="hero-side-block">
                            <div className="hero-introduction">
                                <p>
                                    We are building a humanoid robot designed to bring
                                    Generalized Embodied Intelligence into the physical
                                    world. Our first machine is in development and will
                                    be revealed soon.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="hero-cta"
                                onClick={openNewsletter}
                            >
                                <span className="hero-cta-text">SUBSCRIBE NOW</span>
                                <span className="hero-cta-icon" aria-hidden="true">
                                    <svg viewBox="0 0 16 16">
                                        <path
                                            d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
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
                        if (event.target === event.currentTarget) {
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
                                <h2>Thank you for Subscribing</h2>
                                <p>
                                    We&apos;ll let you know when something important happens.
                                </p>
                                <button
                                    type="button"
                                    className="newsletter-done"
                                    onClick={closeNewsletter}
                                >
                                    Done
                                </button>
                            </div>
                        ) : status === "already_subscribed" ? (
                            <div className="newsletter-success">
                                <div className="newsletter-success-mark">
                                    ℹ
                                </div>
                                <h2>Already Subscribed</h2>
                                <p>{message}</p>
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
                                    <h2>Stay in the loop.</h2>
                                    <p>
                                        Follow the development of our first machine
                                        and what comes next.
                                    </p>
                                </div>

                                <form
                                    className="newsletter-form"
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        type="text"
                                        name="website"
                                        value={website}
                                        onChange={(event) =>
                                            setWebsite(event.target.value)
                                        }
                                        tabIndex="-1"
                                        autoComplete="off"
                                        className="newsletter-honeypot"
                                        aria-hidden="true"
                                    />

                                    <label htmlFor="newsletter-email">
                                        Email address
                                    </label>

                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        autoComplete="email"
                                        required
                                        disabled={status === "loading"}
                                    />

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                    >
                                        {status === "loading"
                                            ? "Verifying & Subscribing..."
                                            : "Subscribe"}
                                    </button>

                                    {status === "error" && (
                                        <p className="newsletter-error">
                                            {message}
                                        </p>
                                    )}

                                    <p className="newsletter-note">
                                        No noise. Only important updates from Neuaurelius.
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
