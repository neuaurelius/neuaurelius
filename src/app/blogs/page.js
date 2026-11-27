import Publications from "@/app/Publications";
import { getAllPublications } from "@/sanity/lib/publications";

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

export default async function BlogsPage() {
  const publications = (await getAllPublications()) || [];

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
      itemListElement: publications
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
      <Publications publications={publications} />
    </main>
  );
}
