"use client";

import { useState } from "react";
import { T, useLang } from "@/lib/lang";

type Area = { name: string; count: number; risk: string; covers: string[]; file: string };

const areas: Area[] = [
  {
    name: "Sync integrity",
    file: "sync.test.ts",
    count: 10,
    risk: "The app re-syncs the official lolesports feed every 5 minutes. The expensive failures are silent: stale data shown as live, or a retry storm duplicating writes.",
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
    file: "match-state.test.ts",
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
    file: "auth.test.ts",
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
    file: "liquipedia.test.ts",
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
    file: "ics.test.ts",
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
    file: "groups.test.ts",
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
    file: "push.test.ts",
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
    file: "form.test.ts",
    count: 3,
    risk: "Wrong ordering and wrong aggregation erode trust quietly.",
    covers: [
      "Lists show only completed matches, newest first, own score first",
      "Streaks and head-to-head compute from finished matches only",
    ],
  },
];

const MAP =
  "The map shows where the 41 tests sit: cell size and intensity follow the number of tests mapped to each risk area. Select a cell to open its coverage.";

const maxCount = Math.max(...areas.map((a) => a.count));

export default function RiskMap() {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>(areas[0].name);

  return (
    <div className="mt-6">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        <T>{MAP}</T>
      </p>
      <div
        className="mt-5 grid gap-1.5"
        style={{ gridTemplateColumns: areas.map((a) => `${a.count}fr`).join(" ") }}
        aria-label={t("Risk areas by test coverage")}
      >
        {areas.map((a) => {
          const active = open === a.name;
          return (
            <button
              key={a.name}
              onClick={() => setOpen(active ? null : a.name)}
              aria-pressed={active}
              aria-label={t("{name}, {count} tests", { name: t(a.name), count: a.count })}
              className={`flex h-24 min-w-0 flex-col justify-between rounded-sm border p-2 text-left transition-colors sm:h-28 ${
                active ? "border-accent" : "border-line hover:border-accent/50"
              }`}
              style={{ backgroundColor: `rgba(228, 87, 46, ${0.08 + (a.count / maxCount) * 0.5})` }}
            >
              <span className="text-[10px] font-medium uppercase leading-tight tracking-[0.1em] break-words text-ink/90 sm:text-[11px]">
                <T>{a.name}</T>
              </span>
              <span className="font-display text-lg text-ink sm:text-xl">{a.count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-4">
        {areas.map((a) => {
          const active = open === a.name;
          return (
            <div
              key={a.name}
              id={`risk-${a.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className={`border bg-surface/40 transition-colors ${active ? "border-accent/40" : "border-line"}`}
            >
              <button
                onClick={() => setOpen(active ? null : a.name)}
                aria-expanded={active}
                className="flex w-full cursor-pointer items-baseline justify-between gap-4 p-5 text-left md:p-6"
              >
                <span className="font-display text-xl"><T>{a.name}</T></span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted"><T vars={{ count: a.count }}>{"{count} tests"}</T></span>
              </button>
              {active && (
                <div className="border-t border-line p-5 md:p-6">
                  <p className="text-sm italic leading-relaxed text-muted"><T>{a.risk}</T></p>
                  <ul className="mt-4 space-y-2">
                    {a.covers.map((c) => (
                      <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <T>{c}</T>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://github.com/hyderoo/worlds-2026-live/blob/main/tests/${a.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-ink"
                  >
                    tests/{a.file}
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
