"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { scrollTo } from "./SmoothScroll";
import { profile } from "@/lib/data";
import { LangSwitch, T } from "@/lib/lang";

const links = [
  { label: "About", target: "#about" },
  { label: "Experience", target: "#experience" },
  { label: "Work", target: "#work" },
  { label: "Contact", target: "#contact" },
];

export default function Nav({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line/60 bg-bg/80 backdrop-blur-md"
          : "mix-blend-difference"
      }`}
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
          <span className="sr-only"><T>Back to top</T></span>
        </button>
        <ul className="flex items-center gap-5 text-[11px] uppercase tracking-[0.22em] md:gap-8">
          {links.map((l) => (
            <li key={l.label} className="hidden md:block">
              <button className="link-underline" onClick={() => scrollTo(l.target)}>
                <T>{l.label}</T>
              </button>
            </li>
          ))}
          <li>
            <LangSwitch />
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="rounded-full border border-white/60 px-4 py-1.5 transition-colors hover:bg-white hover:text-black">
              <T>Hire me</T>
            </a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
