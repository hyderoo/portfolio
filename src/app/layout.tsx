import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Hafiz Hamdani — Software QA Engineer",
  description:
    "Portfolio of Hafiz (Dani) Hamdani, a software QA engineer in Jakarta working on mobile banking — and building dashboards and trackers on the side.",
  openGraph: {
    title: "Hafiz Hamdani — Software QA Engineer",
    description: "I break software before your users do.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
