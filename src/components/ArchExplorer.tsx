"use client";

import { useEffect, useState } from "react";
import { T, TImg, useLang } from "@/lib/lang";
import { DEWA_APK_URL } from "@/lib/data";

type Diagram = { file: string; title: string; note?: string };
type Shot = { file: string; alt: string };
type ProjectArch = {
  slug: string;
  name: string;
  repo: string;
  apk?: string;
  intro: string;
  diagrams: Diagram[];
  shots?: Shot[];
  skipped?: string[];
};

const PROJECTS: ProjectArch[] = [
  {
    slug: "worlds",
    name: "Worlds 2026 Live",
    repo: "https://github.com/hyderoo/worlds-2026-live",
    intro:
      "Next.js PWA on Vercel with Supabase storage, synced from the official lolesports feed by a GitHub Actions cron every 5 minutes.",
    diagrams: [
      { file: "worlds-context", title: "System context" },
      { file: "worlds-sequence", title: "Sequence: a sync tick" },
      { file: "worlds-dfd0", title: "Data flow diagram, level 0" },
      { file: "worlds-dfd1-sync", title: "Data flow diagram, level 1: sync pipeline" },
      { file: "worlds-usecase", title: "Use case" },
      { file: "worlds-erd", title: "Entity relationship", note: "Columns from supabase/migrations/0001_init.sql." },
    ],
  },
  {
    slug: "quakewatch",
    name: "QuakeWatch",
    repo: "https://github.com/hyderoo/quakewatch",
    intro:
      "Next.js dashboard that fetches the USGS, BMKG and JMA feeds directly from the browser and merges them into one live view.",
    diagrams: [
      { file: "quakewatch-context", title: "System context" },
      { file: "quakewatch-sequence", title: "Sequence: page load and alert evaluation" },
      { file: "quakewatch-dfd0", title: "Data flow diagram, level 0" },
      { file: "quakewatch-usecase", title: "Use case" },
    ],
    skipped: [
      "No ERD: the app has no database. Alert rules live in React state and reset on reload.",
      "No deeper DFD levels: level 0 already covers the whole data flow.",
    ],
  },
  {
    slug: "apex-f1",
    name: "APEX F1",
    repo: "https://github.com/hyderoo/apex-f1",
    intro:
      "Next.js app on Vercel with 18 pages and 18 API route handlers, backed by 24 Supabase tables. Results sync via a daily Vercel cron; push reminders are dispatched by a GitHub Actions schedule every 15 minutes.",
    diagrams: [
      { file: "apex-context", title: "System context" },
      { file: "apex-sequence", title: "Sequence: dashboard load" },
      { file: "apex-dfd0", title: "Data flow diagram, level 0" },
      { file: "apex-usecase", title: "Use case" },
      { file: "apex-erd", title: "Entity relationship", note: "Keys only; full columns in supabase/migrations." },
    ],
    skipped: ["No DFD level 1: the sync detail lives in the sequence diagram; redrawing it as a DFD would add nothing."],
  },
  {
    slug: "karhutla",
    name: "KARHUTLA Watch",
    repo: "https://github.com/hyderoo/karhutla-watch",
    intro:
      "React + Vite SPA on Vercel with two serverless proxy functions. Live sources need no key (Open-Meteo, EONET); FIRMS and OpenAQ connect when keys are configured, and the UI labels every panel LIVE, DEMO or NOT CONNECTED accordingly.",
    diagrams: [
      { file: "karhutla-context", title: "System context" },
      { file: "karhutla-sequence", title: "Sequence: page load with no FIRMS key" },
      { file: "karhutla-dfd0", title: "Data flow diagram, level 0" },
      { file: "karhutla-usecase", title: "Use case" },
    ],
    skipped: ["No ERD: the app has no database.", "No deeper DFD levels: level 0 covers the whole flow."],
  },
  {
    slug: "shelfseeker",
    name: "ShelfSeeker",
    repo: "https://github.com/hyderoo/ShelfSeeker",
    intro:
      "React SPA hosted on Firebase Hosting. All book data comes from the OpenLibrary API; the reading list persists in localStorage. No Firebase services are used, hosting only.",
    diagrams: [
      { file: "shelfseeker-context", title: "System context" },
      { file: "shelfseeker-sequence", title: "Sequence: search and save to reading list" },
      { file: "shelfseeker-dfd0", title: "Data flow diagram, level 0" },
      { file: "shelfseeker-usecase", title: "Use case" },
    ],
    skipped: ["No ERD: the only persistence is a localStorage list."],
  },
  {
    slug: "shelfseeker-e2e",
    name: "ShelfSeeker E2E",
    repo: "https://github.com/hyderoo/ShelfSeeker-e2e",
    intro:
      "A test repository, so its architecture is a pipeline: 39 Playwright tests against the deployed ShelfSeeker app, publishing a results dashboard and an Allure report on every run.",
    diagrams: [{ file: "shelfseeker-e2e-pipeline", title: "CI pipeline" }],
    skipped: ["Context, DFD, use case and ERD do not apply to a test suite; the pipeline is the architecture."],
  },
  {
    slug: "dewa",
    name: "Dewa Management App",
    repo: "https://github.com/hyderoo/dewa-apk",
    apk: DEWA_APK_URL,
    intro:
      "Flutter Android app on BLoC cubits over a repository layer, talking to the Dewa Management REST API at dewamanagement.com, with WhatsApp deep links for follow-ups.",
    diagrams: [
      { file: "dewa-context", title: "System context" },
      { file: "dewa-sequence", title: "Sequence: sign in, browse, order" },
      { file: "dewa-dfd0", title: "Data flow diagram, level 0" },
      { file: "dewa-usecase", title: "Use case" },
    ],
    shots: [
      { file: "dewa-register", alt: "Dewa app: registration screens" },
      { file: "dewa-login", alt: "Dewa app: login screen" },
      { file: "dewa-home", alt: "Dewa app: home page" },
      { file: "dewa-services", alt: "Dewa app: services page" },
      { file: "dewa-custom-package", alt: "Dewa app: custom package and calendar" },
      { file: "dewa-order-form", alt: "Dewa app: order form with confirmation dialog" },
      { file: "dewa-portfolio", alt: "Dewa app: portfolio list and detail" },
      { file: "dewa-team", alt: "Dewa app: team list and member detail" },
      { file: "dewa-orders", alt: "Dewa app: orders, order detail and payment history" },
      { file: "dewa-payment", alt: "Dewa app: payment methods and payment detail" },
      { file: "dewa-account", alt: "Dewa app: account settings" },
      { file: "dewa-profile", alt: "Dewa app: profile settings" },
      { file: "dewa-privacy", alt: "Dewa app: privacy policy" },
    ],
    skipped: ["No ERD: the database lives behind the company backend and its schema is not in this repository."],
  },
];

const pillBase =
  "rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300";
const pillOn = "border-accent text-accent";
const pillOff = "border-line text-muted hover:border-accent/50 hover:text-ink";

export default function ArchExplorer() {
  const { t } = useLang();
  const [slug, setSlug] = useState(PROJECTS[0].slug);
  const [view, setView] = useState(0);

  useEffect(() => {
    const h = window.location.hash.replace("#", "");
    if (PROJECTS.some((x) => x.slug === h)) setSlug(h);
  }, []);

  const p = PROJECTS.find((x) => x.slug === slug) ?? PROJECTS[0];
  const shotsTab = p.shots ? p.diagrams.length : -1;
  const showingShots = view === shotsTab;
  const diagram = p.diagrams[Math.min(view, p.diagrams.length - 1)];

  function select(next: string) {
    setSlug(next);
    setView(0);
    try {
      history.replaceState(null, "", `#${next}`);
    } catch {}
  }

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2" role="group" aria-label={t("Projects")}>
        {PROJECTS.map((x, i) => (
          <button
            key={x.slug}
            type="button"
            aria-pressed={x.slug === slug}
            onClick={() => select(x.slug)}
            className={`${pillBase} ${x.slug === slug ? pillOn : pillOff}`}
          >
            <span className="mr-2 text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            {x.name}
          </button>
        ))}
      </div>

      <section key={p.slug} className="mt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl md:text-3xl">{p.name}</h2>
          <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
            {p.apk && (
              <a
                href={p.apk}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-ink"
              >
                <T>Android APK for demo</T>
              </a>
            )}
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-ink"
            >
              <T>Repository</T>
            </a>
          </span>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted"><T>{p.intro}</T></p>

        {p.skipped && (
          <ul className="mt-4 space-y-1 text-sm text-muted">
            {p.skipped.map((s) => (
              <li key={s}>
                <span className="text-accent"><T>Skipped: </T></span>
                <T>{s}</T>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t("Diagrams")}>
          {p.diagrams.map((d, i) => (
            <button
              key={d.file}
              type="button"
              aria-pressed={!showingShots && view === i}
              onClick={() => setView(i)}
              className={`${pillBase} ${!showingShots && view === i ? pillOn : pillOff}`}
            >
              <T>{d.title}</T>
            </button>
          ))}
          {p.shots && (
            <button
              type="button"
              aria-pressed={showingShots}
              onClick={() => setView(shotsTab)}
              className={`${pillBase} ${showingShots ? pillOn : pillOff}`}
            >
              <T>App screens</T>
            </button>
          )}
        </div>

        {showingShots && p.shots ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {p.shots.map((s) => (
              <div key={s.file} className="flex items-center justify-center rounded-lg border border-white/10 bg-black/30 p-3">
                <TImg
                  src={`/dewa-app/${s.file}.webp`}
                  alt={s.alt}
                  loading="lazy"
                  className="max-h-[420px] max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <figure className="mt-6">
            <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/architecture/${diagram.file}.svg`}
                alt={`${p.name}: ${t(diagram.title)}`}
                className="mx-auto max-h-[75vh] max-w-full object-contain"
              />
            </div>
            {diagram.note && (
              <figcaption className="mt-3 text-xs text-muted">
                <T>{diagram.note}</T>
              </figcaption>
            )}
          </figure>
        )}
      </section>
    </div>
  );
}
