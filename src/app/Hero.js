"use client";

import "./Hero.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import NewsletterCard from "../components/NewsletterCard";

function AnimatedWord({ text, className = "", lineIndex = 0 }) {
  return (
    <div className="hero-word-mask" aria-hidden="true">
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

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.get("newsletter") === "true" ||
      params.get("subscribe") === "1"
    ) {
      setNewsletterOpen(true);
    }
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

  useEffect(() => {
    if (!newsletterOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setNewsletterOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [newsletterOpen]);

  const openNewsletter = () => {
    setNewsletterOpen(true);
  };

  const closeNewsletter = () => {
    setNewsletterOpen(false);

    const url = new URL(window.location.href);
    if (
      url.searchParams.has("newsletter") ||
      url.searchParams.has("subscribe")
    ) {
      url.searchParams.delete("newsletter");
      url.searchParams.delete("subscribe");
      window.history.replaceState({}, "", url.pathname + url.hash);
    }
  };

  return (
    <>
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
            <feBlend in="redOnly" in2="greenOnly" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueOnly" mode="screen" result="refracted" />
          </filter>
        </defs>
      </svg>

      <section className={`hero ${isLoaded ? "hero-loaded" : ""}`}>
        <div className="cyber-hero-bg" aria-hidden="true">
          <div className="cyber-ambient-glow" />

          <div className="cyber-figure-stage">
            <div className="cyber-figure-wrapper">
              <Image
                src="/assets/humanoid.png"
                alt=""
                width={900}
                height={1100}
                priority
                className="cyber-figure-ghost"
              />
              <Image
                src="/assets/humanoid.png"
                alt="Neuaurelius Humanoid Robot Prototype"
                width={900}
                height={1100}
                priority
                className="cyber-figure-img"
              />

              <div className="cyber-visor-beam">
                <div className="visor-bloom" />
                <div className="visor-bar-primary" />
                <div className="visor-bar-secondary" />
              </div>
            </div>
          </div>

          <div className="cyber-fractal-ribs" />
          <div className="cyber-vignette" />
        </div>

        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-typography">
              <span className="sr-only">
                Neuaurelius — Generalized Embodied Intelligence
              </span>
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
            </h1>

            <div className="hero-side-block">
              <div className="hero-introduction">
                <p>
                  We are building a humanoid robot designed to bring
                  Generalized Embodied Intelligence into the physical world. Our
                  first machine is in development and will be revealed soon.
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
          <NewsletterCard onClose={closeNewsletter} />
        </div>
      )}
    </>
  );
}
