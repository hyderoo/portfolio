import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/lib/lang";
import { DEWA_APK_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Architecture | Hafiz Hamdani",
  description:
    "System context, sequence, data flow, use case and ER diagrams for each project, drawn from the real code and schemas in the repositories.",
};

type Diagram = { file: string; title: string; note?: string };
type ProjectArch = {
  slug: string;
  name: string;
  repo: string;
  apk?: string;
  intro: string;
  diagrams: Diagram[];
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
    skipped: ["No ERD: the database lives behind the company backend and its schema is not in this repository."],
  },
];

const INTRO =
  "Every diagram on this page is drawn from the actual repository: real routes, real tables, real cron schedules. Where a diagram type does not apply to a project, that is stated instead of drawn.";

export default function ArchitecturePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-28 md:px-10">
      <Link href="/" className="text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent">
        <T>Back to home</T>
      </Link>
      <h1 className="mt-6 font-display text-4xl md:text-6xl"><T>Architecture.</T></h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        <T>{INTRO}</T>
      </p>

      <p className="mt-3 max-w-2xl text-sm text-muted lang-ja-only">
        <T>Diagram labels are kept in English on purpose, so they match the route, table and service names in the code.</T>
      </p>

      {PROJECTS.map((p) => (
        <section key={p.name} id={p.slug} className="mt-20 scroll-mt-24">
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
                <T>Android APK for demo, install at own risk</T>
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

          <div className="mt-8 space-y-10">
            {p.diagrams.map((d) => (
              <figure key={d.file}>
                <figcaption className="mb-3 text-sm font-semibold">
                  <T>{d.title}</T>
                  {d.note && (
                    <span className="ml-2 text-xs font-normal text-muted">
                      <T>{d.note}</T>
                    </span>
                  )}
                </figcaption>
                <div className="overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/architecture/${d.file}.svg`} alt={`${p.name}: ${d.title}`} className="mx-auto max-w-full" />
                </div>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
