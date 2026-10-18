"use client";

import { useEffect, useRef, useState } from "react";

const REPO = "hyderoo/quakewatch";
const WORKFLOW = "e2e";

type RunInfo = {
  id: number;
  status: string;
  conclusion: string | null;
  url: string;
  startedAt: string;
};

type State =
  | { phase: "idle" }
  | { phase: "triggering" }
  | { phase: "watching"; run: RunInfo | null }
  | { phase: "done"; run: RunInfo }
  | { phase: "unavailable"; message: string };

async function latestRun(): Promise<RunInfo | null> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/actions/runs?per_page=30`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const runs = (data.workflow_runs || []).filter(
    (w: { name: string }) => w.name === WORKFLOW
  );
  if (!runs.length) return null;
  const w = runs[0];
  return {
    id: w.id,
    status: w.status,
    conclusion: w.conclusion,
    url: w.html_url,
    startedAt: w.run_started_at || w.created_at,
  };
}

export default function RunSuite() {
  const [state, setState] = useState<State>({ phase: "idle" });
  const [elapsed, setElapsed] = useState(0);
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);
  const t0 = useRef<number>(0);

  useEffect(() => () => { if (poll.current) clearInterval(poll.current); }, []);

  async function trigger() {
    setState({ phase: "triggering" });
    t0.current = Date.now();
    try {
      const res = await fetch("/api/run-suite", { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setState({
          phase: "unavailable",
          message:
            body.error === "not_configured"
              ? "Live triggering is not wired on this deployment yet."
              : `GitHub refused the dispatch (status ${body.status ?? res.status}).`,
        });
        return;
      }
      setState({ phase: "watching", run: null });
      poll.current = setInterval(async () => {
        setElapsed(Math.round((Date.now() - t0.current) / 1000));
        const run = await latestRun();
        if (!run) return;
        const fresh = Date.now() - new Date(run.startedAt).getTime() < 30 * 60 * 1000;
        setState((s) => (s.phase === "watching" ? { phase: "watching", run: fresh ? run : s.run } : s));
        if (fresh && run.status === "completed") {
          if (poll.current) clearInterval(poll.current);
          setState({ phase: "done", run });
        }
      }, 10000);
    } catch {
      setState({ phase: "unavailable", message: "The dispatch request failed." });
    }
  }

  const mm = String(Math.floor(elapsed / 60));
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="mt-6 rounded-lg border border-white/10 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Run the QuakeWatch test suite, for real</p>
          <p className="mt-1 max-w-lg text-xs leading-relaxed text-muted">
            This triggers the actual GitHub Actions workflow: 6 Playwright tests against the
            deployed app, browser install included, usually 3 to 6 minutes. The status below
            is polled from the public GitHub API while you wait.
          </p>
        </div>
        <button
          onClick={trigger}
          disabled={state.phase === "triggering" || state.phase === "watching"}
          className="rounded-full border border-ink/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent disabled:opacity-50"
        >
          {state.phase === "watching" ? `Running ${mm}:${ss}` : state.phase === "triggering" ? "Triggering" : "Run the suite"}
        </button>
      </div>

      {state.phase === "watching" && (
        <p className="mt-4 text-sm text-muted">
          {state.run
            ? `Run #${state.run.id}: ${state.run.status}. `
            : "Waiting for the run to appear in GitHub Actions. "}
          <a href={`https://github.com/${REPO}/actions`} target="_blank" rel="noreferrer" className="text-accent hover:text-ink">
            Watch it on GitHub
          </a>
        </p>
      )}
      {state.phase === "done" && (
        <p className="mt-4 text-sm">
          <span className={state.run.conclusion === "success" ? "text-emerald-400" : "text-accent"}>
            {state.run.conclusion === "success" ? "All 6 tests passed." : `Finished: ${state.run.conclusion}.`}
          </span>{" "}
          <a href={state.run.url} target="_blank" rel="noreferrer" className="text-accent hover:text-ink">
            Open the run
          </a>
          {" · "}
          <a href="https://hyderoo.github.io/quakewatch/e2e/" target="_blank" rel="noreferrer" className="text-accent hover:text-ink">
            Open the HTML report
          </a>
        </p>
      )}
      {state.phase === "unavailable" && (
        <p className="mt-4 text-sm text-muted">
          {state.message}{" "}
          <a href={`https://github.com/${REPO}/actions`} target="_blank" rel="noreferrer" className="text-accent hover:text-ink">
            See the latest real runs instead
          </a>
        </p>
      )}
    </div>
  );
}
