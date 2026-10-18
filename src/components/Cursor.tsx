"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35 });
  const springY = useSpring(y, { stiffness: 400, damping: 35 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      scale.set(t.closest("a, button, [data-cursor]") ? 3.2 : 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, scale]);

  return (
    <motion.div
      aria-hidden
      className="cursor-el h-3 w-3 rounded-full bg-white"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", scale }}
    />
  );
}
