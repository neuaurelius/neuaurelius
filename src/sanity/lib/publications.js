import { sanityClient, sanityEnabled } from "./client";
import { urlFor } from "./image";

const PUBLICATION_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  author,
  featured,
  coverImage
`;

const normalizeImageSource = (source) => {
  if (typeof source !== "string") return source;

  if (/^https?:\/\//i.test(source)) return source;

  const assetId = source.split("?", 1)[0].replace(
    /\.(jpg|jpeg|png|webp|gif)$/i,
    "-$1"
  );

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: assetId,
    },
  };
};

const normalizePublication = (publication) => ({
  ...publication,
  coverImage: publication.coverImage
    ? urlFor(normalizeImageSource(publication.coverImage))
      .width(1800)
      .height(1200)
      .fit("crop")
      .auto("format")
      .url()
    : null,
});

export async function getFeaturedPublications(limit = 3) {
  if (!sanityEnabled) return [];

  const publications = await sanityClient.fetch(
    `*[
      _type == "publication" &&
      featured == true &&
      defined(slug.current) &&
      defined(publishedAt)
    ] | order(publishedAt desc)[0...${limit}] { ${PUBLICATION_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ["publications"] } }
  );

  return publications.map(normalizePublication);
}

export async function getAllPublications() {
  if (!sanityEnabled) return [];

  const publications = await sanityClient.fetch(
    `*[
      _type == "publication" &&
      defined(slug.current) &&
      defined(publishedAt)
    ] | order(publishedAt desc) { ${PUBLICATION_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ["publications"] } }
  );

  return publications.map(normalizePublication);
}

export async function getPublicationBySlug(slug) {
  if (!sanityEnabled) return null;

  const publication = await sanityClient.fetch(
    `*[
      _type == "publication" &&
      slug.current == $slug
    ][0] {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      author,
      featured,
      coverImage,
      body
    }`,
    { slug },
    { next: { revalidate: 60, tags: ["publications", `publication:${slug}`] } }
  );

  if (!publication) return null;

  return {
    ...publication,
    coverImage: publication.coverImage
      ? urlFor(normalizeImageSource(publication.coverImage))
        .width(2200)
        .height(1400)
        .fit("crop")
        .auto("format")
        .url()
      : null,
  };
}
