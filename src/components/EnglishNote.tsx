"use client";

import { useLang } from "@/lib/i18n";

/**
 * Small notice shown on the English-only /strategy page when a non-English
 * language is selected. Strategy content stays English on purpose.
 */
export default function EnglishNote() {
  const { lang, tx } = useLang();
  if (lang === "en") return null;
  return (
    <p className="mt-4 inline-block rounded-sm border border-line px-3 py-1.5 text-xs text-muted">
      {tx("strategy.enOnly", "This page is available in English only.")}
    </p>
  );
}
