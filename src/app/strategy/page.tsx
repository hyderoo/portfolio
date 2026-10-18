import type { Metadata } from "next";
import Link from "next/link";
import TestStatus from "@/components/TestStatus";
import RiskMap from "@/components/RiskMap";

export const metadata: Metadata = {
  title: "Test strategy: Worlds 2026 Live | Hafiz Hamdani",
  description:
    "How the Worlds 2026 Live tracker is tested: 41 vitest cases across sync integrity, match state, auth, roster scraping, calendar feed, pick'em, push and forms, running in CI on every push.",
};



export default function StrategyPage() {
  return (
    <main className="px-6 pb-28 pt-28 md:px-10 md:pt-36">
      <div className="mx-auto max-w-4xl">
        <Link href="/#work" className="link-underline text-sm text-muted hover:text-ink">
          &larr; Back to selected work
        </Link>

        <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-accent">Case study</p>
        <h1 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
          Test strategy: Worlds 2026 Live
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          Worlds 2026 Live is a real-time tracker for the League of Legends World Championship: a
          Next.js PWA that syncs the official lolesports feed into Supabase every minute and serves
          a match center, bracket, standings, pick&apos;em and push notifications. This page is how
          I keep it honest: every claim below comes from the repo&apos;s <code>tests/</code>{" "}
          directory and CI workflow, not from memory.
        </p>
        <TestStatus repo="hyderoo/worlds-2026-live" workflow="CI" />

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">41</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Vitest cases</p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">8</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">Risk areas</p>
          </div>
          <div className="border border-line p-5">
            <p className="font-display text-4xl text-accent">4</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">CI gates: lint, types, tests, build</p>
          </div>
        </div>

        <h2 className="mt-16 font-display text-2xl md:text-3xl">What is covered, by risk</h2>
        <RiskMap />

        <h2 className="mt-16 font-display text-2xl md:text-3xl">How it runs</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Every push and pull request runs the same gate in GitHub Actions: ESLint, a strict
          TypeScript check, all 41 vitest cases, then a production build. A failing gate blocks the
          merge. The badge at the top of this page reads the latest run live from the GitHub
          Actions API.
        </p>

        <h2 className="mt-16 font-display text-2xl md:text-3xl">Known gaps, said out loud</h2>
        <ul className="mt-4 max-w-2xl space-y-2">
          <li className="flex gap-3 text-sm leading-relaxed text-ink/85">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            No browser-level end-to-end tests in this repo. The suite is unit and integration
            level. UI flows are verified manually before each deploy. (My ShelfSeeker project is
            where I keep the full Playwright E2E practice.)
          </li>
          <li className="flex gap-3 text-sm leading-relaxed text-ink/85">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
            The live feed&apos;s real schema drift is only caught at sync time; the sync tests pin
            behaviour with recorded fixtures, not against the live API.
          </li>
        </ul>

        <div className="mt-16 flex flex-wrap gap-6 border-t border-line pt-8 text-sm">
          <a href="https://worlds-2026-live.vercel.app" target="_blank" rel="noreferrer" className="link-underline text-ink">
            Live app
          </a>
          <a href="https://github.com/hyderoo/worlds-2026-live" target="_blank" rel="noreferrer" className="link-underline text-ink">
            Repository
          </a>
          <a href="https://github.com/hyderoo/worlds-2026-live/tree/HEAD/tests" target="_blank" rel="noreferrer" className="link-underline text-muted hover:text-ink">
            The tests themselves
          </a>
        </div>
      </div>
    </main>
  );
}
