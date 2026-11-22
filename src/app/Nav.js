"use client";

import "./Nav.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);

    const menuRef = useRef(null);
    const lastScrollY = useRef(0);

    const isPastHeroRef = useRef(false);
    const navHiddenRef = useRef(false);

    const pathname = usePathname();

    /* ====================================================
       CLOSE MENU ON OUTSIDE POINTER TAP OR ESCAPE KEY
    ==================================================== */
    useEffect(() => {
        if (!menuOpen) return;

        const handleOutsidePointer = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsidePointer);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handleOutsidePointer);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [menuOpen]);

    /* ====================================================
       OPTIMISED RAF-THROTTLED SCROLL HANDLER
    ==================================================== */
    useEffect(() => {
        let rafId = null;

        const updateScrollState = () => {
            const currentScrollY = window.scrollY;
            const heroThreshold = window.innerHeight - 80;

            const nextPastHero =
                pathname !== "/" || currentScrollY > heroThreshold;

            if (nextPastHero !== isPastHeroRef.current) {
                isPastHeroRef.current = nextPastHero;
                setIsPastHero(nextPastHero);
            }

            let nextNavHidden = navHiddenRef.current;

            if (menuOpen) {
                nextNavHidden = false;
            } else if (
                currentScrollY <= 0 ||
                currentScrollY < lastScrollY.current
            ) {
                nextNavHidden = false;
            } else if (
                currentScrollY > lastScrollY.current + 4
            ) {
                nextNavHidden = true;
            }

            if (nextNavHidden !== navHiddenRef.current) {
                navHiddenRef.current = nextNavHidden;
                setNavHidden(nextNavHidden);
            }

            lastScrollY.current = currentScrollY;
            rafId = null;
        };

        const onScroll = () => {
            if (rafId === null) {
                rafId = window.requestAnimationFrame(updateScrollState);
            }
        };

        lastScrollY.current = window.scrollY;
        updateScrollState();

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, [pathname, menuOpen]);

    /* ====================================================
       SECTION LINKS
    ==================================================== */
    const sectionLink = (section) => {
        return pathname === "/" ? `#${section}` : `/#${section}`;
    };

    /* ====================================================
       RENDER
    ==================================================== */
    return (
        <nav
            className={`nav ${navHidden ? "nav-hidden" : ""} ${
                isPastHero ? "past-hero" : ""
            }`}
        >
            <div className="nav-container">
                {/* LOGO */}
                <div className="nav-brand">
                    <Link href="/" aria-label="Neuaurelius Home">
                        <Image
                            src="/assets/logo/neuaureliusLogo_1.svg"
                            alt="Neuaurelius Logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </Link>

                    <Link href="/" tabIndex={-1} aria-hidden="true">
                        <Image
                            src="/assets/logo/textLogo.svg"
                            alt="Neuaurelius"
                            width={200}
                            height={40}
                            priority
                            className="textLogo"
                        />
                    </Link>
                </div>

                {/* COMPOSITED MENU MORPH WRAPPER */}
                <div
                    ref={menuRef}
                    className={`menu-morph ${menuOpen ? "is-open" : ""}`}
                >
                    {/* GPU-Scaled Drawer Surface (Animates strictly via transform + opacity) */}
                    <div className="menu-surface" aria-hidden="true" />

                    {/* Trigger Pill */}
                    <button
                        type="button"
                        className="menu-toggle"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        <div className="menu-icon">
                            <span />
                            <span />
                        </div>

                        <span className="menu-toggle-text">
                            <span className="menu-text">Menu</span>
                            <span className="close-text">Close</span>
                        </span>
                    </button>

                    {/* Staggered Navigation Links */}
                    <div className="menu-content">
                        <div className="menu-section">
                            <ul className="menu-list">
                                <li style={{ "--item-index": 0 }}>
                                    <Link
                                        href={sectionLink("aboutus")}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        About Us
                                    </Link>
                                </li>

                                <li style={{ "--item-index": 1 }}>
                                    <Link
                                        href={sectionLink("publications")}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Publications
                                    </Link>
                                </li>

                                <li style={{ "--item-index": 2 }}>
                                    <Link
                                        href={sectionLink("faq")}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        FAQs
                                    </Link>
                                </li>

                                <li style={{ "--item-index": 3 }}>
                                    <Link
                                        href={sectionLink("contact")}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
