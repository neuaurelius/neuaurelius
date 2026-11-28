"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function formatDateUpper(value) {
  if (!value) return "";
  return new Date(value)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

function BlogCard({ publication, index }) {
  const ref = useRef(null);
  const menuRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const articleHref = `/blogs/${publication.slug.current}`;

  const handleCopyLink = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = `${window.location.origin}${articleHref}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setMenuOpen(false);
      }, 1100);
    } catch {
      setMenuOpen(false);
    }
  };

  return (
    <article
      ref={ref}
      className={`pub-card ${visible ? "is-visible" : ""}`}
      style={{ "--blog-delay": `${Math.min(index, 8) * 55}ms` }}
    >
      <Link href={articleHref} className="pub-card-media-link">
        <div className="pub-card-image">
          {publication.coverImage ? (
            <img
              src={publication.coverImage}
              alt={publication.title}
              loading={index < 3 ? "eager" : "lazy"}
            />
          ) : (
            <div className="pub-card-fallback">N</div>
          )}
        </div>
      </Link>

      <div className="pub-card-title-row">
        <Link href={articleHref} className="pub-card-title-link">
          <h2>{publication.title}</h2>
        </Link>

        <div className="pub-card-menu" ref={menuRef}>
          <button
            type="button"
            className="pub-card-dots"
            aria-label="Publication options"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <circle cx="8" cy="3" r="1.35" />
              <circle cx="8" cy="8" r="1.35" />
              <circle cx="8" cy="13" r="1.35" />
            </svg>
          </button>

          {menuOpen && (
            <div className="pub-card-dropdown" role="menu">
              <Link
                href={articleHref}
                role="menuitem"
                className="pub-dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                Read publication ↗
              </Link>
              <button
                type="button"
                role="menuitem"
                className="pub-dropdown-item"
                onClick={handleCopyLink}
              >
                {copied ? "Link copied ✓" : "Copy link"}
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="pub-card-excerpt">
        {publication.excerpt || "Research and engineering from Neuaurelius."}
      </p>

      <time className="pub-card-date" dateTime={publication.publishedAt || undefined}>
        {formatDateUpper(publication.publishedAt)}
      </time>
    </article>
  );
}

export default function BlogGrid({ publications = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  const filterBarRef = useRef(null);
  const inputRef = useRef(null);

  // Extract unique categories dynamically from Sanity publications
  const categories = useMemo(() => {
    const set = new Set();
    publications.forEach((pub) => {
      if (pub.category && typeof pub.category === "string") {
        set.add(pub.category.trim());
      }
    });
    return ["ALL", ...Array.from(set)];
  }, [publications]);

  // Keyboard shortcut: "/" focuses search input
  useEffect(() => {
    const onKeyDown = (e) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setFiltersOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close filter popover when clicking outside
  useEffect(() => {
    if (!filtersOpen) return;
    const handleOutside = (e) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target)) {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [filtersOpen]);

  const activeFilterCount =
    (selectedCategory !== "ALL" ? 1 : 0) +
    (onlyFeatured ? 1 : 0) +
    (sortOrder !== "newest" ? 1 : 0);

  const filteredPublications = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matches = publications.filter((pub) => {
      if (
        selectedCategory !== "ALL" &&
        (pub.category || "").toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      if (onlyFeatured && !pub.featured) {
        return false;
      }

      if (!q) return true;

      const haystack = [
        pub.title,
        pub.excerpt,
        pub.category,
        pub.author,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });

    if (sortOrder === "oldest") {
      return [...matches].sort(
        (a, b) => new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0)
      );
    }

    if (sortOrder === "az") {
      return [...matches].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    }

    return matches;
  }, [publications, searchQuery, selectedCategory, onlyFeatured, sortOrder]);

  const resetAll = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setOnlyFeatured(false);
    setSortOrder("newest");
  };

  return (
    <div className="pubs-archive-shell">
      {/* Centered Pill Search & Filter Bar */}
      <div className="pubs-search-stage" ref={filterBarRef}>
        <div className="pubs-search-pill">
          <svg
            className="pubs-search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7.5" />
            <line x1="20.5" y1="20.5" x2="16.35" y2="16.35" />
          </svg>

          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Publications"
            aria-label="Search for Publications"
            className="pubs-search-input"
          />

          {searchQuery && (
            <button
              type="button"
              className="pubs-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          <button
            type="button"
            className={`pubs-filter-btn ${filtersOpen || activeFilterCount > 0 ? "is-active" : ""}`}
            onClick={() => setFiltersOpen((prev) => !prev)}
            aria-expanded={filtersOpen}
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="pubs-filter-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Expandable Filter Panel */}
        {filtersOpen && (
          <div className="pubs-filter-popover" role="region" aria-label="Filter publications">
            <div className="pubs-filter-group">
              <span className="pubs-filter-label">CATEGORY</span>
              <div className="pubs-filter-chips">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`pubs-chip ${selectedCategory === cat ? "is-selected" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "ALL" ? "All Topics" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pubs-filter-row">
              <div className="pubs-filter-group">
                <span className="pubs-filter-label">SORT BY</span>
                <div className="pubs-filter-chips">
                  <button
                    type="button"
                    className={`pubs-chip ${sortOrder === "newest" ? "is-selected" : ""}`}
                    onClick={() => setSortOrder("newest")}
                  >
                    Newest
                  </button>
                  <button
                    type="button"
                    className={`pubs-chip ${sortOrder === "oldest" ? "is-selected" : ""}`}
                    onClick={() => setSortOrder("oldest")}
                  >
                    Oldest
                  </button>
                  <button
                    type="button"
                    className={`pubs-chip ${sortOrder === "az" ? "is-selected" : ""}`}
                    onClick={() => setSortOrder("az")}
                  >
                    A – Z
                  </button>
                </div>
              </div>

              <div className="pubs-filter-group">
                <span className="pubs-filter-label">HIGHLIGHT</span>
                <button
                  type="button"
                  className={`pubs-chip ${onlyFeatured ? "is-selected" : ""}`}
                  onClick={() => setOnlyFeatured((prev) => !prev)}
                >
                  Featured Only
                </button>
              </div>
            </div>

            <div className="pubs-filter-footer">
              <span className="pubs-result-count">
                Showing {filteredPublications.length} of {publications.length}
              </span>
              {(activeFilterCount > 0 || searchQuery) && (
                <button
                  type="button"
                  className="pubs-reset-btn"
                  onClick={resetAll}
                >
                  Reset all
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Grid or Empty State */}
      {!filteredPublications.length ? (
        <div className="blogs-empty">
          <span>00</span>
          <div>
            <p>
              NO MATCHING
              <br />
              PUBLICATIONS.
            </p>
            {(searchQuery || activeFilterCount > 0) && (
              <button
                type="button"
                className="pubs-empty-reset"
                onClick={resetAll}
              >
                Clear search & filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <section className="pubs-grid" aria-label="Publications list">
          {filteredPublications.map((publication, index) => (
            <BlogCard
              key={publication._id}
              publication={publication}
              index={index}
            />
          ))}
        </section>
      )}
    </div>
  );
}
