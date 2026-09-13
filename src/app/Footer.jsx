import React from 'react'
import Image from "next/image";
import './Footer.css'
function Footer() {
    return (
        <footer id="contact" className="site-footer">
            <div className="footer-inner">

                {/* TOP */}
                <div className="footer-top">

                    <div className="footer-primary">
                        <div className="footer-eyebrow">

                            CONTACT
                        </div>



                        <a
                            href="mailto:post@neuaurelius.com"
                            className="email-link"
                        >
                            post@neuaurelius.com
                            <span className="email-arrow">↗</span>
                        </a>

                        <p className="footer-intro">
                            For research, engineering, collaboration,
                            investment, or other enquiries, contact us.
                            Please do not send confidential or proprietary
                            material without prior agreement.
                        </p>
                    </div>


                    {/* SOCIAL */}
                    <div className="footer-social">
                        <h4>Connect</h4>

                        <div className="social-links">

                            <a
                                href="https://www.linkedin.com/company/neuaurelius/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="social-link"
                            >
                                <span className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 8V18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M6 5.5V5.4"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M11 18V8"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M11 12.5C11 10 12.5 8 15 8C17.5 8 19 9.7 19 12.5V18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </span>

                                <span>LinkedIn</span>

                                <span className="social-arrow">
                                    ↗
                                </span>
                            </a>


                            <a
                                href="https://x.com/neuaurelius"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="X"
                                className="social-link"
                            >
                                <span className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 4L19 20"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />
                                        <path
                                            d="M19 4L5 20"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />
                                    </svg>
                                </span>

                                <span>X / Twitter</span>

                                <span className="social-arrow">
                                    ↗
                                </span>
                            </a>


                            <a
                                href="https://www.instagram.com/neuaurelius/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="social-link"
                            >
                                <span className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <rect
                                            x="4"
                                            y="4"
                                            width="16"
                                            height="16"
                                            rx="4"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />

                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="3.5"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        />

                                        <circle
                                            cx="17"
                                            cy="7"
                                            r="1"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </span>

                                <span>Instagram</span>

                                <span className="social-arrow">
                                    ↗
                                </span>
                            </a>


                            <a
                                href="https://github.com/neuaurelius"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="social-link"
                            >
                                <span className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.53-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18A10.8 10.8 0 0 1 12 6.37c.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.35.77 1.04.77 2.1v3.11c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                    </svg>
                                </span>

                                <span>GitHub</span>

                                <span className="social-arrow">
                                    ↗
                                </span>
                            </a>

                            <a
                                href="https://www.youtube.com/@neuaurelius"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                                className="social-link"
                            >
                                <span className="social-icon">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                                    </svg>
                                </span>

                                <span>YouTube</span>

                                <span className="social-arrow">
                                    ↗
                                </span>
                            </a>

                        </div>
                    </div>
                </div>


                {/* OFFICES */}
                <div className="footer-offices">

                    <div className="footer-section-label">
                        LOCATIONS
                    </div>

                    <div className="office-grid">

                        <div className="office">
                            <h4>
                                Registered Office
                            </h4>

                            <p>
                                <strong>
                                    Neuaurelius Pvt Ltd
                                </strong>
                                <br />
                                Mathurapur,
                                <br />
                                Greater Kolkata Metropolitan Area,
                                <br />
                                North 24 Parganas — 700127,
                                <br />
                                West Bengal, India
                            </p>
                        </div>


                        <div className="office">
                            <h4>
                                Corporate & Branch Office
                            </h4>

                            <p>
                                Atal Incubation Center,
                                <br />
                                Manipal University Jaipur,
                                Dahmi Kalan,
                                <br />
                                Near Jaipur-Ajmer Rd, Bagru,
                                <br />
                                Jaipur, Rajasthan — 303007,
                                <br />
                                India
                            </p>
                        </div>


                        <div className="office office-identity">
                            <h4>
                                Corporate Identity
                            </h4>

                            <p>
                                CIN
                                <br />

                                <strong>
                                    U72100WR2026PTC296270
                                </strong>
                            </p>
                        </div>

                    </div>
                </div>


                {/* BOTTOM */}
                <div className="footer-bottom">

                    <div className="footer-legal">

                        <div className="copyright">
                            © 2026 Neuaurelius Pvt Ltd.
                            All Rights Reserved.
                        </div>

                        <p>
                            <strong>
                                Site and Brand Usage:
                            </strong>{" "}
                            Neuaurelius name, marks, written content,
                            visual material, research material, and
                            other site assets must not be copied,
                            reproduced, modified, redistributed,
                            presented as third-party work, or used
                            commercially without prior written
                            permission. Public information on this
                            site does not grant any licence or right
                            to use confidential, proprietary, or
                            unpublished material.
                        </p>

                    </div>


                    <div className="grievance">

                        <h4>
                            Grievance Officer
                        </h4>

                        <p>
                            Arkadeep Nag
                            <br />

                            <a href="tel:+919046901047">
                                +91-90469-01047
                            </a>

                            <br />

                            <a href="mailto:arkadeep@neuaurelius.com">
                                arkadeep@neuaurelius.com
                            </a>
                        </p>

                    </div>

                </div>


                {/* BRAND MARK */}
                <div className="footer-mark">
                    <Image
                        src="/assets/logo/textLogo.svg"
                        alt="Neuaurelius Text Logo"
                        width={200}
                        height={40}
                        priority
                        className="textLogo"
                    />

                </div>

            </div>
        </footer>
    )
}

export default Footer