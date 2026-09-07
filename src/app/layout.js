import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const gcepicpro = localFont({
  src: "../../public/assets/fonts/GCEPICPRO.ttf",
  variable: "--font-gcepicpro",
});

export const metadata = {
  title: "Neuaurelius",
  description: "Generalized Embodied Intelligence",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${gcepicpro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
