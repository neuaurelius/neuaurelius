"use client";

import "./Nav.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandExpanded, setBrandExpanded] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const lastScrollY = useRef(0);
  const menuOpenRef = useRef(false);
  const brandTimerRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    menuOpenRef.current = menuOpen;
    if (menuOpen && navRef.current) {
      navRef.current.classList.remove("nav-hidden");
    }
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (brandTimerRef.current) {
        clearTimeout(brandTimerRef.current);
      }
    };
  }, []);

  const handleBrandTouchClick = (e) => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (!isTouch) return;

    if (!brandExpanded) {
      e.preventDefault();
      setBrandExpanded(true);
      if (brandTimerRef.current) {
        clearTimeout(brandTimerRef.current);
      }
      brandTimerRef.current = setTimeout(() => {
        setBrandExpanded(false);
      }, 2600);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsidePointer = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    if (pathname !== "/") {
      navEl.classList.add("past-hero");
      return;
    }

    const heroEl = document.querySelector(".hero");

    const syncTheme = () => {
      const isPastHero = heroEl
        ? heroEl.getBoundingClientRect().bottom <= 48
        : window.scrollY > window.innerHeight - 48;
      navEl.classList.toggle("past-hero", isPastHero);
    };

    let observer;
    if (heroEl && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          navEl.classList.toggle("past-hero", !entry.isIntersecting);
        },
        {
          rootMargin: "-48px 0px 0px 0px",
          threshold: 0,
        }
      );
      observer.observe(heroEl);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      syncTheme();

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
    syncTheme();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", syncTheme, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", syncTheme);
    };
  }, [pathname]);

  const sectionLink = (section) => {
    return pathname === "/" ? `#${section}` : `/#${section}`;
  };

  return (
    <nav
      ref={navRef}
      aria-label="Primary Navigation"
      className={`nav ${pathname !== "/" ? "past-hero" : ""}`}
    >
      <div className="nav-container">
        <Link
          href="/"
          aria-label="Neuaurelius Home"
          className={`nav-brand ${brandExpanded ? "is-expanded" : ""}`}
          onClick={handleBrandTouchClick}
        >
          <Image
            src="/assets/logo/neuaureliusLogo_1.svg"
            alt="Neuaurelius Logo"
            width={40}
            height={40}
            priority
          />
          <Image
            src="/assets/logo/textLogo.svg"
            alt="Neuaurelius"
            width={200}
            height={40}
            priority
            className="textLogo"
          />
        </Link>

        <div
          ref={menuRef}
          className={`menu-morph ${menuOpen ? "is-open" : ""}`}
        >
          <div className="menu-surface" aria-hidden="true" />

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
                <li style={{ "--item-index": 0 }}>
                  <Link
                    href={sectionLink("aboutus")}
                    onClick={() => setMenuOpen(false)}
                  >
                    About Us
                  </Link>
                </li>

                <li style={{ "--item-index": 1 }}>
                  <Link href={sectionLink("faq")} onClick={() => setMenuOpen(false)}>
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
