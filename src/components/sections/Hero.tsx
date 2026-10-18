"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SplitChars } from "../Reveal";
import { profile } from "@/lib/data";

const HeroScene = dynamic(() => import("../HeroScene"), { ssr: false });

export default function Hero({ started }: { started: boolean }) {
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setSceneReady(true),
        { timeout: 2500 }
      );
      return () => (window as Window & { cancelIdleCallback: (n: number) => void }).cancelIdleCallback(id);
    }
    const t = setTimeout(() => setSceneReady(true), 400);
    return () => clearTimeout(t);
  }, [started]);

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-between overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-90"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 0.9 } : {}}
        transition={{ duration: 1.2 }}
      >
        {sceneReady && <HeroScene />}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg" />

      <div className="relative z-10 flex justify-between px-6 pt-24 text-[11px] uppercase tracking-[0.25em] text-muted md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {profile.name} · {profile.role}
        </motion.span>
        <motion.span
          className="hidden sm:block"
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          {profile.location}
        </motion.span>
      </div>

      <div className="relative z-10 px-6 md:px-10">
        <h1 className="font-display display-hero">
          <SplitChars text="HAFIZ" className="block" delay={0} start={started} />
          <SplitChars text="HAMDANI" className="block text-outline italic" delay={0.15} start={started} />
        </h1>
        <div className="mt-8 flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            I find the bugs before your users do. QA engineer working on a
            mobile banking app used by millions, and building things on the
            side so I never stop breaking interesting ones.
          </p>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            Download CV
          </a>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted"
            initial={{ opacity: 0 }}
            animate={started ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <span className="inline-block h-px w-10 bg-muted" />
            Scroll to discover
          </motion.div>
        </div>
      </div>
    </section>
  );
}
