import { getAllPublications } from "@/sanity/lib/publications";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://neuaurelius.com";

export default async function sitemap() {
    const publications = await getAllPublications();

    return [
        {
            url: siteUrl,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${siteUrl}/blogs`,
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...publications
            .filter((publication) => publication.slug?.current)
            .map((publication) => ({
                url: `${siteUrl}/blogs/${publication.slug.current}`,
                lastModified: publication.publishedAt,
                changeFrequency: "monthly",
                priority: 0.8,
            })),
    ];
}