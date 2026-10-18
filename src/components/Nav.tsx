"use client";

import { motion } from "motion/react";
import { scrollTo } from "./SmoothScroll";
import { profile } from "@/lib/data";

const links = [
  { label: "About", target: "#about" },
  { label: "Experience", target: "#experience" },
  { label: "Work", target: "#work" },
  { label: "Contact", target: "#contact" },
];

export default function Nav({ visible }: { visible: boolean }) {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 mix-blend-difference"
      initial={{ y: -40, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="flex items-center justify-between px-6 py-5 text-white md:px-10">
        <button
          onClick={() => scrollTo("#top")}
          className="font-display text-lg italic"
        >
          dh.
          <span className="sr-only">Back to top</span>
        </button>
        <ul className="flex items-center gap-5 text-[11px] uppercase tracking-[0.22em] md:gap-8">
          {links.map((l) => (
            <li key={l.label} className="hidden md:block">
              <button className="link-underline" onClick={() => scrollTo(l.target)}>
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`} className="rounded-full border border-white/60 px-4 py-1.5 transition-colors hover:bg-white hover:text-black">
              Hire me
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
