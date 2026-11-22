"use client";

import { useState, useRef } from "react";
import InvisibleTurnstile from "./InvisibleTurnstile";
import "./NewsletterCard.css";

// Zero-registration invisible PoW fallback generator
async function generateProofOfWork() {
    const timestamp = Date.now();
    const challenge = `pow_${timestamp}_${Math.random().toString(36).substring(2)}`;

    let solvedNonce = 0;
    while (true) {
        const msg = `${challenge}:${solvedNonce}`;
        const msgBuffer = new TextEncoder().encode(msg);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        if (hashHex.startsWith("000")) {
            return { challenge, nonce: solvedNonce, hash: hashHex };
        }
        solvedNonce++;
    }
}

export default function NewsletterCard({ onClose, isStandalone = false }) {
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState("");
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");
    const [copied, setCopied] = useState(false);

    const turnstileRef = useRef(null);
    const [turnstileToken, setTurnstileToken] = useState("");

    const shareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/?newsletter=true`
            : "https://neuaurelius.com/?newsletter=true";

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            // Fallback ignored
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (status === "loading") return;

        setStatus("loading");
        setMessage("");

        try {
          const cfToken =
              turnstileToken ||
              turnstileRef.current?.getToken() ||
              (await turnstileRef.current?.waitForToken(5000)) ||
              "";
            const powToken = await generateProofOfWork();

            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    website,
                    turnstileToken: cfToken,
                    captchaToken: powToken,
                }),
            });

            const data = await response.json();

            if (
                response.status === 409 ||
                data.code === "ALREADY_EXISTS" ||
                data.alreadySubscribed
            ) {
                setStatus("already_subscribed");
                setMessage(
                    data.message ||
                        "This email is already subscribed to our weekly dispatch."
                );
                turnstileRef.current?.reset();
                setTurnstileToken("");
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
            turnstileRef.current?.reset();
            setTurnstileToken("");
        } catch (error) {
            setStatus("error");
            setMessage(
                error.message || "Something went wrong. Please try again."
            );
            turnstileRef.current?.reset();
            setTurnstileToken("");
        }
    };

    return (
        <div
            className={`nl-split-card ${
                isStandalone ? "nl-split-card--standalone" : ""
            }`}
        >
            {onClose && (
                <button
                    type="button"
                    className="nl-close-btn"
                    onClick={onClose}
                    aria-label="Close newsletter"
                >
                    <i className="bx bx-x" />
                </button>
            )}

            {/* LEFT COLUMN: PILL, HEADLINE, FORM & PERKS */}
            <div className="nl-left">
                <div className="nl-top-pills">
                    <span className="nl-pill">Subscribe · Weekly</span>
                    <button
                        type="button"
                        className="nl-share-pill"
                        onClick={handleCopyLink}
                        title="Copy shareable subscribe link"
                    >
                        <i
                            className={`bx ${
                                copied ? "bx-check" : "bx-link-alt"
                            }`}
                        />
                        <span>{copied ? "Link Copied" : "Share Link"}</span>
                    </button>
                </div>

                {status === "success" || status === "already_subscribed" ? (
                    <div className="nl-state-box">
                        <div className="nl-state-badge">
                            <i
                                className={`bx ${
                                    status === "success"
                                        ? "bx-check"
                                        : "bx-info-circle"
                                }`}
                            />
                        </div>
                        <h2>
                            {status === "success"
                                ? "You're on the Weekly List."
                                : "Already Subscribed."}
                        </h2>
                        <p>
                            {status === "success"
                                ? "Thank you for subscribing. Expect weekly engineering notes, hardware progress, and research dispatches from Neuaurelius."
                                : message}
                        </p>

                        {onClose && (
                            <button
                                type="button"
                                className="nl-submit-btn"
                                onClick={onClose}
                            >
                                <span>Back to Site</span>
                                <i className="bx bx-right-arrow-alt" />
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <h2 className="nl-title">
                            Stay Ahead with Embodied AI Insights.
                        </h2>

                        <p className="nl-subtitle">
                            Welcome to our weekly dispatch, where we share
                            hardware milestones, research notes, and
                            behind-the-scenes robotics engineering.
                        </p>

                        <form
                            className="nl-form"
                            onSubmit={handleSubmit}
                            autoComplete="off"
                        >
                            {/* Invisible Cloudflare Turnstile Captcha */}
                            <InvisibleTurnstile
                                ref={turnstileRef}
                                action="newsletter_subscribe"
                                onToken={setTurnstileToken}
                            />

                            <input
                                type="text"
                                name="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                tabIndex="-1"
                                autoComplete="off"
                                className="nl-honeypot"
                                aria-hidden="true"
                            />

                            <input
                                type="email"
                                name="nl_subscriber_address"
                                placeholder="name@email.com"
                                aria-label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="one-time-code"
                                data-lpignore="true"
                                data-form-type="other"
                                required
                                disabled={status === "loading"}
                                className="nl-input"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="nl-submit-btn"
                            >
                                <span>
                                    {status === "loading"
                                        ? "Verifying..."
                                        : "Subscribe Now"}
                                </span>
                                <i
                                    className="bx bx-right-arrow-alt"
                                    aria-hidden="true"
                                />
                            </button>

                            {status === "error" && (
                                <p className="nl-error">{message}</p>
                            )}
                        </form>
                    </>
                )}
            </div>

            {/* RIGHT COLUMN: ROUNDED VISUAL ARTWORK CARD */}
            <div className="nl-right" aria-hidden="true">
                <div className="nl-visual-card">
                    <div className="nl-visual-glow" />
                    <img
                        src="/assets/humanoid.png"
                        alt=""
                        className="nl-visual-img"
                    />
                    <div className="nl-visual-vignette" />
                </div>
            </div>
        </div>
    );
}
