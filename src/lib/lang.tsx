"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type Lang = "en" | "ja";
type Dict = Record<string, string>;

const STORAGE_KEY = "lang";

/** English page metadata, used only to retitle the tab when Japanese is active. */
const META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Hafiz Hamdani | Software QA Engineer",
    description:
      "Portfolio of Hafiz (Dani) Hamdani, a software QA engineer in Jakarta working on mobile banking, and building dashboards and trackers on the side.",
  },
  "/quality": {
    title: "Quality in numbers | Hafiz Hamdani",
    description:
      "Real test counts per project, what is not tested yet, live API checks against the USGS feed, and a changelog of bugs found and fixed in my own work.",
  },
  "/architecture": {
    title: "Architecture | Hafiz Hamdani",
    description:
      "System context, sequence, data flow, use case and ER diagrams for each project, drawn from the real code and schemas in the repositories.",
  },
  "/sample-work": {
    title: "Sample work: test cases and bug reports | Hafiz Hamdani",
    description:
      "A manual QA sample: real test cases and reproduced bug reports from a live execution against the public SauceDemo training app.",
  },
  "/strategy": {
    title: "Test strategy: Worlds 2026 Live | Hafiz Hamdani",
    description:
      "How the Worlds 2026 Live tracker is tested: 41 vitest cases across sync integrity, match state, auth, roster scraping, calendar feed, pick'em, push and forms, running in CI on every push.",
  },
  "/break-this-app": {
    title: "Break this app | Hafiz Hamdani",
    description:
      "A tiny coffee shop with six deliberately seeded bugs. Hunt them down, then read the bug report I would file for each one.",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, vars?: Record<string, string | number>) => string;
};

const LangContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (en) => en,
});

function fill(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dict, setDict] = useState<Dict | null>(null);
  const pathname = usePathname();

  // Pick the language after hydration: ?lang= wins, then the saved choice.
  useEffect(() => {
    let next: Lang = "en";
    try {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "ja" || q === "jp") next = "ja";
      else if (q === "en") next = "en";
      else if (localStorage.getItem(STORAGE_KEY) === "ja") next = "ja";
      if (q === "ja" || q === "jp" || q === "en") localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    if (next !== "en") setLangState(next);
  }, []);

  // Japanese strings live in their own chunk and load only when needed.
  useEffect(() => {
    if (lang !== "ja" || dict) return;
    let live = true;
    import("./ja").then((m) => {
      if (live) setDict(m.default);
    });
    return () => {
      live = false;
    };
  }, [lang, dict]);

  const t = useCallback(
    (en: string, vars?: Record<string, string | number>) => {
      if (lang !== "ja" || !dict) return fill(en, vars);
      const hit = dict[en];
      if (hit === undefined && typeof window !== "undefined" && /[A-Za-z]{4,} [A-Za-z]{2,}/.test(en)) {
        const w = window as unknown as { __i18nMissing?: Set<string> };
        (w.__i18nMissing ??= new Set()).add(en);
      }
      return fill(hit ?? en, vars);
    },
    [lang, dict]
  );

  // Keep <html lang>, the tab title and the description in step with the language.
  useEffect(() => {
    document.documentElement.lang = lang;
    const m = META[pathname];
    if (!m) return;
    const apply = () => {
      document.title = t(m.title);
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", t(m.description));
    };
    apply();
    const id = window.setTimeout(apply, 400);
    return () => window.clearTimeout(id);
  }, [lang, t, pathname]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

let segmenter: Intl.Segmenter | null = null;

/**
 * Japanese has no spaces, and not every browser supports `word-break: auto-phrase`.
 * Combined with `word-break: keep-all` in CSS, a <wbr> between words gives line breaks
 * only at word boundaries (never inside テスト or API名 style words).
 */
export function phrased(s: string, lang: Lang): ReactNode {
  if (lang !== "ja" || !/[\u3040-\u30ff\u3400-\u9fff]/.test(s)) return s;
  try {
    segmenter ??= new Intl.Segmenter("ja", { granularity: "word" });
    const words: string[] = [];
    for (const { segment } of segmenter.segment(s)) {
      if (/^[、。，．・：；！？）」』】%％]+$/.test(segment) && words.length) words[words.length - 1] += segment;
      else words.push(segment);
    }
    return words.flatMap((w, i) => (i ? [<wbr key={i} />, w] : [w]));
  } catch {
    return s;
  }
}

/** Translates a plain string. `vars` fills {name} placeholders. */
export function T({
  children,
  vars,
}: {
  children: string;
  vars?: Record<string, string | number>;
}) {
  const { t, lang } = useLang();
  return <>{phrased(t(children, vars), lang)}</>;
}

/**
 * Translates a sentence that contains inline elements. The source uses
 * {name}text{/name} markers; `parts` maps each name to a wrapper.
 */
export function R({
  children,
  parts,
}: {
  children: string;
  parts: Record<string, (inner: string) => ReactNode>;
}) {
  const { t, lang } = useLang();
  const s = t(children);
  const out: ReactNode[] = [];
  const re = /\{(\w+)\}([\s\S]*?)\{\/\1\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(<span key={`t${i++}`} style={{ display: "contents" }}>{phrased(s.slice(last, m.index), lang)}</span>);
    const wrap = parts[m[1]];
    out.push(wrap ? <span key={i++} style={{ display: "contents" }}>{wrap(m[2])}</span> : m[2]);
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(<span key={`t${i++}`} style={{ display: "contents" }}>{phrased(s.slice(last), lang)}</span>);
  return <>{out}</>;
}

/** <img> whose alt text follows the language (usable from server components). */
export function TImg({ alt, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { alt: string }) {
  const { t } = useLang();
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={t(alt)} {...rest} />;
}

export function LangSwitch({ tone = "light" }: { tone?: "light" | "page" }) {
  const { lang, setLang } = useLang();
  const base =
    "px-2.5 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors";
  const on = tone === "light" ? "text-white" : "text-accent";
  const off =
    tone === "light" ? "text-white/70 hover:text-white" : "text-muted hover:text-ink";
  return (
    <div
      role="group"
      aria-label={lang === "ja" ? "言語" : "Language"}
      className="flex items-center"
    >
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? on : off}`}
      >
        EN
      </button>
      <span aria-hidden className="text-[11px] text-white/30">/</span>
      <button
        type="button"
        lang="ja"
        aria-label="日本語"
        aria-pressed={lang === "ja"}
        onClick={() => setLang("ja")}
        className={`${base} ${lang === "ja" ? on : off}`}
      >
        JP
      </button>
    </div>
  );
}

/** Fixed switcher for the sub pages (the home page has it in the nav). */
export function FloatingLang() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <div className="fixed right-3 top-3 z-40 rounded-full border border-line bg-bg/80 px-1 backdrop-blur-md md:right-6 md:top-5">
      <LangSwitch tone="page" />
    </div>
  );
}

/** "5 unit" in English, "単体5件" in Japanese. */
export function Count({ label, n }: { label: string; n: number }) {
  const { lang, t } = useLang();
  if (lang === "ja") return <>{t("{label}{n}", { label: t(label), n })}</>;
  return <>{`${n} ${label}`}</>;
}
