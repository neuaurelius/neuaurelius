import Nav from "./Nav";
import Hero from "./Hero";
import AccordionWall from "./AccordianWall";
import Publications from "./Publications";
import Collaboration from "./Collaboration"

import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Footer from "./Footer";
import JoinUs from "./JoinUs";

const featuredPublicationsQuery = `
    *[
        _type == "publication" &&
        featured == true &&
        defined(slug.current)
    ]
    | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        excerpt,
        category,
        publishedAt,
        author,
        featured,
        coverImage
    }
`;

async function getFeaturedPublications() {
    try {
        return await sanityClient.fetch(
            featuredPublicationsQuery,
            {},
            {
                cache: "no-store",
            }
        );
    } catch (error) {
        console.error(
            "Failed to fetch featured publications:",
            error
        );

        return [];
    }
}

export default async function Homepage() {
    const publications = await getFeaturedPublications();

    const formattedPublications = publications.map(
        (publication) => ({
            ...publication,

            coverImage: publication.coverImage
                ? urlFor(publication.coverImage)
                    .width(1800)
                    .height(1200)
                    .fit("crop")
                    .auto("format")
                    .url()
                : null,
        })
    );

    return (
        <>
            <Nav />

            <Hero />

            <AccordionWall id="aboutus" />

            <Publications
                publications={formattedPublications}
            />
            <Collaboration />
            <JoinUs />

            <Footer />
        </>
    );
}