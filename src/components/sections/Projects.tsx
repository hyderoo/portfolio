"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import SectionHeading from "./SectionHeading";
import { FadeUp } from "../Reveal";
import { projects } from "@/lib/data";
import TestStatus from "../TestStatus";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 180, damping: 24 });
  const py = useSpring(my, { stiffness: 180, damping: 24 });

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const activeProject = projects.find((p) => p.title === active && p.preview);

  return (
    <section id="work" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-36">
      <SectionHeading index="03" label="Selected work" title="Things I've built." />
      <div ref={containerRef} className="relative hairline-t" onMouseMove={onMove}>
        {/* floating preview, desktop only */}
        <AnimatePresence>
          {activeProject?.preview && (
            <motion.div
              key={activeProject.title}
              className="pointer-events-none absolute z-20 hidden w-72 overflow-hidden rounded-md border border-line shadow-2xl shadow-black/60 lg:block"
              style={{ left: px, top: py, x: 24, y: -90 }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={activeProject.preview} alt="" className="aspect-[4/3] w-full object-cover object-top" />
            </motion.div>
          )}
        </AnimatePresence>

        {projects.map((p, i) => (
          <FadeUp key={p.title} delay={Math.min(i * 0.04, 0.2)}>
            <article
              className="group relative border-b border-line py-8 transition-colors duration-500 hover:bg-surface md:px-4"
              onMouseEnter={() => setActive(p.title)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="grid items-baseline gap-3 md:grid-cols-12 md:gap-8">
                <span className="text-sm text-accent md:col-span-1">{p.index}</span>
                <div className="md:col-span-4">
                  <h3 className="font-display text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{p.year}</p>
                  {p.ci && <TestStatus repo={p.ci.repo} workflow={p.ci.workflow} />}
                </div>
                <p className="max-w-md text-sm leading-relaxed text-muted md:col-span-5">{p.description}</p>
                <div className="flex gap-5 text-sm md:col-span-2 md:justify-end">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1 text-ink">
                      Live <ArrowIcon />
                    </a>
                  )}
                  <a href={p.repo} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-1 text-muted hover:text-ink">
                    Code <ArrowIcon />
                  </a>
                  {p.strategy && (
                    <a href={p.strategy} className="link-underline inline-flex items-center gap-1 text-accent">
                      Test strategy <ArrowIcon />
                    </a>
                  )}
                </div>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2 md:pl-[calc(8.333%+1rem)]">
                {p.tags.map((t) => (
                  <li key={t} className="text-xs text-muted/70">
                    {t}
                    <span className="mx-2 text-accent">·</span>
                  </li>
                ))}
              </ul>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
