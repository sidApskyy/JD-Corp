"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { isPreview, type Project } from "@/data/content";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  function move(event: React.PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - bounds.left) / bounds.width - .5) * -14}px`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - bounds.top) / bounds.height - .5) * -14}px`);
  }
  function reset(event: React.PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.removeProperty("--mx");
    event.currentTarget.style.removeProperty("--my");
  }
  const card = <Link href={`/projects/${project.slug}`} className="project-card" onPointerMove={move} onPointerLeave={reset}><div className="project-image"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 50vw" className="cover-image" /><span className="project-image-label">{String(index + 1).padStart(2, "0")} / {project.category.toUpperCase()}</span><span className="project-image-arrow"><ArrowUpRight size={22} strokeWidth={1.3} /></span></div><div className="project-meta"><h3>{project.title}</h3><span>{isPreview(project) ? "ILLUSTRATIVE STUDY" : (project.location || project.category).toUpperCase()}</span></div></Link>;
  if (reduce) return card;
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: .65, delay: index * .07, ease: [.22, 1, .36, 1] }}>{card}</motion.div>;
}