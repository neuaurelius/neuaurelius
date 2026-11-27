import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./Footer.css";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/neuaurelius/",
    icon: "bx bxl-linkedin",
  },
  {
    name: "X",
    href: "https://x.com/neuaurelius",
    icon: "bx bxl-twitter",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/neuaurelius/",
    icon: "bx bxl-instagram",
  },
  {
    name: "GitHub",
    href: "https://github.com/neuaurelius",
    icon: "bx bxl-github",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@neuaurelius",
    icon: "bx bxl-youtube",
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-card">
        <div className="footer-main">
          <div className="footer-brand-col">
            <div className="footer-logo-wrap">
              <Link href="/" aria-label="Neuaurelius Home">
                <Image
                  src="/assets/logo/textLogo.svg"
                  alt="Neuaurelius"
                  width={156}
                  height={32}
                  className="footer-logo-img"
                />
              </Link>
            </div>

            <p className="footer-intro">
              For research, engineering, collaboration, investment, or other
              enquiries, contact us. Please do not send confidential or
              proprietary material without prior agreement.
            </p>

            <a href="mailto:post@neuaurelius.com" className="footer-email">
              <span>post@neuaurelius.com</span>
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </a>

            <div className="footer-socials" aria-label="Social Media Links">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="footer-social-btn"
                >
                  <i className={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-col">
              <h4>Registered Office</h4>
              <p>
                <strong>Neuaurelius Pvt Ltd</strong>
                <br />
                Mathurapur,
                <br />
                Greater Kolkata Metropolitan Area,
                <br />
                North 24 Parganas - 700127,
                <br />
                West Bengal, India
              </p>
            </div>

            <div className="footer-col">
              <h4>Corporate &amp; Branch Office</h4>
              <p>
                Atal Incubation Center,
                <br />
                Manipal University Jaipur, Dahmi Kalan,
                <br />
                Near Jaipur-Ajmer Rd, Bagru,
                <br />
                Jaipur, Rajasthan - 303007,
                <br />
                India
              </p>
            </div>

            <div className="footer-col">
              <h4>Corporate Identity</h4>
              <p className="footer-cin-block">
                <span className="footer-meta-label">CIN</span>
                <strong>U72100WR2026PTC296270</strong>
              </p>

              <h4 className="footer-sub-heading">Grievance Officer</h4>
              <p>
                <strong>Arkadeep Nag</strong>
                <br />
                <a href="tel:+919046901047">+91-90469-01047</a>
                <br />
                <a href="mailto:arkadeep@neuaurelius.com">
                  arkadeep@neuaurelius.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-top">
            <span className="footer-copyright">
              © 2026 Neuaurelius Pvt Ltd. All Rights Reserved.
            </span>
          </div>

          <p className="footer-legal-notice">
            <strong>Site and Brand Usage:</strong> Neuaurelius name, marks,
            written content, visual material, research material, and other site
            assets must not be copied, reproduced, modified, redistributed,
            presented as third-party work, or used commercially without prior
            written permission. Public information on this site does not grant
            any licence or right to use confidential, proprietary, or
            unpublished material.
          </p>
        </div>
      </div>
    </footer>
  );
}
