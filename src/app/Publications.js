"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./Publications.css";

function formatDate(value) {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

async function sharePublication(publication) {
    const slug =
        typeof publication.slug === "string"
            ? publication.slug
            : publication.slug?.current || "";
    const url = `${window.location.origin}/blogs/${slug}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: publication.title,
                text: publication.excerpt || "Neuaurelius publication",
                url,
            });
            return;
        } catch {
            return;
        }
    }

    try {
        await navigator.clipboard.writeText(url);
    } catch {
        // Clipboard can be unavailable in restricted browser contexts.
    }
}

function PublicationCard({ publication, index }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const slug =
        typeof publication.slug === "string"
            ? publication.slug
            : publication.slug?.current || "";

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (
            typeof window === "undefined" ||
            !("IntersectionObserver" in window) ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        if (!menuOpen) return;
        const handleOutsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("pointerdown", handleOutsideClick);
        return () =>
            document.removeEventListener("pointerdown", handleOutsideClick);
    }, [menuOpen]);

    return (
        <article
            ref={ref}
            className={`publication-card ${visible ? "is-visible" : ""}`}
            style={{ "--publication-delay": `${(index % 3) * 120}ms` }}
        >
            <Link
                href={`/blogs/${slug}`}
                className="publication-card-link"
            >
                <div className="publication-card-image">
                    {publication.coverImage ? (
                        <img
                            src={publication.coverImage}
                            alt={publication.title || "Cover Image"}
                        />
                    ) : (
                        <div className="publication-card-placeholder">
                            IMAGE
                        </div>
                    )}
                </div>
            </Link>

            <div className="publication-card-content">
                <div className="publication-card-header">
                    <Link
                        href={`/blogs/${slug}`}
                        className="publication-title-link"
                    >
                        <h2>{publication.title}</h2>
                    </Link>

                    <div className="publication-menu-container">
                        <button
                            type="button"
                            className="publication-menu-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setMenuOpen((prev) => !prev);
                            }}
                            aria-label="More options"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="8" cy="3" r="1.5" />
                                <circle cx="8" cy="8" r="1.5" />
                                <circle cx="8" cy="13" r="1.5" />
                            </svg>
                        </button>

                        {menuOpen && (
                            <div className="publication-dropdown-menu">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        sharePublication(publication);
                                        setMenuOpen(false);
                                    }}
                                >
                                    Share
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="publication-card-description">
                    {publication.excerpt || "Description details go here."}
                </p>

                {publication.publishedAt && (
                    <span className="publication-card-date">
                        {formatDate(publication.publishedAt)}
                    </span>
                )}
            </div>
        </article>
    );
}

export default function Publications({ publications = [], homepage = false }) {
    const items = Array.isArray(publications) ? publications : [];

    const gridClass =
        items.length === 1
            ? "publication-grid single-item"
            : items.length === 2
              ? "publication-grid two-items"
              : "publication-grid";

    return (
        <section className="publications-section" id="publications">
            <div className="publications-container">
                <div className="publications-header">
                    <h1>PUBLICATIONS</h1>
                </div>

                {items.length > 0 ? (
                    <div className={gridClass}>
                        {items.map((publication, index) => (
                            <PublicationCard
                                key={publication._id || publication.id || index}
                                publication={publication}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="publications-empty">
                        <span>00</span>
                        <p>
                            FEATURED PUBLICATIONS
                            <br />
                            WILL APPEAR HERE.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
