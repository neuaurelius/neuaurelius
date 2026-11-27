import Nav from "./Nav";
import Hero from "./Hero";
import AccordionWall from "./AccordianWall";
import Publications from "./Publications";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Footer from "./Footer";
import Faq from "./Faq";
import Contact from "@/components/contact";

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
        next: { revalidate: 60 },
      }
    );
  } catch (error) {
    console.error("Failed to fetch featured publications:", error);
    return [];
  }
}

export default async function Homepage() {
  const publications = await getFeaturedPublications();

  const formattedPublications = (publications || []).map((publication) => ({
    ...publication,
    coverImage: publication.coverImage
      ? urlFor(publication.coverImage)
          .width(1800)
          .height(1200)
          .fit("crop")
          .auto("format")
          .url()
      : null,
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Neuaurelius?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Neuaurelius Private Limited is a research-driven technology company working at the intersection of robotics, artificial intelligence, and advanced engineering to develop technologies that enable intelligent systems to operate in the physical world.",
        },
      },
      {
        "@type": "Question",
        name: "What is Generalized Embodied Intelligence?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Generalized Embodied Intelligence refers to the development of intelligent systems that combine perception, reasoning, learning, and physical interaction to respond and adapt to unfamiliar environments.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Neuaurelius based?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Neuaurelius Private Limited operates from its corporate and research ecosystem at the Atal Incubation Centre, Manipal University Jaipur, Rajasthan, with its registered office in the Greater Kolkata Metropolitan Area, West Bengal, India.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <Hero />
      <AccordionWall />
      <Publications publications={formattedPublications} />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
