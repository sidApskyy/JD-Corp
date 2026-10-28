"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, X } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/data/content";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const reduce = useReducedMotion();
  const categories = ["All", ...new Set(projects.map((item) => item.category))];
  const filtered = projects.filter((item) => (category === "All" || item.category === category) && `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <><div className="filter-bar"><div className="filter-tabs" aria-label="Project categories">{categories.map((item) => <button key={item} type="button" className={category === item ? "selected" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === "All" ? projects.length : projects.filter((project) => project.category === item).length}</span></button>)}</div><label className="filter-search"><Search size={18} strokeWidth={1.5} /><span className="sr-only">Search projects</span><input type="search" placeholder="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={16} /></button>}</label></div>
    {filtered.length ? <motion.div layout={!reduce} className="project-grid filter-results"><AnimatePresence mode="popLayout">{filtered.map((item, index) => <motion.div key={item.slug} layout={!reduce} initial={reduce ? false : { opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={reduce ? undefined : { opacity: 0, scale: .97 }} transition={{ duration: .28 }}><ProjectCard project={item} index={index} /></motion.div>)}</AnimatePresence></motion.div> : <div className="empty-editorial dark-empty"><span>NO MATCHES FOUND</span><p>Try a different search or category.</p><button type="button" className="reset-filter" onClick={() => { setCategory("All"); setQuery(""); }}>CLEAR FILTERS</button></div>}
  </>;
}
