"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

type Step = { label: string; title: string; text: string };

const homeSteps: Step[] = [
  { label: "READ THE GROUND", title: "Know the site, the market and the numbers.", text: "Before a line is drawn, we want to understand what the land allows and what the market will bear." },
  { label: "COMMIT ON PAPER", title: "Agree scope, cost and timeline in plain language.", text: "What is promised is written down, so everyone at the table is working from the same page." },
  { label: "BUILD WITHOUT DRAMA", title: "Sequence the work, check it daily, fix it early.", text: "Most problems are small on the day they appear. That is the day to deal with them." },
  { label: "STAY AFTER HANDOVER", title: "Operate, maintain and keep answering.", text: "A finished building is the start of its working life, and of our responsibility for it." },
];

// A vertical run of steps with a brass line that fills as the reader moves down it.
export function Timeline({ steps, dark = false }: { steps: Step[]; dark?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <ol className={`sequence ${dark ? "sequence-dark" : ""}`} ref={ref}>
    <motion.span className="sequence-line" style={reduce ? { scaleY: 1 } : { scaleY }} aria-hidden="true" />
    {steps.map((step, index) => <motion.li key={step.label} initial={reduce ? false : { opacity: 0.25, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "0px 0px -30% 0px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <span className="sequence-node" aria-hidden="true" />
      <span className="sequence-label">{String(index + 1).padStart(2, "0")} / {step.label}</span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </motion.li>)}
  </ol>;
}

export function Sequence() {
  return <Timeline steps={homeSteps} />;
}
