import { NextResponse } from "next/server";

const REPO = "hyderoo/quakewatch";
const WORKFLOW_FILE = "e2e.yml";
// One workflow dispatch per cooldown window, across all visitors.
const COOLDOWN_MS = 10 * 60 * 1000;

export async function POST() {
  const token = process.env.GITHUB_RUN_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "not_configured", message: "GITHUB_RUN_TOKEN is not set on this deployment." },
      { status: 503 }
    );
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  };

  // Abuse control. Serverless instances cannot share in-memory state, so the
  // source of truth is GitHub itself: refuse the dispatch when a run started
  // inside the cooldown window.
  try {
    const runsRes = await fetch(
      `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/runs?per_page=1`,
      { headers, cache: "no-store" }
    );
    if (runsRes.ok) {
      const data = await runsRes.json();
      const latest = data.workflow_runs?.[0];
      if (latest?.created_at) {
        const age = Date.now() - new Date(latest.created_at).getTime();
        if (age < COOLDOWN_MS) {
          const retryAfter = Math.ceil((COOLDOWN_MS - age) / 1000);
          return NextResponse.json(
            { error: "cooldown", retryAfter },
            { status: 429, headers: { "Retry-After": String(retryAfter) } }
          );
        }
      }
    }
  } catch {
    // If the cooldown check itself fails, fall through and try the dispatch.
  }

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
    {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ ref: "main" }),
      cache: "no-store",
    }
  );
  if (res.status === 204) {
    return NextResponse.json({ ok: true, repo: REPO });
  }
  const text = await res.text();
  return NextResponse.json(
    { error: "github_error", status: res.status, message: text.slice(0, 300) },
    { status: 502 }
  );
}
