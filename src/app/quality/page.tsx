import type { Metadata } from "next";
import Link from "next/link";
import ApiExplorer from "@/components/ApiExplorer";
import RunSuite from "@/components/RunSuite";

export const metadata: Metadata = {
  title: "Quality in numbers | Hafiz Hamdani",
  description:
    "Real test counts per project, what is not tested yet, live API checks against the USGS feed, and a changelog of bugs found and fixed in my own work.",
};

type Layers = { unit?: number; contract?: number; e2e?: number; manual?: number };

type ProjectQuality = {
  name: string;
  layers: Layers;
  runs: string;
  notTested: string[];
};

const PROJECTS: ProjectQuality[] = [
  {
    name: "APEX F1",
    layers: { unit: 101, contract: 19, e2e: 10 },
    runs: "Every push in GitHub Actions (lint, typecheck, unit, contract, e2e)",
    notTested: ["Push notification delivery on real devices", "Rate-limit behaviour under live provider throttling"],
  },
  {
    name: "Worlds 2026 Live",
    layers: { unit: 41 },
    runs: "Every push in GitHub Actions (lint, typecheck, unit, build)",
    notTested: ["End-to-end UI flows (no Playwright suite yet)", "Push delivery end to end"],
  },
  {
    name: "KARHUTLA Watch",
    layers: { e2e: 6 },
    runs: "Every push in GitHub Actions, against the deployed app",
    notTested: ["The live FIRMS path with a real API key", "Map tile interactions", "No unit tests yet"],
  },
  {
    name: "QuakeWatch",
    layers: { e2e: 6 },
    runs: "Every push in GitHub Actions, against the deployed app",
    notTested: ["Alert sound", "Provider failure states", "No unit tests yet"],
  },
  {
    name: "ShelfSeeker",
    layers: { e2e: 39 },
    runs: "In the ShelfSeeker E2E repo, desktop and mobile emulation, every push",
    notTested: ["Firebase auth failure paths", "Barcode scanner on real devices"],
  },
  {
    name: "F1 public APIs (Postman)",
    layers: { contract: 13 },
    runs: "Newman in GitHub Actions, 41 assertions across 13 requests",
    notTested: ["Load and rate-limit behaviour"],
  },
  {
    name: "Dewa Management App",
    layers: { unit: 6 },
    runs: "Local only: 6 Dart unit/widget tests plus a Maestro smoke flow, no CI",
    notTested: ["Most UI flows", "CI automation entirely"],
  },
  {
    name: "SauceDemo (manual sample)",
    layers: { manual: 22 },
    runs: "22 designed cases; 11 re-executed live on 18 Oct 2026, 4 bugs filed",
    notTested: [],
  },
];

const LAYER_ORDER: { key: keyof Layers; label: string; color: string }[] = [
  { key: "unit", label: "unit", color: "bg-emerald-500/70" },
  { key: "contract", label: "API / contract", color: "bg-sky-500/70" },
  { key: "e2e", label: "end to end", color: "bg-accent/80" },
  { key: "manual", label: "manual", color: "bg-amber-500/70" },
];

const CHANGELOG = [
  {
    repo: "karhutla-watch",
    date: "16 Oct 2026",
    title: "Production crash on the FIRMS proxy",
    body: "The province-boundary import worked locally but crashed the deployed serverless function with FUNCTION_INVOCATION_FAILED. Found it by hitting the live endpoint, fixed by inlining the geometry.",
    sha: "263a5364a20ec4ad1f4194289655d5d58970578f",
  },
  {
    repo: "apex-f1",
    date: "18 Oct 2026",
    title: "Push notifications silently never worked",
    body: "The env parsing read the wrong variable names, so the VAPID keys were always undefined and every push setup quietly failed. Found while wiring the notification flow, fixed at the parser.",
    sha: "a0ea1832290e88a76e9222e9cfc361cdb85090cb",
  },
  {
    repo: "apex-f1",
    date: "18 Oct 2026",
    title: "Team badges invisible in light theme",
    body: "White-on-transparent badge artwork disappeared on the light background. Rendered them on a dark plate instead of recolouring the artwork.",
    sha: "9b8b6c9aa4d1cfac6ccd571b729b39187e0a293d",
  },
  {
    repo: "worlds-2026-live",
    date: "17 Oct 2026",
    title: "Push reminders fired for unchanged matches",
    body: "Every sync tick reminded subscribers about matches that had not changed. Reminders now only consider real changes, and the sync endpoint is idempotent.",
    sha: "c41c38d894dcf38835902a0dc1754e57bb4e6012",
  },
  {
    repo: "worlds-2026-live",
    date: "17 Oct 2026",
    title: "Team rosters silently corrupted by a parser change",
    body: "The Liquipedia scraper misread Person templates, dropping players from team pages. Fixed the parsing and added a refetch when a roster is missing.",
    sha: "6982e87ee39c2bf44a16a4ee08eed7f8436609a1",
  },
  {
    repo: "ShelfSeeker-e2e",
    date: "16 Oct 2026",
    title: "Published test report broke on every run",
    body: "node_modules leaked into the gh-pages branch and broke the Pages build. The publish step now cleans untracked files before adding the report.",
    sha: "9b99367eeaa3c67d310927ba2a0abc2a9260bccf",
  },
];

function LayerBar({ layers }: { layers: Layers }) {
  const total = LAYER_ORDER.reduce((s, l) => s + (layers[l.key] ?? 0), 0);
  return (
    <div className="mt-3 flex h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10">
      {LAYER_ORDER.map((l) =>
        layers[l.key] ? (
          <div
            key={l.key}
            className={l.color}
            style={{ width: `${((layers[l.key] ?? 0) / total) * 100}%` }}
            title={`${l.label}: ${layers[l.key]}`}
          />
        ) : null
      )}
    </div>
  );
}

export default function QualityPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-24 pt-28 md:px-10">
      <Link href="/" className="text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent">
        Back to home
      </Link>
      <h1 className="mt-6 font-display text-4xl md:text-6xl">Quality, in numbers.</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        Every number on this page is counted from the real repository it names, and the
        &quot;not tested yet&quot; lists are kept on purpose: a tester who hides gaps is
        not a tester you want.
      </p>

      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl">Test coverage per project</h2>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.15em] text-muted">
          {LAYER_ORDER.map((l) => (
            <span key={l.key} className="inline-flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${l.color}`} />
              {l.label}
            </span>
          ))}
        </div>
        <div className="mt-8 space-y-8">
          {PROJECTS.map((p) => {
            const counts = LAYER_ORDER.filter((l) => p.layers[l.key])
              .map((l) => `${p.layers[l.key]} ${l.label}`)
              .join(" / ");
            return (
              <article key={p.name} className="border-b border-white/10 pb-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <span className="text-sm text-muted">{counts}</span>
                </div>
                <LayerBar layers={p.layers} />
                <p className="mt-2 text-sm text-muted">{p.runs}</p>
                {p.notTested.length > 0 && (
                  <p className="mt-2 text-sm text-muted">
                    <span className="text-accent">Not tested yet: </span>
                    {p.notTested.join("; ")}.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-2xl md:text-3xl">Live API checks</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          The same style of assertions I write in Postman, executed right now from your
          browser against the public USGS earthquake feed that powers QuakeWatch. Nothing
          here is cached or staged.
        </p>
        <ApiExplorer />
        <div className="mt-10">
          <h3 className="font-display text-xl">Trigger a real CI run</h3>
          <RunSuite />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-2xl md:text-3xl">Bugs I found and fixed in my own projects</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          A tester&apos;s own code should not get a free pass. Each entry links the real
          fix commit.
        </p>
        <div className="mt-8 space-y-6">
          {CHANGELOG.map((c) => (
            <article key={c.sha} className="rounded-lg border border-white/10 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold">{c.title}</h3>
                <span className="text-xs uppercase tracking-[0.15em] text-muted">
                  {c.repo} · {c.date}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              <a
                href={`https://github.com/hyderoo/${c.repo}/commit/${c.sha}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-ink"
              >
                Fix commit {c.sha.slice(0, 7)}
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
