import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const gcepicpro = localFont({
  src: "../../public/assets/fonts/GCEPICPRO.ttf",
  variable: "--font-gcepicpro",
  display: "swap",
  preload: true,
});

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://neuaurelius.com"
).replace(/\/$/, "");

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Neuaurelius | Generalized Embodied Intelligence",
    template: "%s | Neuaurelius",
  },

  description:
    "Neuaurelius is an independent research and engineering venture pursuing Generalized Embodied Intelligence through robotics, computation, energy, materials, and advanced engineering.",

  keywords: [
    "Neuaurelius",
    "Neuaurelius Private Limited",
    "Generalized Embodied Intelligence",
    "Embodied Intelligence",
    "Artificial Intelligence",
    "Robotics",
    "Robotic Intelligence",
    "Research",
    "Engineering",
    "R&D",
    "Computational Systems",
    "Energy",
    "Materials Science",
  ],

  authors: [
    {
      name: "Neuaurelius",
      url: SITE_URL,
    },
  ],

  creator: "Neuaurelius",
  publisher: "Neuaurelius",
  applicationName: "Neuaurelius",

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Neuaurelius",
    title: "Neuaurelius | Generalized Embodied Intelligence",
    description:
      "Independent research and engineering toward Generalized Embodied Intelligence across robotics, computation, energy, materials, and advanced engineering.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Neuaurelius | Generalized Embodied Intelligence",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@neuaurelius",
    creator: "@neuaurelius",
    title: "Neuaurelius | Generalized Embodied Intelligence",
    description:
      "Independent research and engineering toward Generalized Embodied Intelligence.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Neuaurelius",
        legalName: "Neuaurelius Private Limited",
        alternateName: ["Neuaurelius", "Neuaurelius Robotics"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/og-image.png`,
        },
        email: "post@neuaurelius.com",
        sameAs: [
          "https://www.linkedin.com/company/neuaurelius/",
          "https://x.com/neuaurelius",
          "https://www.instagram.com/neuaurelius/",
          "https://github.com/neuaurelius",
          "https://www.youtube.com/@neuaurelius",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "post@neuaurelius.com",
          contactType: "customer support",
        },
        description:
          "Independent research and engineering venture pursuing Generalized Embodied Intelligence through robotics, computation, energy, and materials.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Neuaurelius",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${gcepicpro.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
