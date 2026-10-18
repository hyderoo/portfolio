import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

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
    description:
      "QA engineer in Jakarta working on mobile banking, with case studies in API testing, Playwright E2E and live data apps.",
    type: "website",
    url: "https://portfolio-rust-iota-p4cmnje6xm.vercel.app/",
    siteName: "Hafiz Hamdani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafiz Hamdani — Software QA Engineer",
    description:
      "QA engineer in Jakarta working on mobile banking, with case studies in API testing, Playwright E2E and live data apps.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="grain">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
