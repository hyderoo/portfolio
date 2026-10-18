import type { Metadata } from "next";
import Link from "next/link";
import TestStatus from "@/components/TestStatus";
import EnglishNote from "@/components/EnglishNote";

export const metadata: Metadata = {
  title: "Test strategy: Worlds 2026 Live - Hafiz Hamdani",
  description:
    "How the Worlds 2026 Live tracker is tested: 41 vitest cases across sync integrity, match state, auth, roster scraping, calendar feed, pick'em, push and forms, running in CI on every push.",
};

const areas = [
  {
    name: "Sync integrity",
    count: 10,
    risk: "The app re-syncs the official lolesports feed every minute. The expensive failures are silent: stale data shown as live, or a retry storm duplicating writes.",
    covers: [
      "Re-syncing identical upstream data changes nothing (idempotent)",
      "When upstream fails, cached data is kept and the error is recorded",
      "Retries back off and give up loudly after the last attempt",
      "A manual override is never overwritten by older upstream data, and never overwrites newer",
      "A failing stats feed does not fail the whole sync",
      "Missing database tables fall back to memory, then retry later",
    ],
  },
  {
    name: "Match state machine",
    count: 8,
    risk: "A match card that claims LIVE or FINAL at the wrong moment is the most visible lie the app can tell.",
    covers: [
      "Upstream states map to scheduled / live / completed correctly",
      "inProgress is trusted near the start time, flagged as unverified hours before it",
      "A match stuck live too long is flagged",
      "Completed requires a decided winner; unknown states are unverified",
    ],
  },
  {
    name: "Auth and access",
    count: 5,
    risk: "Admin overrides and the sync endpoint are the two doors into write access.",
    covers: [
      "Only the configured password is accepted, and a weak configured password is refused",
      "Sessions round-trip; tampering and expiry are rejected",
      "The sync endpoint checks its bearer secret",
      "Repeated failures are blocked after the limit within the window",
    ],
  },
  {
    name: "Roster data (Liquipedia)",
    count: 5,
    risk: "Scraped wikitext is brittle: template changes silently corrupt team pages.",
    covers: [
      "Starters, subs and staff are read; commented-out people are ignored",
      "Only safe social handles are kept",
      "Scraping is disabled without a contact and throttled to one request per tick",
      "Prize percentages are read per placement and dollars derived",
    ],
  },
  {
    name: "Calendar feed (ICS)",
    count: 4,
    risk: "A bad calendar entry lands on someone's phone, not on a page I can fix.",
    covers: [
      "UTC times, stable UIDs, no scores in the feed",
      "Output is deterministic and SEQUENCE bumps when upstream changes",
      "Long lines fold to 75 octets with CRLF, per RFC",
      "A match with one TBD side is kept and titled honestly",
    ],
  },
  {
    name: "Pick'em and groups",
    count: 3,
    risk: "Scoring matches that have not finished, or leaking picks early, breaks the game.",
    covers: [
      "Only completed matches score; TBD is ignored",
      "Picks close at start time and stay hidden until then",
      "Head-to-head ignores unfinished matches",
    ],
  },
  {
    name: "Push notifications",
    count: 3,
    risk: "A push is un-unsendable, and a score in a notification is a spoiler.",
    covers: [
      "Only real push services over https are allowed",
      "Due events are found and TBD matchups skipped",
      "Spoiler mode keeps the score out of result alerts",
    ],
  },
  {
    name: "Forms and lists",
    count: 3,
    risk: "Wrong ordering and wrong aggregation erode trust quietly.",
    covers: [
      "Lists show only completed matches, newest first, own score first",
      "Streaks and head-to-head compute from finished matches only",
    ],
  },
];

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
          I keep it honest - every claim below comes from the repo&apos;s <code>tests/</code>{" "}
          directory and CI workflow, not from memory.
        </p>
        <TestStatus repo="hyderoo/worlds-2026-live" workflow="CI" />
        <div>
          <EnglishNote />
        </div>

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
        <div className="mt-6 space-y-4">
          {areas.map((a) => (
            <details key={a.name} className="group border border-line bg-surface/40 open:border-accent/40">
              <summary className="flex cursor-pointer items-baseline justify-between gap-4 p-5 md:p-6">
                <span className="font-display text-xl">{a.name}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted">{a.count} tests</span>
              </summary>
              <div className="border-t border-line p-5 md:p-6">
                <p className="text-sm italic leading-relaxed text-muted">{a.risk}</p>
                <ul className="mt-4 space-y-2">
                  {a.covers.map((c) => (
                    <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>

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
            No browser-level end-to-end tests in this repo - the suite is unit and integration
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
