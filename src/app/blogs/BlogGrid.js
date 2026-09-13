"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BlogCard({ publication, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`blog-card ${visible ? "is-visible" : ""}`}
      style={{ "--blog-delay": `${index * 70}ms` }}
    >
      <Link href={`/blogs/${publication.slug.current}`} className="blog-card-link">
        <div className="blog-card-image">
          {publication.coverImage ? (
            <img src={publication.coverImage} alt="" />
          ) : (
            <div className="blog-card-fallback">N</div>
          )}
          <span>{String(index + 1).padStart(2, "0")}</span>
          <b>↗</b>
        </div>

        <div className="blog-card-meta">
          <span>{publication.category || "RESEARCH"}</span>
          <time>{formatDate(publication.publishedAt)}</time>
        </div>

        <h2>{publication.title}</h2>
        <p>{publication.excerpt || "Research and engineering from Neuaurelius."}</p>

        <div className="blog-card-footer">
          <span>{publication.author || "NEUAURELIUS"}</span>
          <span>READ ↗</span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogGrid({ publications }) {
  if (!publications.length) {
    return (
      <div className="blogs-empty">
        <span>00</span>
        <p>
          NO BLOGS
          <br />
          YET.
        </p>
      </div>
    );
  }

  return (
    <section className="blogs-grid">
      {publications.map((publication, index) => (
        <BlogCard key={publication._id} publication={publication} index={index} />
      ))}
    </section>
  );
}
