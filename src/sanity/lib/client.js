import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const validProjectId = /^[a-z0-9-]+$/.test(projectId || "");

export const sanityEnabled = validProjectId;

export const sanityClient = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-09-01",
      useCdn: true,
    })
  : null;
