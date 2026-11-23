import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion-ui";

export function SectionIntro({ number, label, title, description, light = false }: { number: string; label: string; title: React.ReactNode; description?: string; light?: boolean }) {
  return <Reveal className={`section-intro ${light ? "section-intro-light" : ""}`}><div className="section-kicker"><span>{number} / {label}</span><span className="section-kicker-line" /></div><div className="section-intro-content"><h2>{title}</h2>{description && <p>{description}</p>}</div></Reveal>;
}

export function TextLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <Link href={href} className={`text-link ${light ? "text-link-light" : ""}`}><span>{children}</span><ArrowUpRight size={19} strokeWidth={1.5} /></Link>;
}

export function PageHero({ index, eyebrow, title, intro, image, imageAlt, visual }: { index?: string; eyebrow: string; title: React.ReactNode; intro: string; image?: string; imageAlt?: string; visual?: React.ReactNode }) {
  const side = visual ? "page-hero-visual" : image ? "page-hero-image" : "";
  return <section className={`page-hero ${side}`}>
    <div className="container page-hero-main">
      <div className="page-hero-meta page-hero-rise"><span>{index ? `${index} / ` : ""}JD CORP</span><span>{eyebrow}</span></div>
      <h1 className="page-hero-rise">{title}</h1>
      <p className="page-hero-rise">{intro}</p>
      <span className="page-hero-down" aria-hidden="true"><ArrowDown size={20} strokeWidth={1} /></span>
    </div>
    {visual ? <div className="page-hero-stage">{visual}</div> : image && <div className="page-hero-photo"><Image src={image} alt={imageAlt || ""} fill sizes="(max-width: 980px) 100vw, 44vw" loading="eager" fetchPriority="high" className="cover-image" /></div>}
  </section>;
}

export function Facts({ items }: { items: { value: string; label: string }[] }) {
  return <dl className="facts">{items.map((item, i) => <Reveal key={item.label} delay={i * 0.1} className="fact"><dt>{item.value}</dt><dd>{item.label}</dd></Reveal>)}</dl>;
}

export function Principles({ items, dark = false }: { items: { tag: string; title: string; text: string }[]; dark?: boolean }) {
  return <div className={`principles ${dark ? "principles-dark" : ""}`}>{items.map((item, i) => <Reveal key={item.title} delay={i * 0.1} className="principle"><span className="principle-no">{String(i + 1).padStart(2, "0")}</span><span className="principle-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></Reveal>)}</div>;
}

export function CtaBand({ eyebrow, title, text, href, label }: { eyebrow: string; title: React.ReactNode; text: string; href: string; label: string }) {
  return <section className="cta-band"><div className="container cta-band-inner"><Reveal><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></Reveal><Reveal delay={0.15} className="cta-band-side"><p>{text}</p><Link href={href} className="button-dark">{label} <ArrowUpRight size={17} /></Link></Reveal></div></section>;
}
