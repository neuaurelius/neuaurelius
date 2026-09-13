import createImageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

export function urlFor(source) {
  if (!sanityClient) return null;
  return createImageUrlBuilder(sanityClient).image(source);
}
