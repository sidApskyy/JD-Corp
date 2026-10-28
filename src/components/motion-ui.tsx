"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import type { ReactNode } from "react";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: .3 });
  if (reduce) return null;
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: .75, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
