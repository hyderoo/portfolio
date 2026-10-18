"use client";

import { R } from "@/lib/lang";

const SAMPLE_INTRO =
  "My day-job test artifacts are confidential, so this page shows how I plan, execute and report testing against {a}SauceDemo{/a}, a public training app that ships defects on purpose. Every result below comes from a real execution on 18 October 2026 (desktop Chrome, 1280x720). The same flows pass on the standard account, which is the control that makes the failures worth reporting. The full 24-case set, test plan and exploratory notes live in the {b}qa-portfolio repo{/b}.";

const STRATEGY_INTRO =
  "Worlds 2026 Live is a real-time tracker for the League of Legends World Championship: a Next.js PWA that syncs the official lolesports feed into Supabase every 5 minutes and serves a match center, bracket, standings, pick'em and push notifications. This page is how I keep it honest: every claim below comes from the repo's {c}tests/{/c} directory and CI workflow, not from memory.";

const link = "link-underline text-ink";

export function SampleWorkIntro() {
  return (
    <R
      parts={{
        a: (x) => (
          <a href="https://www.saucedemo.com/" target="_blank" rel="noreferrer" className={link}>
            {x}
          </a>
        ),
        b: (x) => (
          <a href="https://github.com/hyderoo/qa-portfolio" target="_blank" rel="noreferrer" className={link}>
            {x}
          </a>
        ),
      }}
    >
      {SAMPLE_INTRO}
    </R>
  );
}

export function StrategyIntro() {
  return <R parts={{ c: (x) => <code>{x}</code> }}>{STRATEGY_INTRO}</R>;
}
