import type { Metadata } from "next";
import { PageHero, TextLink } from "@/components/ui";
import { SectorExplorer } from "@/components/sector-explorer";
import { businesses } from "@/data/content";

export const metadata: Metadata = { title: "Sectors & Businesses", description: "Explore the infrastructure, energy, industrial, real estate and digital sectors in focus at JD CORP.", alternates: { canonical: "/businesses" } };
export default function BusinessesPage() {
  return <><PageHero index="02" eyebrow="SECTORS & BUSINESSES" title={<>Built for a world<br /><em>in motion.</em></>} intro="The built environment, essential resources, industry and technology all shape the future. Explore the sectors informing JD CORP's direction." image="/images/structure.jpg" imageAlt="Curving modern building forms framing the sky" />
    <section className="section-pad container"><div className="directory-heading"><span className="eyebrow">THE SECTOR INDEX / 01—06</span><p>Distinct fields. A more connected view of what is possible.</p></div><p className="preview-notice">The photos are illustrative; they do not show JD CORP work.</p><SectorExplorer businesses={businesses} /><div className="section-end"><span>HAVE AN OPPORTUNITY IN MIND?</span><TextLink href="/contact">START A CONVERSATION</TextLink></div></section>
  </>;
}
