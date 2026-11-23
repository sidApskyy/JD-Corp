"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Business } from "@/data/content";

// "What are you bringing?" Pick what you have and see which business takes it first.
export function NeedFinder({ businesses }: { businesses: Business[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = businesses[active];
  return <div className="finder">
    <div className="finder-options" role="radiogroup" aria-label="What are you bringing to JD CORP?">
      {businesses.map((business, index) => <button key={business.slug} type="button" role="radio" aria-checked={index === active} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}>
        <span>{business.index}</span>{business.need}
      </button>)}
    </div>
    <div className="finder-result" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={current.slug} className="finder-card" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
          <div className="finder-image"><Image src={current.image} alt={current.imageAlt} fill sizes="(max-width: 980px) 100vw, 40vw" className="cover-image" /></div>
          <div className="finder-copy">
            <span className="eyebrow">START WITH {current.index} / {current.name.toUpperCase()}</span>
            <h3>{current.headline}</h3>
            <p>{current.description}</p>
            <Link href={`/businesses/${current.slug}`} className="text-link">OPEN {current.name.toUpperCase()} <ArrowUpRight size={18} strokeWidth={1.5} /></Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
}
