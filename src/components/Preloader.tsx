"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    let value = 0;
    const tick = () => {
      value += Math.max(1, Math.round((100 - value) * 0.09));
      if (value >= 100) {
        setCount(100);
        setTimeout(() => setLeaving(true), 250);
        return;
      }
      setCount(value);
      setTimeout(tick, 28 + Math.random() * 46);
    };
    const start = setTimeout(tick, 150);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => {
      document.documentElement.style.overflow = "";
      setGone(true);
      onDone();
    }, 1000);
    return () => clearTimeout(t);
  }, [leaving, onDone]);

  if (gone) return null;

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
          <div className="flex items-end justify-between gap-6">
            <motion.p
              className="font-display text-3xl italic text-ink md:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              hafiz hamdani
            </motion.p>
            <p className="font-display text-6xl leading-none text-accent tabular-nums md:text-8xl">
              {count}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
