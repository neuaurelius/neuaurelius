import Nav from "../Nav";
import Footer from "../Footer";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://neuaurelius.com"
).replace(/\/$/, "");

export const metadata = {
  title: {
    default: "Publications & Research | Neuaurelius",
    template: "%s | Neuaurelius",
  },
  description:
    "Technical publications, research papers, and engineering updates on Generalized Embodied Intelligence and robotics from Neuaurelius.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    type: "website",
    siteName: "Neuaurelius",
    title: "Publications & Research | Neuaurelius",
    description:
      "Technical publications, research papers, and engineering updates from Neuaurelius.",
    url: `${SITE_URL}/blogs`,
  },
};

export default function BlogsLayout({ children }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      />
      <Nav />
      <div className="blogs-shell flex-1">{children}</div>
      <Footer />
    </>
  );
}
