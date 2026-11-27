import { sanityClient } from "./client";

const sanityEnabled = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

const fullPublicationProjection = `
  _id,
  _updatedAt,
  title,
  slug,
  excerpt,
  category,
  author,
  publishedAt,
  featured,
  readTime,
  seoTitle,
  seoDescription,
  "coverImage": coverImage.asset->url,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "assetUrl": asset->url
    }
  }
`;

export async function getAllPublications() {
  if (!sanityEnabled) return [];

  const query = `*[
    _type == "publication" &&
    defined(slug.current) &&
    defined(publishedAt)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    author,
    publishedAt,
    featured,
    readTime,
    "coverImage": coverImage.asset->url
  }`;

  const publications = await sanityClient.fetch(
    query,
    {},
    { cache: "no-store" }
  );
  return publications || [];
}

export async function getPublicationBySlug(slug) {
  if (!slug) return null;
  if (!sanityEnabled) return null;

  const query = `*[
    _type == "publication" &&
    slug.current == $slug
  ][0] {
    ${fullPublicationProjection}
  }`;

  const publication = await sanityClient.fetch(
    query,
    { slug },
    { cache: "no-store" }
  );
  return publication || null;
}
