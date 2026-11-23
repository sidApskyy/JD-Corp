import type { Metadata } from "next";
import { PageHero, SectionIntro, TextLink, CtaBand } from "@/components/ui";
import { SceneShowcase } from "@/components/scene-showcase";
import { SectorExplorer } from "@/components/sector-explorer";
import { NeedFinder } from "@/components/need-finder";
import { businesses } from "@/data/content";

export const metadata: Metadata = { title: "The Businesses", description: "The seven businesses of JD CORP: land development, real estate, construction, investment, import and export, hotels and resorts, and marketing services.", alternates: { canonical: "/businesses" } };
export default function BusinessesPage() {
  return <>
    <PageHero index="02" eyebrow="THE BUSINESSES" title={<>Seven businesses.<br /><em>One address.</em></>} intro="From the first plot to the final guest: the seven businesses of JD CORP and what each one does." visual={<SceneShowcase kind="stack" items={businesses.map(b => ({ index: b.index, name: b.name.toUpperCase(), line: b.headline }))} hint="DRAG · CLICK A FLOOR" credit="CONCEPT MODEL" />} />
    <section className="section-pad container">
      <SectionIntro number="01" label="WHERE TO BEGIN" title={<>What are you<br /><em>bringing?</em></>} description="Start with what you have — a plot, drawings, capital, goods or a project to launch — and we will show you the door it enters through." />
      <NeedFinder businesses={businesses} />
    </section>
    <section className="dark-band business-section section-pad">
      <div className="container">
        <SectionIntro number="02" label="THE DIRECTORY" title={<>All seven,<br /><em>in the open.</em></>} description="Filter by group, or open a business to see its work and how to engage it." />
        <SectorExplorer businesses={businesses} />
        <div className="section-end"><span>NOT SURE WHICH DOOR?</span><TextLink href="/contact">START A CONVERSATION</TextLink></div>
      </div>
    </section>
    <CtaBand eyebrow="ONE CONVERSATION" title={<>Bring us the brief.<br /><em>We will seat it.</em></>} text="A single project can need land, a builder, funding, materials, an operator and a launch. With JD CORP that is one table." href="/contact" label="START A CONVERSATION" />
  </>;
}
