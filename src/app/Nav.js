"use client";

import "./Nav.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);

    const menuRef = useRef(null);
    const lastScrollY = useRef(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (
                currentScrollY <= 0 ||
                currentScrollY < lastScrollY.current
            ) {
                setNavHidden(false);
            } else if (currentScrollY > lastScrollY.current) {
                setNavHidden(true);
            }

            lastScrollY.current = currentScrollY;
        };

        lastScrollY.current = window.scrollY;

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    const sectionLink = (section) => {
        return pathname === "/" ? `#${section}` : `/#${section}`;
    };

    return (
        <nav className={`nav ${navHidden ? "nav-hidden" : ""}`}>
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

                {/* MENU */}
                <div
                    ref={menuRef}
                    className={`menu-morph ${
                        menuOpen ? "is-open" : ""
                    }`}
                >

                    {/* TOP CONTROL */}
                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={
                            menuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                    >
                        <div className="menu-icon">
                            <span />
                            <span />
                        </div>

                        <span className="menu-toggle-text">
                            <span className="menu-text">
                                Menu
                            </span>

                            <span className="close-text">
                                Close
                            </span>
                        </span>
                    </button>

                    {/* MENU CONTENT */}
                    <div className="menu-content">
                        <div className="menu-section">

                            <ul className="menu-list">

                                <li>
                                    <Link
                                        href={sectionLink("aboutus")}
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        About Us
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={sectionLink("research")}
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Research
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={sectionLink("publications")}
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Publications
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={sectionLink("contact")}
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
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
