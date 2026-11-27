import Publications from "@/app/Publications";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://neuaurelius.com"
).replace(/\/$/, "");

export const metadata = {
  title: "Publications & Research",
  description:
    "Explore technical publications, research notes, and engineering updates on Generalized Embodied Intelligence and humanoid robotics from Neuaurelius.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    type: "website",
    title: "Publications & Research | Neuaurelius",
    description:
      "Technical publications, research notes, and engineering updates on Generalized Embodied Intelligence from Neuaurelius.",
    url: `${SITE_URL}/blogs`,
    siteName: "Neuaurelius",
  },
};

const allPublicationsQuery = `
  *[
    _type == "publication" &&
    defined(slug.current)
  ]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    _updatedAt,
    author,
    featured,
    coverImage
  }
`;

async function fetchAllPublications() {
  try {
    return await sanityClient.fetch(
      allPublicationsQuery,
      {},
      {
        next: { revalidate: 60 },
      }
    );
  } catch (error) {
    console.error("Failed to fetch all publications:", error);
    return [];
  }
}

export default async function BlogsPage() {
  const publications = await fetchAllPublications();

  const formattedPublications = (publications || []).map((publication) => ({
    ...publication,
    coverImage: publication.coverImage
      ? urlFor(publication.coverImage)
          .width(900)
          .height(600)
          .fit("crop")
          .quality(82)
          .auto("format")
          .url()
      : null,
  }));

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/blogs#collection`,
    url: `${SITE_URL}/blogs`,
    name: "Publications & Research | Neuaurelius",
    description:
      "Technical publications, research notes, and engineering updates from Neuaurelius.",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: formattedPublications
        .filter((pub) => pub?.slug?.current)
        .map((pub, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/blogs/${pub.slug.current}`,
          name: pub.title,
        })),
    },
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd),
        }}
      />
      <Publications publications={formattedPublications} />
    </main>
  );
}
