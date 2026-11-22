"use client";

import "./Nav.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navRef = useRef(null);
    const menuRef = useRef(null);
    const lastScrollY = useRef(0);
    const menuOpenRef = useRef(false);

    const pathname = usePathname();

    useEffect(() => {
        menuOpenRef.current = menuOpen;
        if (menuOpen && navRef.current) {
            navRef.current.classList.remove("nav-hidden");
        }
    }, [menuOpen]);

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
       INSTANT ZERO-REACT-OVERHEAD SCROLL HANDLER
    ==================================================== */
    useEffect(() => {
        const navEl = navRef.current;
        if (!navEl) return;

        const heroEl = pathname === "/" ? document.querySelector(".hero") : null;

        const syncNavState = () => {
            const currentScrollY = window.scrollY;

            // 1. Instant theme switch based on actual Hero bottom edge
            const isPastHero =
                pathname !== "/"
                    ? true
                    : heroEl
                      ? heroEl.getBoundingClientRect().bottom <= 48
                      : currentScrollY > window.innerHeight - 48;

            navEl.classList.toggle("past-hero", isPastHero);

            // 2. Hide/show nav on scroll direction
            if (menuOpenRef.current || currentScrollY <= 0) {
                navEl.classList.remove("nav-hidden");
            } else if (currentScrollY < lastScrollY.current) {
                navEl.classList.remove("nav-hidden");
            } else if (currentScrollY > lastScrollY.current + 4) {
                navEl.classList.add("nav-hidden");
            }

            lastScrollY.current = currentScrollY;
        };

        lastScrollY.current = window.scrollY;
        syncNavState();

        window.addEventListener("scroll", syncNavState, { passive: true });
        window.addEventListener("resize", syncNavState, { passive: true });

        return () => {
            window.removeEventListener("scroll", syncNavState);
            window.removeEventListener("resize", syncNavState);
        };
    }, [pathname]);

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
            ref={navRef}
            className={`nav ${pathname !== "/" ? "past-hero" : ""}`}
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
                    {/* GPU-Scaled Drawer Surface */}
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
