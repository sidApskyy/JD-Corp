import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SectionIntro, Principles, CtaBand } from "@/components/ui";
import { SceneNiche } from "@/components/scene-showcase";
import { insights, visible } from "@/data/content";

export const metadata: Metadata = { title: "Journal", description: "Announcements, site updates and views from JD CORP.", alternates: { canonical: "/insights" } };
export default function InsightsPage() {
  const items = visible(insights);
  return <>
    <PageHero index="06" eyebrow="THE JOURNAL" title={<>Notes from<br /><em>the desk.</em></>} intro="Announcements, site updates and plain-spoken views on land, building and trade, published as they are ready." visual={<SceneNiche kind="compass" caption="The desk compass — the needle follows your pointer." credit="BRASS DESK COMPASS" />} />
    <section className="section-pad container"><div className="directory-heading"><span className="eyebrow">THE JOURNAL / LATEST</span><p>Short, useful and written by the people doing the work.</p></div>{items.length ? <div className="insights-grid">{items.map((item) => <Link className="insight-card" href={`/insights/${item.slug}`} key={item.slug}><div><Image src={item.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="cover-image" /></div><span>{item.category.toUpperCase()} / {item.date}</span><h2>{item.title} <ArrowUpRight size={23} /></h2><p>{item.summary}</p></Link>)}</div> : <div className="empty-editorial"><span>THE JOURNAL IS TAKING SHAPE</span><p>There are no verified announcements or articles to share yet. We&apos;ll publish them here when they are ready.</p></div>}</section>
    <section className="dark-band section-pad">
      <div className="container">
        <SectionIntro number="01" label="WHAT YOU WILL FIND HERE" title={<>Three kinds<br /><em>of note.</em></>} description="When the journal opens, this is what it will carry — nothing padded, nothing borrowed." />
        <Principles dark items={[
          { tag: "ANNOUNCEMENTS", title: "News with a date on it.", text: "New ventures, openings and milestones, published when they are confirmed — not before." },
          { tag: "SITE NOTES", title: "What the work teaches.", text: "Short, practical observations from land, site and operations, written by the people doing them." },
          { tag: "THE LONG VIEW", title: "Opinions we can defend.", text: "On land, building and trade — argued plainly, and only where we have done the reading." },
        ]} />
      </div>
    </section>
    <CtaBand eyebrow="IN THE MEANTIME" title={<>Ask us<br /><em>directly.</em></>} text="If you came looking for an answer the journal has not published yet, the desk is quicker." href="/contact" label="GET IN TOUCH" />
  </>;
}
