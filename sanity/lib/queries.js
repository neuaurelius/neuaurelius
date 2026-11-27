import { sanityClient } from "./client";

const publicationFields = `
  _id,
  _updatedAt,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  author,
  featured,
  readTime,
  "coverImage": coverImage.asset->url
`;

export async function getFeaturedPublications() {
  try {
    const publications = await sanityClient.fetch(
      `*[
        _type == "publication" &&
        featured == true &&
        defined(slug.current) &&
        defined(publishedAt)
      ]
      | order(publishedAt desc)[0...3] {
        ${publicationFields}
      }`,
      {},
      {
        cache: "no-store",
      }
    );

    return publications || [];
  } catch (error) {
    console.error("Sanity featured publications error:", error);
    return [];
  }
}

export async function getAllPublications() {
  try {
    const publications = await sanityClient.fetch(
      `*[
        _type == "publication" &&
        defined(slug.current) &&
        defined(publishedAt)
      ]
      | order(publishedAt desc) {
        ${publicationFields}
      }`,
      {},
      {
        cache: "no-store",
      }
    );

    return publications || [];
  } catch (error) {
    console.error("Sanity publications error:", error);
    return [];
  }
}

export async function getPublication(slug) {
  try {
    const publication = await sanityClient.fetch(
      `*[
        _type == "publication" &&
        slug.current == $slug
      ][0] {
        ${publicationFields},
        seoTitle,
        seoDescription,
        body[]{
          ...,
          _type == "image" => {
            ...,
            "assetUrl": asset->url
          }
        }
      }`,
      { slug },
      {
        cache: "no-store",
      }
    );

    return publication || null;
  } catch (error) {
    console.error("Sanity publication error:", error);
    return null;
  }
}
