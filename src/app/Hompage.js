import Nav from "./Nav";
import Hero from "./Hero";
import AccordionWall from "./AccordianWall";
import Publications from "./Publications";
import "./JoinUs.css";

import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Footer from "./Footer";

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

            <section className="join-us" aria-labelledby="join-us-title">
                <div className="join-us-inner">
                    <div className="join-us-content">
                        <h2 id="join-us-title">
                            WE ARE LOOKING FOR
                            <br />
                            <span>PEOPLE TO JOIN US.</span>
                        </h2>

                        <div className="join-us-action">
                            <p>
                                Bring your curiosity, discipline, and ambition
                                to work on meaningful systems with us.
                            </p>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSflz6G350btGgbaeimPCbj1iGUr4ibNnhhbK0A616_xXFB6Gw/viewform?pli=1"
                                className="join-us-link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                JOIN NOW
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}