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
    const ticking = useRef(false);

    const pathname = usePathname();


    /* ====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ==================================================== */

    useEffect(() => {
        if (!menuOpen) return;

        const handleOutsideClick = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [menuOpen]);


    /* ====================================================
       RAF-THROTTLED SCROLL HANDLER (ZERO REDUNDANT RENDERS)
    ==================================================== */

    useEffect(() => {
        const updateScrollState = () => {
            const currentScrollY = window.scrollY;
            const heroThreshold = window.innerHeight - 80;

            const nextPastHero =
                pathname !== "/" || currentScrollY > heroThreshold;

            setIsPastHero((prev) =>
                prev !== nextPastHero ? nextPastHero : prev
            );

            if (currentScrollY <= 0 || currentScrollY < lastScrollY.current) {
                setNavHidden((prev) => (prev ? false : prev));
            } else if (currentScrollY > lastScrollY.current + 4) {
                setNavHidden((prev) => (!prev ? true : prev));
            }

            lastScrollY.current = currentScrollY;
            ticking.current = false;
        };

        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateScrollState);
                ticking.current = true;
            }
        };

        lastScrollY.current = window.scrollY;
        updateScrollState();

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
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
            className={`nav ${navHidden ? "nav-hidden" : ""} ${
                isPastHero ? "past-hero" : ""
            }`}
        >
            <div className="nav-container">

                {/* LOGO */}
                <div className="nav-brand">
                    <Link href="/">
                        <Image
                            src="/assets/logo/neuaureliusLogo_1.svg"
                            alt="Neuaurelius Logo"
                            width={40}
                            height={40}
                            priority
                        />
                    </Link>

                    <Link href="/">
                        <Image
                            src="/assets/logo/textLogo.svg"
                            alt="Neuaurelius Text Logo"
                            width={200}
                            height={40}
                            priority
                            className="textLogo"
                        />
                    </Link>
                </div>

                {/* MENU MORPH CONTAINER */}
                <div
                    ref={menuRef}
                    className={`menu-morph ${menuOpen ? "is-open" : ""}`}
                >
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

                    <div className="menu-content">
                        <div className="menu-section">
                            <ul className="menu-list">
                                <li>
                                    <Link
                                        href={sectionLink("aboutus")}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={sectionLink("career")}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Career
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={sectionLink("publications")}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Publications
                                    </Link>
                                </li>
                                <li>
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
