import { createClient } from "next-sanity";

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset:
        process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

    apiVersion: "2026-01-01",

    // false is useful while developing because
    // newly published Sanity content appears immediately.
    useCdn: false,
});