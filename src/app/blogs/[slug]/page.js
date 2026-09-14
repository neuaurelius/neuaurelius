import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Nav from "../../Nav";
import Footer from "../../Footer";
import PublicationReader from "./PublicationReader";
import {
  getAllPublications,
  getPublicationBySlug,
} from "@/sanity/lib/publications";
import "./publication.css";

export const dynamicParams = true;

// Calculate actual reading time from PortableText blocks
function calculateReadTime(blocks = []) {
  const text = blocks
    .map((block) =>
      block._type === "block" && block.children
        ? block.children.map((child) => child.text).join(" ")
        : ""
    )
    .join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 136);

  return `${minutes < 1 ? 1 : minutes} min read`;
}

export async function generateStaticParams() {
  const publications = await getAllPublications();

  return publications
    .filter((publication) => publication.slug?.current)
    .map((publication) => ({
      slug: publication.slug.current,
    }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${publication.title} | Neuaurelius`;
  const description =
    publication.excerpt ||
    "Research and engineering from Neuaurelius.";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.neuaurelius.com";

  const pageUrl = `${siteUrl}/blogs/${slug}`;

  const imageUrl = publication.coverImage
    ? publication.coverImage.startsWith("http")
      ? publication.coverImage
      : `${siteUrl}${publication.coverImage}`
    : `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),

    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "article",
      title,
      description,
      url: pageUrl,
      siteName: "Neuaurelius",
      publishedTime: publication.publishedAt,
      authors: publication.author
        ? [publication.author]
        : ["Neuaurelius"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: publication.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: publication.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const readTime = calculateReadTime(publication.body);

  return (
    <>
      <Nav />



      <main id="main-content" className="publication-page">
        <header className="publication-header">



          <h1>{publication.title}</h1>

          <div className="publication-meta">

            <div className="publication-author">
              <span
                className="publication-author-avatar"
                aria-hidden="true"
              >
                {(publication.author || "N")
                  .trim()
                  .slice(0, 1)
                  .toUpperCase()}
              </span>

              <span>
                {publication.author || "NEUAURELIUS"}
              </span>
            </div>

            <div className="publication-meta-right">

              {publication.publishedAt && (
                <>
                  <span className="meta-label">
                    PUBLISHED
                  </span>

                  <time
                    dateTime={new Date(
                      publication.publishedAt
                    ).toISOString()}
                  >
                    {new Date(
                      publication.publishedAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>

                  <span aria-hidden="true">·</span>
                </>
              )}

              <span>{readTime}</span>

            </div>
          </div>

        </header>

        <article className="publication-body">

          {publication.excerpt && (
            <p className="publication-lead">
              {publication.excerpt}
            </p>
          )}

          {publication.coverImage && (
            <figure className="publication-cover">
              <img
                src={publication.coverImage}
                alt={publication.title}
                loading="eager"
              />
            </figure>
          )}

          <div className="publication-content">
            <PortableText value={publication.body || []} />
          </div>

        </article>
      </main>
      <PublicationReader
        title={publication.title}
        readTime={readTime}
      />
      <Footer />
    </>
  );
}
