import { NextResponse } from "next/server";

const REPO = "hyderoo/quakewatch";
const WORKFLOW_FILE = "e2e.yml";

export async function POST() {
  const token = process.env.GITHUB_RUN_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "not_configured", message: "GITHUB_RUN_TOKEN is not set on this deployment." },
      { status: 503 }
    );
  }
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
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
