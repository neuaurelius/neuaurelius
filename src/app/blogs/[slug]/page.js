import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import PublicationReader from "./PublicationReader";
import { portableTextComponents } from "./PortableTextComponents";
import {
  getAllPublications,
  getPublicationBySlug,
} from "@/sanity/lib/publications";
import "katex/dist/katex.min.css";
import "./publication.css";

export const revalidate = 60;
export const dynamicParams = true;

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://neuaurelius.com"
).replace(/\/$/, "");

function calculateReadTime(blocks = []) {
  const text = blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child) => child.text).join(" ");
      }
      if (block._type === "latexBlock" && block.latex) {
        return block.latex;
      }
      if (block._type === "table" && block.rows) {
        return block.rows.map((r) => (r.cells || []).join(" ")).join(" ");
      }
      return "";
    })
    .join(" ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 136);

  return `${minutes < 1 ? 1 : minutes} min read`;
}

export async function generateStaticParams() {
  const publications = await getAllPublications();

  return (publications || [])
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
      title: "Publication Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  // Note: app/blogs/layout.js template automatically appends "| Neuaurelius"
  const title = publication.seoTitle || publication.title;
  const description =
    publication.seoDescription ||
    publication.excerpt ||
    "Research and engineering publication from Neuaurelius on Generalized Embodied Intelligence.";

  const pageUrl = `${SITE_URL}/blogs/${slug}`;

  const imageUrl =
    typeof publication.coverImage === "string"
      ? publication.coverImage.startsWith("http")
        ? publication.coverImage
        : `${SITE_URL}${publication.coverImage}`
      : `${SITE_URL}/og-image.png`;

  return {
    title,
    description,
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
      title: `${title} | Neuaurelius`,
      description,
      url: pageUrl,
      siteName: "Neuaurelius",
      publishedTime: publication.publishedAt
        ? new Date(publication.publishedAt).toISOString()
        : undefined,
      modifiedTime: publication._updatedAt
        ? new Date(publication._updatedAt).toISOString()
        : undefined,
      authors: [publication.author || "Neuaurelius"],
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
      title: `${title} | Neuaurelius`,
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

  const readTime = publication.readTime || calculateReadTime(publication.body);
  const pageUrl = `${SITE_URL}/blogs/${slug}`;
  const imageUrl =
    typeof publication.coverImage === "string"
      ? publication.coverImage.startsWith("http")
        ? publication.coverImage
        : `${SITE_URL}${publication.coverImage}`
      : `${SITE_URL}/og-image.png`;

  const publishedIso = publication.publishedAt
    ? new Date(publication.publishedAt).toISOString()
    : undefined;
  const modifiedIso = publication._updatedAt
    ? new Date(publication._updatedAt).toISOString()
    : publishedIso;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": pageUrl,
        },
        headline: publication.title,
        description:
          publication.excerpt ||
          "Research and engineering publication from Neuaurelius.",
        image: [imageUrl],
        datePublished: publishedIso,
        dateModified: modifiedIso,
        author: {
          "@type": publication.author ? "Person" : "Organization",
          name: publication.author || "Neuaurelius",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "Neuaurelius",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/og-image.png`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Publications",
            item: `${SITE_URL}/#publications`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: publication.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="publication-page">
        <header className="publication-header">
          <h1>{publication.title}</h1>

          <div className="publication-meta">
            <div className="publication-author">
              <span className="publication-author-avatar" aria-hidden="true">
                {(publication.author || "N")
                  .trim()
                  .slice(0, 1)
                  .toUpperCase()}
              </span>

              <span>{publication.author || "NEUAURELIUS"}</span>
            </div>

            <div className="publication-meta-right">
              {publication.publishedAt && (
                <>
                  <span className="meta-label">PUBLISHED</span>

                  <time dateTime={publishedIso}>
                    {new Date(publication.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
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
            <p className="publication-lead">{publication.excerpt}</p>
          )}

          {typeof publication.coverImage === "string" && (
            <figure className="publication-cover">
              <Image
                src={publication.coverImage}
                alt={publication.title}
                width={1200}
                height={675}
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                style={{ width: "100%", height: "auto" }}
              />
            </figure>
          )}

          <div className="publication-content">
            <PortableText
              value={publication.body || []}
              components={portableTextComponents}
            />
          </div>
        </article>
      </main>

      <PublicationReader title={publication.title} readTime={readTime} />
    </>
  );
}
