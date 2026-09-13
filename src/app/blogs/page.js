import Publications from "@/app/Publications";
import { getAllPublications } from "@/sanity/lib/publications";
import Nav from "../Nav";

export default async function BlogsPage() {
  const publications = await getAllPublications();

  return (
    <main>
      <Nav />
      <Publications
        publications={publications}
      />
    </main>
  );
}