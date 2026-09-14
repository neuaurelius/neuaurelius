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
  src: "./fonts/GCEPICPRO.ttf",
  variable: "--font-gcepicpro",
  display: "block",
  preload: true,
  fallback: "Arial",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://neuaurelius.com"
  ),

  title: {
    default: "Neuaurelius | Generalized Embodied Intelligence",
    template: "%s | Neuaurelius",
  },

  description:
    "Neuaurelius is an independent research and engineering venture pursuing Generalized Embodied Intelligence through robotics, computation, energy, materials, and advanced engineering.",

  keywords: [
    "Neuaurelius",
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
      url: "https://neuaurelius.com",
    },
  ],

  creator: "Neuaurelius",
  publisher: "Neuaurelius",
  applicationName: "Neuaurelius",

  alternates: {
    canonical: "/",
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
    url: "/",
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
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${gcepicpro.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}