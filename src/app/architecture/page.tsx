import type { Metadata } from "next";
import Link from "next/link";

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
];

export default function ArchitecturePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-28 md:px-10">
      <Link href="/" className="text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent">
        Back to home
      </Link>
      <h1 className="mt-6 font-display text-4xl md:text-6xl">Architecture.</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Every diagram on this page is drawn from the actual repository: real routes, real
        tables, real cron schedules. Where a diagram type does not apply to a project,
        that is stated instead of drawn.
      </p>

      {PROJECTS.map((p) => (
        <section key={p.name} id={p.slug} className="mt-20 scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl md:text-3xl">{p.name}</h2>
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-ink"
            >
              Repository
            </a>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{p.intro}</p>

          {p.skipped && (
            <ul className="mt-4 space-y-1 text-sm text-muted">
              {p.skipped.map((s) => (
                <li key={s}>
                  <span className="text-accent">Skipped: </span>
                  {s}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 space-y-10">
            {p.diagrams.map((d) => (
              <figure key={d.file}>
                <figcaption className="mb-3 text-sm font-semibold">
                  {d.title}
                  {d.note && <span className="ml-2 text-xs font-normal text-muted">{d.note}</span>}
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
