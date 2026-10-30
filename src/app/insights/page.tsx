import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero, TextLink } from "@/components/ui";
import { insights, visible } from "@/data/content";

export const metadata: Metadata = { title: "Insights", description: "Perspectives, updates and announcements from JD CORP when available.", alternates: { canonical: "/insights" } };
export default function InsightsPage() {
  const items = visible(insights);
  return <><PageHero index="06" eyebrow="INSIGHTS" title={<>Perspectives<br /><em>and progress.</em></>} intro="Ideas, observations and updates from across our world. Verified articles will appear here as they are published." image="/images/material-walnut-ribbed.jpg" imageAlt="Fine ribbed walnut panels with warm concealed lighting" />
    <section className="section-pad container"><div className="directory-heading"><span className="eyebrow">THE JOURNAL / LATEST</span><p>Thinking that looks beyond the immediate.</p></div>{items.length ? <div className="insights-grid">{items.map((item) => <Link className="insight-card" href={`/insights/${item.slug}`} key={item.slug}><div><Image src={item.image} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" className="cover-image" /></div><span>{item.category.toUpperCase()} / {item.date}</span><h2>{item.title} <ArrowUpRight size={23} /></h2><p>{item.summary}</p></Link>)}</div> : <div className="empty-editorial"><span>THE JOURNAL IS TAKING SHAPE</span><p>There are no verified announcements or articles to share yet. We&apos;ll publish them here when they are ready.</p></div>}<div className="page-end-link"><TextLink href="/contact">GET IN TOUCH</TextLink></div></section>
  </>;
}
