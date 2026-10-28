import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { businesses } from "@/data/content";
import { BusinessCard } from "@/components/business-card";
import { PageHero, TextLink } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return businesses.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = businesses.find((entry) => entry.slug === slug);
  if (!item) return { title: "Business not found" };
  return { title: `${item.name}${item.status === "focus" ? " — Sector focus" : ""}`, description: item.description, robots: item.status === "focus" ? { index: false, follow: true } : undefined, alternates: { canonical: `/businesses/${slug}` } };
}
export default async function BusinessDetail({ params }: Props) {
  const { slug } = await params;
  const item = businesses.find((entry) => entry.slug === slug);
  if (!item) notFound();
  const related = businesses.filter((entry) => entry.slug !== slug && entry.group === item.group).slice(0, 2);
  return <><PageHero index={item.index} eyebrow={item.status === "focus" ? `${item.group.toUpperCase()} / SECTOR FOCUS` : "BUSINESS DIVISION"} title={item.name} intro={item.description} image={item.image} imageAlt={item.imageAlt} />
    <section className="section-pad container"><Link href="/businesses" className="back-link"><ArrowLeft size={16} /> ALL SECTORS</Link><div className="content-split"><span className="eyebrow">THE SECTOR / {item.index}</span><div><h2>{item.headline}</h2><p>{item.description}</p>{item.status === "focus" && <p className="focus-disclosure">This is an area of interest, not a confirmed JD CORP division. We will publish exact services and projects once verified.</p>}</div></div>
      <div className="directory-heading"><span className="eyebrow">TOPICS IN VIEW / {item.index}</span><p>{item.status === "focus" ? "Potential areas to explore within this sector." : "Areas of expertise within this business."}</p></div>
      <div className="detail-columns">{item.services.map((service, index) => <div key={service}><span>{String(index + 1).padStart(2, "0")} / FOCUS</span><h3>{service}</h3><p>{item.status === "focus" ? "The scope of JD CORP's involvement in this area has not yet been confirmed." : "Get in touch to discuss this area of work."}</p></div>)}</div>
      <div className="page-end-link"><TextLink href="/contact">DISCUSS THIS SECTOR</TextLink></div>
    </section>
    {related.length > 0 && <section className="related-sector-section section-pad"><div className="container"><span className="eyebrow">RELATED PERSPECTIVES</span><h2>Explore what connects.</h2><div className="business-grid business-grid-related">{related.map((entry) => <BusinessCard business={entry} key={entry.slug} />)}</div></div></section>}
  </>;
}
