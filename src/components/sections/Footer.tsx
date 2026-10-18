"use client";

import { SplitChars, FadeUp } from "../Reveal";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden px-6 pb-10 pt-28 md:px-10 md:pt-40">
      <div className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-muted">
        <span className="text-accent">05</span>
        <span className="h-px w-10 bg-line" />
        <span>Contact</span>
      </div>
      <a href={`mailto:${profile.email}`} className="group block" data-cursor>
        <SplitChars as="h2" text="LET'S BREAK" className="font-display display-hero block" />
        <SplitChars as="h2" text="SOMETHING" className="font-display display-hero block text-outline italic transition-colors duration-500 group-hover:text-accent group-hover:[-webkit-text-stroke:0px]" />
      </a>
      <FadeUp delay={0.2}>
        <p className="mt-8 max-w-md text-muted">
          Open to junior QA and QA analyst roles — and to conversations about
          testing, dashboards, or why your release keeps slipping.
        </p>
      </FadeUp>
      <FadeUp delay={0.3}>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <a className="link-underline text-ink" href={`mailto:${profile.email}`}>Email</a>
          <a className="link-underline text-ink" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="link-underline text-ink" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </FadeUp>
      <div className="mt-20 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <span>© 2026 {profile.name}</span>
        <span>{profile.location} · {profile.timezone}</span>
        <span>Designed &amp; built with Next.js, Motion and Three.js</span>
      </div>
    </footer>
  );
}
