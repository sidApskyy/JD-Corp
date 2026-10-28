import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { projects, visible } from "@/data/content";
import { TextLink } from "@/components/ui";
import { ProjectCard } from "@/components/project-card";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return visible(projects).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = visible(projects).find((entry) => entry.slug === slug);
  if (!item) return { title: "Project not found" };
  return { title: `${item.title}${item.status === "draft" ? " — Editorial study" : ""}`, description: item.description, robots: item.status === "draft" ? { index: false, follow: false } : undefined, alternates: { canonical: `/projects/${slug}` } };
}
export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const item = visible(projects).find((entry) => entry.slug === slug);
  if (!item) notFound();
  const related = visible(projects).filter((entry) => entry.slug !== slug).slice(0, 2);
  return <><section className="project-detail-head container"><Link href="/projects" className="back-link"><ArrowLeft size={16} /> ALL PROJECTS</Link><div className="project-detail-title"><span className="eyebrow">{item.status === "draft" ? "EDITORIAL STUDY / NOT A JD CORP PROJECT" : item.category.toUpperCase()}</span><h1>{item.title}<span>.</span></h1><div><span>{item.category.toUpperCase()}</span><span>{item.location || "LOCATION NOT SPECIFIED"}</span></div></div></section>
    <div className="project-detail-hero"><Image src={item.image} alt={item.imageAlt} fill preload sizes="100vw" className="cover-image" /></div>
    <section className="section-pad container"><div className="content-split"><span className="eyebrow">01 / OVERVIEW</span><div><h2>A closer<br /><em>look.</em></h2><p>{item.description}</p>{item.status === "draft" && <p>This image and narrative are an illustrative layout preview only. They do not represent a project delivered, owned or commissioned by JD CORP.</p>}</div></div><div className="detail-image"><Image src={item.image} alt={`Closer view: ${item.imageAlt}`} fill sizes="100vw" className="cover-image detail-crop" /></div><div className="page-end-link"><TextLink href="/contact">DISCUSS AN OPPORTUNITY</TextLink></div></section>
    {related.length > 0 && <section className="related-section section-pad"><div className="container"><span className="eyebrow">CONTINUE EXPLORING</span><h2>More perspectives.</h2><div className="project-grid">{related.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></div></section>}
  </>;
}
