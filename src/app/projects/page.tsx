import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/ui";
import { SceneShowcase } from "@/components/scene-showcase";
import { ProjectFilter } from "@/components/project-filter";
import { projects, visible } from "@/data/content";

export const metadata: Metadata = { title: "Projects", description: "Explore verified project stories and editorial studies from JD CORP.", alternates: { canonical: "/projects" } };
export default function ProjectsPage() {
  const items = visible(projects);
  return <>
    <PageHero index="03" eyebrow="PROJECTS" title={<>Ideas made<br /><em>tangible.</em></>} intro="A place for the work that gives ideas a physical form. Verified JD CORP projects will be published here when approved." visual={<SceneShowcase kind="plinth" items={[
      { index: "I", name: "FORM", line: "A folded, cantilevered volume" },
      { index: "II", name: "CITY", line: "A cluster of towers at different heights" },
      { index: "III", name: "INTERIOR", line: "A room cut open, with a stair and a lit table" },
    ]} hint="DRAG · CLICK A STUDY" credit="MASSING STUDIES, NOT TO SCALE" />} />
    <section className="work-section section-pad"><div className="container"><div className="directory-heading"><span className="eyebrow">THE PORTFOLIO / INDEX</span><p>Explore by theme or search for a particular story.</p></div>{items.length ? <><p className="preview-notice dark-notice">DEVELOPMENT PREVIEW / These editorial studies are not JD CORP projects.</p><ProjectFilter projects={items} /></> : <div className="empty-editorial dark-empty"><span>PORTFOLIO IN PREPARATION</span><p>No verified project stories are available yet. Please check back as our portfolio takes shape.</p></div>}</div></section>
    <CtaBand eyebrow="YOUR PROJECT" title={<>The next study<br /><em>could be yours.</em></>} text="Bring a plot, a design or a question about feasibility. The conversation costs nothing but the email." href="/contact" label="START A CONVERSATION" />
  </>;
}
