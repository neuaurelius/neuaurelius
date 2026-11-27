import { getAllPublications } from "@/sanity/lib/publications";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://neuaurelius.com"
).replace(/\/$/, "");

function toValidDate(dateValue) {
  if (!dateValue) return new Date();
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap() {
  let publications = [];

  try {
    publications = await getAllPublications();
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  const blogEntries = (publications || [])
    .filter((pub) => pub?.slug?.current)
    .map((pub) => ({
      url: `${SITE_URL}/blogs/${encodeURIComponent(pub.slug.current)}`,
      lastModified: toValidDate(pub._updatedAt || pub.publishedAt),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
