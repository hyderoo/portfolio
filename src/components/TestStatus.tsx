"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type RunInfo = { conclusion: string; updatedAt: string; url: string };

/**
 * Live CI badge fed by the public GitHub Actions API for one repo+workflow.
 * Renders nothing until the real status is known, and nothing at all if the
 * API is unreachable - it never guesses.
 */
export default function TestStatus({ repo, workflow }: { repo: string; workflow: string }) {
  const [run, setRun] = useState<RunInfo | null>(null);
  const { tx } = useLang();

  useEffect(() => {
    const key = `ci:${repo}:${workflow}`;
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.t < 10 * 60 * 1000) {
          setRun(parsed.run);
          return;
        }
      }
    } catch {}
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}/actions/runs?per_page=30`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        const m = (d.workflow_runs || []).find(
          (w: { name: string; status: string }) => w.name === workflow && w.status === "completed"
        );
        if (!m || cancelled) return;
        const info = { conclusion: m.conclusion, updatedAt: m.updated_at, url: m.html_url };
        try {
          sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), run: info }));
        } catch {}
        setRun(info);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [repo, workflow]);

  if (!run) return null;

  const ok = run.conclusion === "success";
  const date = new Date(run.updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const label = ok ? tx("ts.passing", "Tests passing") : tx("ts.failing", "Tests failing");

  return (
    <a
      href={run.url}
      target="_blank"
      rel="noreferrer"
      title="Live from GitHub Actions"
      aria-label={`Latest ${workflow} run on GitHub Actions: ${label}, ${date}`}
      className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/50 hover:text-ink"
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-400" : "bg-red-400"}`}
      />
      {label} · {date}
    </a>
  );
}
