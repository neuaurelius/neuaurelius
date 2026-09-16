"use client";

import { useEffect, useRef, useState } from "react";
import "./JoinUs.css";

export default function JoinUs() {
    return (
        <section className="join-us" aria-labelledby="join-us-title" id="career">
            <div className="join-us-inner">
                <div className="join-us-content">
                    <h2 id="join-us-title">
                        WE ARE LOOKING FOR
                        <span>PEOPLE TO JOIN US.</span>
                    </h2>

                    <div className="join-us-action">
                        <p>
                            Bring your curiosity, discipline, and ambition
                            to work on meaningful systems with us.
                        </p>
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSflz6G350btGgbaeimPCbj1iGUr4ibNnhhbK0A616_xXFB6Gw/viewform?pli=1"
                            className="join-us-link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            JOIN NOW
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}