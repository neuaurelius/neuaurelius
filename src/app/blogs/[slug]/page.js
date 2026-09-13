import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Nav from "../../Nav";
import { getAllPublications, getPublicationBySlug } from "@/sanity/lib/publications";
import "./publication.css";

export const dynamicParams = true;

export async function generateStaticParams() {
  const publications = await getAllPublications();
  return publications
    .filter((publication) => publication.slug?.current)
    .map((publication) => ({ slug: publication.slug.current }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) return {};

  const title = `${publication.title} — Neuaurelius`;
  const description = publication.excerpt || "Research and engineering from Neuaurelius.";
  const imageUrl = `/blogs/${slug}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/blogs/${slug}`,
      publishedTime: publication.publishedAt,
      authors: publication.author ? [publication.author] : undefined,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: publication.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: imageUrl, alt: publication.title }],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) notFound();

  return (
    <main className="publication-page">
      <Nav />

      <header className="publication-header">
        <div className="publication-kicker">
          {publication.category || "RESEARCH"}
        </div>

        <h1>{publication.title}</h1>

        <div className="publication-meta">
          <div className="publication-author">
            <span className="publication-author-avatar">
              {(publication.author || "N").trim().slice(0, 1).toUpperCase()}
            </span>
            <span>{publication.author || "NEUAURELIUS"}</span>
          </div>

          <div className="publication-meta-right">
            <span>{publication.publishedAt ? "Published" : ""}</span>
            <time>
              {publication.publishedAt
                ? new Date(publication.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                : ""}
            </time>
            <span>·</span>
            <span>8 min read</span>
          </div>
        </div>

      </header>

      <article className="publication-body">
        {publication.excerpt && (
          <p className="publication-lead">{publication.excerpt}</p>
        )}

        {publication.coverImage && (
          <div className="publication-cover">
            <img src={publication.coverImage} alt="" />
          </div>
        )}

        <PortableText value={publication.body || []} />
      </article>
    </main>
  );
}
