"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Words for the reveal. Japanese has no spaces, so use the browser segmenter to keep natural line breaks. */
function splitWords(text: string): string[] {
  if (!/[\u3040-\u30ff\u3400-\u9fff]/.test(text)) return text.split(" ");
  try {
    const seg = new Intl.Segmenter("ja", { granularity: "word" });
    const out: string[] = [];
    for (const { segment } of seg.segment(text)) {
      // fold punctuation into the word before it so it never wraps to a line start
      if (/^[、。，．・：；！？）」』】]+$/.test(segment) && out.length) out[out.length - 1] += segment;
      else out.push(segment);
    }
    return out;
  } catch {
    return [text];
  }
}

/**
 * Splits text into words and chars, revealing char by char when in view.
 * Plain spans with CSS transitions (no per-character motion component), so
 * hydration stays cheap even for long headings.
 */
export function SplitChars({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
  start,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "p";
  /** When provided, the reveal is driven by this flag instead of scroll-into-view. */
  start?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = splitWords(text);
  const isJa = /[\u3040-\u30ff\u3400-\u9fff]/.test(text);
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  const gated = start !== undefined;

  useEffect(() => {
    if (gated || seen) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "-8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [gated, seen]);

  const shown = gated ? !!start : seen;
  let n = 0;
  return (
    <Tag className={className} ref={ref as never}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
            {word.split("").map((c, ci) => {
              const d = delay + (reduced ? 0 : n++ * 0.018);
              return (
                <span key={ci} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
                  <span
                    className="inline-block"
                    style={{
                      transform: shown || reduced ? "translateY(0)" : "translateY(115%)",
                      opacity: reduced && !shown ? 0 : 1,
                      transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${d}s, opacity 0.7s ease ${d}s`,
                      willChange: shown ? "auto" : "transform",
                    }}
                  >
                    {c}
                  </span>
                </span>
              );
            })}
            {wi < words.length - 1 && !isJa ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Simple fade + rise when scrolled into view. */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Clip-path wipe reveal, the signature transition. */
export function ClipReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ clipPath: reduced ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
