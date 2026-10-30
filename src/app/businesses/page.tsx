import type { Metadata } from "next";
import { PageHero, TextLink } from "@/components/ui";
import { SectorExplorer } from "@/components/sector-explorer";
import { businesses } from "@/data/content";

export const metadata: Metadata = { title: "Sectors & Businesses", description: "Explore JD CORP's seven fields across the built environment, trade and services.", alternates: { canonical: "/businesses" } };
export default function BusinessesPage() {
  return <><PageHero index="02" eyebrow="SECTORS & BUSINESSES" title={<>One vision.<br /><em>Distinct capabilities.</em></>} intro="Explore seven fields spanning land development, real estate, construction, investment, trade, hospitality and marketing." image="/images/office-shelf-detail.jpg" imageAlt="Illuminated walnut office shelving with books, plants and brass objects" />
    <section className="section-pad container"><div className="directory-heading"><span className="eyebrow">THE SECTOR INDEX / 01—07</span><p>Distinct fields. A more connected view of what is possible.</p></div><p className="preview-notice">The photos are illustrative; they do not show JD CORP work.</p><SectorExplorer businesses={businesses} /><div className="section-end"><span>HAVE AN OPPORTUNITY IN MIND?</span><TextLink href="/contact">START A CONVERSATION</TextLink></div></section>
  </>;
}
