"use client";

import { useEffect, useRef, useState } from "react";
import { R, T, useLang } from "@/lib/lang";

type Report = { key: string; severity: string; summary: string; at: string };

const SEVERITIES = ["Blocker", "Critical", "Major", "Minor", "Trivial"];

/**
 * Find-the-bug easter egg. One small bug is hidden in the footer; finding it
 * opens a JIRA-style bug report dialog. Everything stays in localStorage -
 * it is a demo of how Dani writes bug reports, not a real tracker.
 */
export default function BugHunt() {
  const { t } = useLang();
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
        aria-label={t("You found the hidden bug. Open the bug report form.")}
        title={t("psst, you found a bug")}
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
            aria-label={t("Create bug report")}
            className="w-full max-w-lg border border-line bg-[#16130f] p-6 shadow-2xl shadow-black/60 md:p-8"
          >
            {!filed ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-accent"><T>HAF · Create issue</T></p>
                  <span className="rounded-sm border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-muted"><T>Bug</T></span>
                </div>
                <h3 className="mt-3 font-display text-2xl"><T>Bug report</T></h3>

                <label className="mt-6 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="bh-summary"><T>Summary</T></label>
                <input
                  id="bh-summary"
                  readOnly
                  value={t("Hidden bug on the portfolio site")}
                  className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
                />

                <label className="mt-4 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="bh-severity"><T>Severity</T></label>
                <select
                  id="bh-severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="mt-1 w-full border border-line bg-[#16130f] px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
                >
                  {SEVERITIES.map((s) => (
                    <option key={s} value={s}>{t(s)}</option>
                  ))}
                </select>

                <label className="mt-4 block text-[11px] uppercase tracking-[0.2em] text-muted" htmlFor="bh-steps"><T>Steps to reproduce</T></label>
                <textarea
                  id="bh-steps"
                  readOnly
                  rows={3}
                  value={t("1. Opened the portfolio\n2. Scrolled to the very bottom\n3. Looked carefully")}
                  className="mt-1 w-full resize-none border border-line bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-accent/60"
                />

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted"><T>Expected</T></p>
                    <p className="mt-1 border border-line px-3 py-2 text-sm text-muted"><T>No bugs. Obviously.</T></p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted"><T>Actual</T></p>
                    <p className="mt-1 border border-line px-3 py-2 text-sm text-muted"><T>A bug. You found it.</T></p>
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <p className="text-xs text-muted"><T>Demo only. This report never leaves your browser.</T></p>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-muted hover:text-ink">
                      <T>Cancel</T>
                    </button>
                    <button
                      type="button"
                      onClick={file}
                      className="border border-accent/70 px-4 py-2 text-sm uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-black"
                    >
                      <T>Create</T>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-accent"><T>Issue created</T></p>
                <h3 className="mt-3 font-display text-2xl">
                  {filed.key}: <T>{filed.summary}</T>
                </h3>
                <dl className="mt-6 space-y-2 text-sm">
                  <div className="flex gap-3"><dt className="w-24 text-muted"><T>Severity</T></dt><dd><T>{filed.severity}</T></dd></div>
                  <div className="flex gap-3"><dt className="w-24 text-muted"><T>Status</T></dt><dd><T>To Do</T></dd></div>
                  <div className="flex gap-3"><dt className="w-24 text-muted"><T>Assignee</T></dt><dd><T>Dani (triages after coffee)</T></dd></div>
                  <div className="flex gap-3"><dt className="w-24 text-muted"><T>Reporter</T></dt><dd><T>You, with sharp eyes</T></dd></div>
                </dl>
                <p className="mt-6 text-xs text-muted">
                  <R
                    parts={{
                      a: (x) => (
                        <a href="/break-this-app" className="link-underline text-accent">
                          {x}
                        </a>
                      ),
                    }}
                  >
                    {"This is how I like bug reports: reproducible steps, expected vs actual, honest severity. Stored only in your browser. Want the real thing? {a}Break this app{/a}."}
                  </R>
                </p>
                <div className="mt-7 text-right">
                  <button
                    type="button"
                    onClick={() => { setOpen(false); setFiled(null); }}
                    className="border border-accent/70 px-4 py-2 text-sm uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-black"
                  >
                    <T>Done</T>
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
