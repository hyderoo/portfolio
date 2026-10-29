import type { Metadata } from "next";
import { profile } from "@/lib/data";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { FloatingLang, LangProvider } from "@/lib/lang";

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
  metadataBase: new URL("https://hafizhamdani.my.id"),
  alternates: { canonical: "/" },
  title: "Hafiz Hamdani | Software QA Engineer",
  description:
    "Portfolio of Hafiz (Dani) Hamdani, a software QA engineer in Jakarta working on mobile banking, and building dashboards and trackers on the side.",
  openGraph: {
    title: "Hafiz Hamdani | Software QA Engineer",
    description:
      "QA engineer in Jakarta working on mobile banking, with case studies in API testing, Playwright E2E and live data apps.",
    type: "website",
    url: "https://hafizhamdani.my.id/",
    siteName: "Hafiz Hamdani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hafiz Hamdani | Software QA Engineer",
    description:
      "QA engineer in Jakarta working on mobile banking, with case studies in API testing, Playwright E2E and live data apps.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
              url: "https://hafizhamdani.my.id",
              sameAs: [profile.github, profile.linkedin],
            }),
          }}
        />
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="text-outline" x="-5%" y="-5%" width="110%" height="110%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="1.5" result="d" />
            <feFlood floodColor="#f2ede3" result="c" />
            <feComposite in="c" in2="d" operator="in" result="ring" />
            <feComposite in="ring" in2="SourceAlpha" operator="out" />
          </filter>
        </svg>
        <LangProvider>
          {children}
          <FloatingLang />
        </LangProvider>
      </body>
    </html>
  );
}
