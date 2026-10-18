"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const GREETINGS = [
  "Selamat datang",
  "Welcome",
  "ようこそ",
  "欢迎",
  "환영합니다",
  "Bienvenue",
  "Bienvenido",
  "Bem-vindo",
  "Willkommen",
  "Benvenuto",
  "Sugeng rawuh",
];

const DURATION = 1200;
const CJK_STACK =
  "var(--font-fraunces), 'Hiragino Sans', 'Yu Gothic', 'Noto Sans CJK JP', 'Microsoft YaHei', 'Malgun Gothic', sans-serif";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t0 = performance.now();
    const duration = reduced ? 350 : DURATION;
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      setStep(Math.min(GREETINGS.length - 1, Math.floor(t * GREETINGS.length)));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setLeaving(true), 120);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduced]);

  useEffect(() => {
    if (!leaving) return;
    document.documentElement.style.overflow = "";
    onDone();
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  if (gone) return null;

  const greeting = reduced ? "Welcome" : GREETINGS[step];

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-bg p-6 md:p-10"
          initial={false}
          animate={leaving ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between text-[11px] uppercase tracking-[0.25em] text-muted">
            <span>Portfolio</span>
            <span>© 2026</span>
          </div>

          <div className="flex flex-1 items-center justify-center" aria-hidden>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={greeting}
                className="font-display text-4xl italic text-ink md:text-6xl"
                style={{ fontFamily: CJK_STACK }}
                initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                {greeting}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="sr-only" role="status">Loading, {count} percent</span>

          <div className="flex items-end justify-between gap-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-muted">Loading</span>
            <span className="font-display text-sm italic text-accent tabular-nums md:text-base">{count}%</span>
          </div>
          <div className="mt-3 h-px w-full bg-line">
            <div
              className="h-px bg-accent transition-[width] duration-100 ease-linear"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
