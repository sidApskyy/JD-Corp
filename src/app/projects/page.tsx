import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { ProjectFilter } from "@/components/project-filter";
import { projects, visible } from "@/data/content";

export const metadata: Metadata = { title: "Projects", description: "Explore verified project stories and editorial studies from JD CORP.", alternates: { canonical: "/projects" } };
export default function ProjectsPage() {
  const items = visible(projects);
  return <><PageHero index="03" eyebrow="PROJECTS" title={<>Ideas made<br /><em>tangible.</em></>} intro="A place for the work that gives ideas a physical form. Verified JD CORP projects will be published here when approved." image="/images/material-stone-dark.jpg" imageAlt="Dark polished stone with subtle warm veining" />
    <section className="work-section section-pad"><div className="container"><div className="directory-heading"><span className="eyebrow">THE PORTFOLIO / INDEX</span><p>Explore by theme or search for a particular story.</p></div>{items.length ? <><p className="preview-notice dark-notice">DEVELOPMENT PREVIEW / These editorial studies are not JD CORP projects.</p><ProjectFilter projects={items} /></> : <div className="empty-editorial dark-empty"><span>PORTFOLIO IN PREPARATION</span><p>No verified project stories are available yet. Please check back as our portfolio takes shape.</p></div>}</div></section>
  </>;
}
