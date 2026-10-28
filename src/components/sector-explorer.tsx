"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Business } from "@/data/content";
import { BusinessCard } from "@/components/business-card";

export function SectorExplorer({ businesses }: { businesses: Business[] }) {
  const [active, setActive] = useState("All sectors");
  const groups = ["All sectors", ...new Set(businesses.map((b) => b.group))];
  const reduce = useReducedMotion();
  const shown = active === "All sectors" ? businesses : businesses.filter((business) => business.group === active);
  return <div className="sector-explorer">
    <div className="sector-controls"><span>EXPLORE BY DOMAIN</span><div role="group" aria-label="Filter sector focus areas">{groups.map((group) => <button type="button" key={group} aria-pressed={active === group} className={active === group ? "selected" : ""} onClick={() => setActive(group)}>{group}<span>{group === "All sectors" ? businesses.length : businesses.filter((item) => item.group === group).length}</span></button>)}</div></div>
    <motion.div layout={!reduce} className={`business-grid ${active === "All sectors" ? "" : "business-grid-filtered"}`}><AnimatePresence mode="popLayout">{shown.map((business, index) => <motion.div key={business.slug} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: .25 }}><BusinessCard business={business} index={index} /></motion.div>)}</AnimatePresence></motion.div>
  </div>;
}
