import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { businesses } from "@/data/content";
import { BusinessCard } from "@/components/business-card";
import { PageHero, SectionIntro, CtaBand } from "@/components/ui";
import { ModelVignette } from "@/components/model-vignette";

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
  return <>
    <PageHero index={item.index} eyebrow={item.status === "focus" ? `${item.group.toUpperCase()} / SECTOR FOCUS` : "A JD CORP BUSINESS"} title={item.name} intro={item.description} image={item.image} imageAlt={item.imageAlt} />
    <section className="section-pad container">
      <Link href="/businesses" className="back-link"><ArrowLeft size={16} /> ALL BUSINESSES</Link>
      <div className="content-split"><span className="eyebrow">THE BUSINESS / {item.index}</span><div><h2>{item.headline}</h2><p>{item.description}</p><p>Within the group, {item.name} {item.step.charAt(0).toLowerCase() + item.step.slice(1)}</p>{item.status === "focus" && <p className="focus-disclosure">This is an area of interest, not a confirmed JD CORP division. We will publish exact services and projects once verified.</p>}</div></div>
      <div className="directory-heading"><span className="eyebrow">WHAT IT COVERS / {item.index}</span><p>{item.status === "focus" ? "Potential areas to explore within this sector." : "The main lines of work within this business."}</p></div>
      <div className="detail-columns">{item.services.map((service, index) => <div key={service}><span>{String(index + 1).padStart(2, "0")} / FOCUS</span><h3>{service}</h3><p>{item.status === "focus" ? "The scope of JD CORP's involvement in this area has not yet been confirmed." : "Talk to us about scope, timing and how we would approach it."}</p></div>)}</div>
    </section>
    <section className="dark-band section-pad">
      <div className="container">
        <SectionIntro number={item.index} label="ON THE TABLE" title={<>One business,<br /><em>in the group model.</em></>} description="Every JD CORP business has a place on the same table. Turn the model to see this one in context." />
        <div className="vignette-layout">
          <ModelVignette slug={item.slug} label={item.name.toUpperCase()} />
          <ol className="notes-list">
            {item.notes.map((note, index) => <li key={index}><span>{String(index + 1).padStart(2, "0")}</span><p>{note}</p></li>)}
          </ol>
        </div>
      </div>
    </section>
    {related.length > 0 && <section className="related-sector-section section-pad"><div className="container"><span className="eyebrow">ALSO IN THE GROUP</span><h2>The businesses next door.</h2><div className="business-grid business-grid-related">{related.map((entry) => <BusinessCard business={entry} key={entry.slug} />)}</div></div></section>}
    <CtaBand eyebrow={`${item.index} / ${item.name.toUpperCase()}`} title={<>Discuss<br /><em>this business.</em></>} text="Tell us what you are bringing — a plot, drawings, capital, goods or a launch — and we will answer from the right desk." href="/contact" label="START A CONVERSATION" />
  </>;
}
