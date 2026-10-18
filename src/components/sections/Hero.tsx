"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SplitChars } from "../Reveal";
import { profile } from "@/lib/data";
import { T } from "@/lib/lang";

const HERO_COPY =
  "I find the bugs before your users do. QA engineer working on a mobile banking app used by millions, and building things on the side so I never stop breaking interesting ones.";

const HeroScene = dynamic(() => import("../HeroScene"), { ssr: false });

export default function Hero({ started }: { started: boolean }) {
  const [sceneReady, setSceneReady] = useState(false);
  // Hero text starts its reveal as soon as React is up, not after the preloader
  // lifts. The preloader is opaque while it counts, so the choreography looks
  // identical, but the copy paints about a second earlier (better LCP).
  const [live, setLive] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setLive(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Fetch the heavy three.js chunk while the preloader counts, then mount the
  // scene as soon as the preloader lifts so the orb shows right away.
  useEffect(() => {
    if (!started) return;
    // three.js module evaluation plus scene init costs about 700ms of
    // simulated blocking time, so both the import and the mount must land
    // outside the load trace to keep TBT low. Wait ~1.8s after the
    // preloader, then mount on idle: the orb still fades in a few seconds
    // after the preloader, but the hero text and interactivity win the
    // main thread first.
    let idleId: number | undefined;
    const t = setTimeout(() => {
      const mount = () => setSceneReady(true);
      if (window.requestIdleCallback) {
        idleId = window.requestIdleCallback(mount, { timeout: 1200 });
      } else {
        mount();
      }
    }, 1800);
    return () => {
      clearTimeout(t);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
    };
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
          animate={live ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {profile.name} · <T>{profile.role}</T>
        </motion.span>
        <motion.span
          className="hidden sm:block"
          initial={{ opacity: 0 }}
          animate={live ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <T>{profile.location}</T>
        </motion.span>
      </div>

      <div className="relative z-10 px-6 md:px-10">
        <h1 className="font-display display-hero">
          <SplitChars text="HAFIZ" className="block" delay={0} start={live} />
          <SplitChars text="HAMDANI" className="block text-outline italic" delay={0.15} start={live} />
        </h1>
        <div className="mt-8 flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={live ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
          <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
            <T>{HERO_COPY}</T>
          </p>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <T>Download CV</T>
          </a>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted"
            initial={{ opacity: 0 }}
            animate={live ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="inline-block h-px w-10 bg-muted" />
            <T>Scroll to discover</T>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
