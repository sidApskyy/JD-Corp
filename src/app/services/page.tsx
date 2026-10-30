import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionIntro, TextLink } from "@/components/ui";
import { BusinessCard } from "@/components/business-card";
import { businesses, serviceLenses } from "@/data/content";

export const metadata: Metadata = { title: "Services & Approach", description: "Explore JD CORP's engineering-minded engagement framework and sectors in focus.", alternates: { canonical: "/services" } };
export default function ServicesPage() {
  return <><PageHero index="04" eyebrow="SERVICES & APPROACH" title={<>From first idea<br /><em>to what follows.</em></>} intro="Across complex sectors, the strongest outcomes begin with a clear question and a connected view of the work ahead." image="/images/industry-walnut.jpg" imageAlt="Industrial manufacturing furnace inside a factory" />
    <section className="section-pad container"><SectionIntro number="01" label="THE ENGAGEMENT MAP" title={<>A longer view of<br /><em>the whole journey.</em></>} description="Four lenses for thinking through complex opportunities, from the first conversation to lasting relevance." /><p className="preview-notice">These are topics for discussion, not a confirmed list of JD CORP services. Exact capabilities still need approval.</p><div className="service-rows">{serviceLenses.map((lens) => <div key={lens.index}><span>{lens.index} / {lens.theme}</span><h3>{lens.title}</h3><p>{lens.description}</p></div>)}</div></section>
    <section className="service-feature"><div className="service-feature-image"><Image src="/images/facade-walnut.jpg" alt="Modern glass office buildings seen from below" fill sizes="(max-width: 800px) 100vw, 50vw" className="cover-image" /></div><div className="service-feature-copy"><span className="eyebrow">THE CONNECTED VIEW</span><h2>One question.<br /><em>Many perspectives.</em></h2><p>A project can touch the built environment, energy, technology and people at once. The best starting point is understanding how those parts connect.</p><TextLink href="/contact">START A CONVERSATION</TextLink></div></section>
    <section className="section-pad container"><SectionIntro number="02" label="EXPLORE THE FIELDS" title={<>Where thinking<br /><em>meets context.</em></>} description="A closer look at three sectors that show how different disciplines meet in the real world." /><p className="preview-notice">The photos are illustrative; they do not show JD CORP work.</p><div className="business-grid">{businesses.slice(0, 3).map((business) => <BusinessCard key={business.slug} business={business} />)}</div><div className="section-end"><span>THE FULL SECTOR INDEX</span><Link href="/businesses" className="text-link">EXPLORE ALL SECTORS <ArrowUpRight size={19} /></Link></div></section>
  </>;
}
