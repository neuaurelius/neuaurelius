export async function getPublicationBySlug(slug) {
    if (!slug) return null;
    if (!sanityEnabled) return null;

    const query = `*[
    _type == "publication" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    excerpt,
    category,
    author,
    publishedAt,
    coverImage,
    body
  }`;

    // Pass { slug } as the second argument here
    const publication = await sanityClient.fetch(query, { slug });
    return publication;
}