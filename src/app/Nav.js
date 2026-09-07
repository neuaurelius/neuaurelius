"use client";

import "./Nav.css";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="nav">

            <div className="nav-container">

                {/* LOGO */}
                <div className="nav-brand">
                    <Image
                        src="/assets/logo/neuaureliusLogo_1.svg"
                        alt="Neuaurelius Logo"
                        width={40}
                        height={40}
                        priority
                    />

                    <Image
                        src="/assets/logo/textLogo.svg"
                        alt="Neuaurelius Text Logo"
                        width={200}
                        height={40}
                        priority
                        className="textLogo"
                    />
                </div>


                {/* =================================================
                    ONE SINGLE MORPHING OBJECT
                   ================================================= */}

                <div
                    className={`menu-morph ${menuOpen ? "is-open" : ""
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
                                    <a
                                        href="#"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        About Us
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#about"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Research
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#services"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Team
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#contact"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Careers
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/careers"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                    >
                                        Contact
                                    </a>
                                </li>

                            </ul>

                        </div>




                    </div>

                </div>

            </div>

        </nav>
    );
}