import type { Metadata } from "next";
import Link from "next/link";
import TestStatus from "@/components/TestStatus";
import RiskMap from "@/components/RiskMap";
import { StrategyIntro } from "@/components/I18nBlocks";
import { T } from "@/lib/lang";

export const metadata: Metadata = {
  alternates: { canonical: "/strategy" },
  openGraph: {
    title: "Test strategy: Worlds 2026 Live | Hafiz Hamdani",
    description: "How the Worlds 2026 Live tracker is tested: 41 vitest cases across sync integrity, match state, auth, roster scraping, calendar feed, pick'em, push and forms, running in CI on every push.",
    url: "/strategy",
  },
  title: "Test strategy: Worlds 2026 Live | Hafiz Hamdani",
  description:
    "How the Worlds 2026 Live tracker is tested: 41 vitest cases across sync integrity, match state, auth, roster scraping, calendar feed, pick'em, push and forms, running in CI on every push.",
};



const RUNS =
  "Every push and pull request runs the same gate in GitHub Actions: ESLint, a strict TypeScript check, all 41 vitest cases, then a production build. A failing gate blocks the merge. The badge at the top of this page reads the latest run live from the GitHub Actions API.";
const GAP1 =
  "No browser-level end-to-end tests in this repo. The suite is unit and integration level. UI flows are verified manually before each deploy. (My ShelfSeeker project is where I keep the full Playwright E2E practice.)";
const GAP2 =
  "The live feed's real schema drift is only caught at sync time; the sync tests pin behaviour with recorded fixtures, not against the live API.";

export default function StrategyPage() {
  return (
    <main className="px-6 pb-28 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link href="/#work" className="link-underline text-sm text-muted hover:text-ink">
          &larr; <T>{"← Back to selected work"}</T>
        </Link>

        <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-accent"><T>Case study</T></p>
        <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
          <T>Test strategy: Worlds 2026 Live</T>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          <StrategyIntro />
        </p>
        <TestStatus repo="hyderoo/worlds-2026-live" workflow="CI" />

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">41</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted"><T>Vitest cases</T></p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">8</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted"><T>Risk areas</T></p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">4</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted"><T>CI gates: lint, types, tests, build</T></p>
          </div>
        </div>

        <h2 className="mt-16 font-display text-2xl md:text-3xl"><T>What is covered, by risk</T></h2>
        <RiskMap />

        <h2 className="mt-16 font-display text-2xl md:text-3xl"><T>How it runs</T></h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          <T>{RUNS}</T>
        </p>

        <h2 className="mt-16 font-display text-2xl md:text-3xl"><T>Known gaps, said out loud</T></h2>
        <ul className="mt-4 max-w-2xl space-y-2">
          <li className="flex gap-3 text-sm leading-relaxed text-ink/85">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <T>{GAP1}</T>
          </li>
          <li className="flex gap-3 text-sm leading-relaxed text-ink/85">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            <T>{GAP2}</T>
          </li>
        </ul>

        <div className="mt-16 flex flex-wrap gap-6 border-t border-line pt-8 text-sm">
          <a href="https://worlds2026.web.id" target="_blank" rel="noreferrer" className="link-underline text-ink">
            <T>Live app</T>
          </a>
          <a href="https://github.com/hyderoo/worlds-2026-live" target="_blank" rel="noreferrer" className="link-underline text-ink">
            <T>Repository</T>
          </a>
          <a href="https://github.com/hyderoo/worlds-2026-live/tree/HEAD/tests" target="_blank" rel="noreferrer" className="link-underline text-muted hover:text-ink">
            <T>The tests themselves</T>
          </a>
        </div>
      </div>
    </main>
  );
}
