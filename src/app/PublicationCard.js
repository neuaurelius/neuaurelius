"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    // Clipboard unavailable
  }
}

export default function PublicationCard({ publication, index }) {
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
      <Link href={`/blogs/${slug}`} className="publication-card-link">
        <div
          className="publication-card-image"
          style={{ position: "relative" }}
        >
          {publication.coverImage ? (
            <Image
              src={publication.coverImage}
              alt={publication.title || "Neuaurelius Publication Cover"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="publication-card-placeholder">IMAGE</div>
          )}
        </div>
      </Link>

      <div className="publication-card-content">
        <div className="publication-card-header">
          <Link href={`/blogs/${slug}`} className="publication-title-link">
            <h3 style={{
              fontFamily: "var(--font-gcepicpro), sans-serif",
              fontSize: "1.5em",
              fontWeight: 400,
              letterSpacing: "0.02em",
              lineHeight: 1.1,
              margin: 0,
            }}>
              {publication.title}
            </h3>
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
          <time
            className="publication-card-date"
            dateTime={new Date(publication.publishedAt).toISOString()}
          >
            {formatDate(publication.publishedAt)}
          </time>
        )}
      </div>
    </article>
  );
}
