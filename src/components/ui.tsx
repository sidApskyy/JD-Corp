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

export function PageHero({ index, eyebrow, title, intro, image, imageAlt }: { index: string; eyebrow: string; title: React.ReactNode; intro: string; image?: string; imageAlt?: string }) {
  return <section className={`page-hero ${image ? "page-hero-image" : ""}`}><div className="container page-hero-main"><div className="page-hero-meta"><span>{index} / JD CORP</span><span>{eyebrow}</span></div><h1>{title}</h1><p>{intro}</p><span className="page-hero-down" aria-hidden="true"><ArrowDown size={20} strokeWidth={1} /></span></div>{image && <div className="page-hero-photo"><Image src={image} alt={imageAlt || ""} fill sizes="100vw" loading="eager" fetchPriority="high" className="cover-image" /></div>}</section>;
}
