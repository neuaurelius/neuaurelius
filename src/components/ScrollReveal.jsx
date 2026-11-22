"use client";

import { useEffect, useRef } from "react";
import "./ScrollReveal.css";

export default function ScrollReveal({
    children,
    variant = "fade-up",
    delay = 0,
    duration = 750,
    once = false,
    className = "",
    as: Tag = "div",
    ...rest
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (
            typeof window === "undefined" ||
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            el.classList.add("sr-visible");
            return;
        }

        let lastScrollY = window.scrollY;

        const observer = new IntersectionObserver(
            (entries) => {
                const currentScrollY = window.scrollY;
                const scrollingUp = currentScrollY < lastScrollY;
                lastScrollY = currentScrollY;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.dataset.scrollDir = scrollingUp
                            ? "up"
                            : "down";
                        entry.target.classList.add("sr-visible");

                        if (once) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!once) {
                        entry.target.classList.remove("sr-visible");
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [once]);

    return (
        <Tag
            ref={ref}
            className={`sr-base sr-${variant} ${className}`.trim()}
            style={{
                "--sr-delay": `${delay}ms`,
                "--sr-duration": `${duration}ms`,
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
}
