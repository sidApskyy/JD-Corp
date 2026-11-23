import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionIntro, TextLink, CtaBand } from "@/components/ui";
import { BusinessCard } from "@/components/business-card";
import { StageScroll } from "@/components/stage-scroll";
import { businesses, serviceLenses } from "@/data/content";

const details = [
  "SITE VISIT · MARKET READ · FIRST NUMBERS",
  "SCOPE IN WRITING · BUDGET · PROGRAMME",
  "PEOPLE · MATERIALS · APPROVALS · SITE",
  "HANDOVER · OPERATION · MAINTENANCE",
];
const stages = serviceLenses.map((lens, i) => ({ index: lens.index, title: lens.title, theme: lens.theme, description: lens.description, detail: details[i] }));

export const metadata: Metadata = { title: "How We Engage", description: "How JD CORP works: appraise, plan, deliver and operate, in that order.", alternates: { canonical: "/services" } };
export default function ServicesPage() {
  return <>
    <PageHero index="04" eyebrow="HOW WE ENGAGE" title={<>How we<br /><em>engage.</em></>} intro="Bring us a site, a project or a problem. This is the order we work in — scroll, and watch a brief become a building." image="/images/material-walnut-light.jpg" imageAlt="Conceptual illuminated walnut wall panels" />
    <section className="section-pad container">
      <SectionIntro number="01" label="THE SEQUENCE" title={<>Four stages.<br /><em>No shortcuts.</em></>} description="The same order applies whether the job is one plot or a whole development. The model assembles as you read each stage." />
      <p className="preview-notice">Scope is agreed project by project. This page describes how we work, not a fixed list of services or prices.</p>
      <StageScroll stages={stages} />
    </section>
    <section className="service-feature"><div className="service-feature-image"><Image src="/images/material-walnut-ribbed.jpg" alt="Conceptual ribbed walnut joinery with concealed warm lighting" fill sizes="(max-width: 800px) 100vw, 50vw" className="cover-image" /></div><div className="service-feature-copy"><span className="eyebrow">ONE TABLE</span><h2>One brief.<br /><em>Seven desks.</em></h2><p>A single project can need land, a builder, funding, imported materials, an operator and a launch. With JD CORP that is one conversation.</p><TextLink href="/contact">START A CONVERSATION</TextLink></div></section>
    <section className="section-pad container"><SectionIntro number="02" label="WHERE TO START" title={<>Start with the business<br /><em>you need.</em></>} description="Three of the seven. The rest are one click away." /><div className="business-grid">{businesses.slice(0, 3).map((business) => <BusinessCard key={business.slug} business={business} />)}</div><div className="section-end"><span>ALL SEVEN BUSINESSES</span><Link href="/businesses" className="text-link">VIEW THE DIRECTORY <ArrowUpRight size={19} /></Link></div></section>
    <CtaBand eyebrow="THE FIRST STEP" title={<>A site, a project<br /><em>or a problem.</em></>} text="Tell us which of the three you are holding, and we will tell you honestly whether and how it works." href="/contact" label="START A CONVERSATION" />
  </>;
}
