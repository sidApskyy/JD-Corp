"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, .5, 1], [1.12, 1, 1.08]);
  return <div className="story-image" ref={ref}>
    <motion.div className="story-image-inner" style={reduce ? undefined : { y, scale }}>
      <Image src="/images/office-hero.jpg" alt="JD CORP executive office with illuminated map wall, shelving and polished desk" fill sizes="100vw" className="cover-image" />
    </motion.div>
    <div className="story-live" aria-hidden="true" /><div className="story-image-overlay"><span>01 — THE LONG VIEW</span><span>SPACE TO THINK BIGGER</span></div>
    <div className="story-image-mark" aria-hidden="true">+</div>
  </div>;
}
