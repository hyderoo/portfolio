"use client";

import { useEffect, useRef, useState } from "react";

type Report = { key: string; severity: string; summary: string; at: string };

const SEVERITIES = ["Blocker", "Critical", "Major", "Minor", "Trivial"];

/**
 * Find-the-bug easter egg. One small bug is hidden in the footer; finding it
 * opens a JIRA-style bug report dialog. Everything stays in localStorage -
 * it is a demo of how Dani writes bug reports, not a real tracker.
 */
export default function BugHunt() {
  const [open, setOpen] = useState(false);
  const [filed, setFiled] = useState<Report | null>(null);
  const [severity, setSeverity] = useState("Trivial");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.querySelector<HTMLElement>("select")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const file = () => {
    const report: Report = {
      key: `HAF-${Math.floor(100 + Math.random() * 900)}`,
      severity,
      summary: "Hidden bug on the portfolio site",
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("bug-hunt-reports") || "[]");
      localStorage.setItem("bug-hunt-reports", JSON.stringify([...prev, report]));
    } catch {}
    setFiled(report);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="You found the hidden bug. Open the bug report form."
        title="psst, you found a bug"
        className="group -my-3 inline-flex h-11 w-11 translate-y-[-1px] items-center justify-center opacity-[0.65] transition-all duration-300 hover:opacity-100 focus-visible:opacity-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="14" r="5" />
          <path d="M12 9V6M9 6.5L7 4M15 6.5L17 4M7 12H3M7 16l-3 2M21 12h-4M17 16l3 2M9 19l-1 3M15 19l1 3" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Create bug report"
            className="w-full max-w-lg border border-line bg-[#16130f] p-6 shadow-2xl shadow-black/60 md:p-8"
          >
            {!filed ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-accent">HAF · Create issue</p>
                  <span className="rounded-sm border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-muted">Bug</span>
                </div>
                <h3 className="mt-3 font-display text-2xl">Bug report</h3>

                <label className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="bh-summary">Summary</label>
                <input
                  id="bh-summary"
                  readOnly
                  value="Hidden bug on the portfolio site"
                  className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
                />

                <label className="mt-4 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="bh-severity">Severity</label>
                <select
                  id="bh-severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="mt-1 w-full border border-line bg-[#16130f] px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
                >
                  {SEVERITIES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                <label className="mt-4 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="bh-steps">Steps to reproduce</label>
                <textarea
                  id="bh-steps"
                  readOnly
                  rows={3}
                  value={"1. Opened the portfolio\n2. Scrolled to the very bottom\n3. Looked carefully"}
                  className="mt-1 w-full resize-none border border-line bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
                />

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Expected</p>
                    <p className="mt-1 border border-line px-3 py-2 text-sm text-muted">No bugs. Obviously.</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Actual</p>
                    <p className="mt-1 border border-line px-3 py-2 text-sm text-muted">A bug. You found it.</p>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <p className="text-xs text-muted">Demo only. This report never leaves your browser.</p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-muted hover:text-ink">
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={file}
                      className="border border-accent/70 px-4 py-2 text-sm uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-black"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-accent">Issue created</p>
                <h3 className="mt-3 font-display text-2xl">
                  {filed.key}: {filed.summary}
                </h3>
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex gap-3"><dt className="w-24 text-muted">Severity</dt><dd>{filed.severity}</dd></div>
                  <div className="flex gap-3"><dt className="w-24 text-muted">Status</dt><dd>To Do</dd></div>
                  <div className="flex gap-3"><dt className="w-24 text-muted">Assignee</dt><dd>Dani (triages after coffee)</dd></div>
                  <div className="flex gap-3"><dt className="w-24 text-muted">Reporter</dt><dd>You, with sharp eyes</dd></div>
                </dl>
                <p className="mt-6 text-xs text-muted">
                  This is how I like bug reports: reproducible steps, expected vs actual, honest severity.
                  Stored only in your browser. Want the real thing?{" "}
                  <a href="/break-this-app" className="link-underline text-accent">
                    Break this app
                  </a>
                  .
                </p>
                <div className="mt-7 text-right">
                  <button
                    type="button"
                    onClick={() => { setOpen(false); setFiled(null); }}
                    className="border border-accent/70 px-4 py-2 text-sm uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-black"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
