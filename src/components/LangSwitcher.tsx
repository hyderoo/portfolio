"use client";

import { LANGS, useLang } from "@/lib/i18n";

export default function LangSwitcher() {
  const { lang, setLang, mt, tx } = useLang();
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Site language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.mt ? `${l.label} - ${tx("nav.mt", "machine translation")}` : l.label}
          className={`px-1.5 py-1 text-[10px] uppercase tracking-[0.14em] transition-colors ${
            lang === l.code ? "text-accent" : "text-white/50 hover:text-white"
          }`}
        >
          {l.code}
          {l.mt && <sup aria-hidden>*</sup>}
        </button>
      ))}
      {mt && (
        <span className="ml-1 hidden text-[9px] lowercase tracking-normal text-white/40 md:inline">
          *{tx("nav.mt", "machine translation")}
        </span>
      )}
    </div>
  );
}
