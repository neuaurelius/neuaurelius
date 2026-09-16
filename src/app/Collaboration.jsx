"use client";

import "./Collaboration.css";

export default function Collaboration() {
    return (
        <section
            className="preincubated"
            aria-labelledby="preincubated-title"
        >
            <div className="preincubated-inner">

                {/* LOGOS */}
                <div className="preincubated-branding">
                    <div className="preincubated-logo aic-logo">
                        <img
                            src="https://www.aicmuj.com/logo.webp"
                            alt="Atal Incubation Center Manipal University Jaipur"
                        />
                    </div>

                    <span className="preincubated-x" aria-hidden="true">
                        ×
                    </span>

                    <div className="preincubated-logo neu-logo">
                        <img
                            src="/assets/logo/textLogo.svg"
                            alt="Neuaurelius"
                        />
                    </div>
                </div>

                {/* AFFILIATION */}
                <div className="preincubated-content">
                    <span className="preincubated-eyebrow">
                        PREINCUBATED AT
                    </span>

                    <h2 id="preincubated-title">
                        Atal Incubation Center
                    </h2>

                    <p>
                        Manipal University Jaipur
                    </p>
                </div>

            </div>
        </section>
    );
}