import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ScrollStory } from "@/components/scroll-story";
import { SectionIntro, TextLink } from "@/components/ui";
import FadeContent from "@/components/fade-content";
import { SectorExplorer } from "@/components/sector-explorer";
import { ProjectCard } from "@/components/project-card";
import { GradientCarousel } from "@/components/gradient-carousel";
import FluidGlass from "@/components/fluid-glass";
import { SectorCarousel } from "@/components/sector-carousel";
import { businesses, gallery, projects, visible } from "@/data/content";

export default function Home() {
  const listedProjects = visible(projects);
  return <>
    <Hero />
    <div className="pair-stack">
    <section className="intro-section section-pad container"><div className="intro-glass" aria-hidden="true"><FluidGlass src="/images/port-sketch.png" text="" shape="lens" size={230} refraction={1.2} shadow={0.4} morphOnClick={false} /></div>
      <div className="intro-marker"><span className="eyebrow">01 / OUR PERSPECTIVE</span><span className="thin-cross">+</span></div>
      <FadeContent className="intro-body" effect="mist" duration={1.8} ease="power2.out" stagger={0.25} threshold={0.15}><h2>Many disciplines.<br /><em>One wider view.</em></h2><div className="intro-support"><p>Infrastructure, resources, industry and technology do not exist in isolation. JD CORP looks at how connected thinking can shape better possibilities across the built world.</p><TextLink href="/about">DISCOVER OUR PERSPECTIVE</TextLink></div></FadeContent>
      <div className="intro-rule"><span>PLACES</span><span>SYSTEMS</span><span>PROGRESS</span></div>
    </section>
    <section className="business-section section-pad" id="businesses"><div className="container"><SectionIntro number="02" label="SECTORS IN FOCUS" title={<>A world of work.<br /><em>Connected by purpose.</em></>} description="Explore the sectors shaping our perspective, from the places we build to the systems that make them possible." />
      <FadeContent effect="mist" duration={1.4} stagger={0.15} threshold={0.15}>
      <p className="preview-notice">The photos are illustrative; they do not show JD CORP work.</p>
      <SectorExplorer businesses={businesses} />
      </FadeContent>
      <div className="section-end"><span>GO DEEPER INTO EACH SECTOR</span><TextLink href="/businesses">EXPLORE ALL SECTORS</TextLink></div></div>
    </section>
    </div>
    <section className="statement-section"><div className="statement-bg" aria-hidden="true"><Image src="/images/blueprint-sketch.png" alt="" fill sizes="(max-width: 800px) 100vw, 70vw" className="statement-bg-img" /></div><div className="container statement-inner"><span className="eyebrow">BUILDING WITH INTENTION</span><p>Progress is not just about<br />what we create. It is about<br /><em>what we make possible.</em></p><span className="statement-coordinate">JD / 002 — A LONGER VIEW</span></div></section>
    <section className="gallery-section" id="gallery"><div className="container"><SectionIntro number="03" label="THE FIELDS IN FRAME" title={<>Seven fields.<br /><em>One direction.</em></>} description="A closer look at the sectors we work across. Drag, scroll or click through the gallery." light /></div><div className="container gallery-stage"><SectorCarousel items={gallery} /></div></section>
    <section className="work-section section-pad" id="work"><div className="work-bg" aria-hidden="true"><Image src="/images/bronze-waveform.png" alt="" fill sizes="100vw" className="work-bg-img" /></div><div className="container"><SectionIntro number="04" label="FIELDS OF POSSIBILITY" title={<>Think at scale.<br /><em>Work with intention.</em></>} description="The most important challenges cross boundaries. Take a closer look at two of the sector lenses informing our direction." light />
      {listedProjects.length > 0 ? <><p className="preview-notice dark-notice">These are editorial studies, not JD CORP projects. The photos are illustrative.</p><GradientCarousel items={listedProjects.map(project => ({ src: project.image, alt: project.imageAlt, title: project.title, slug: project.slug }))} /></> : <><p className="preview-notice dark-notice">These images illustrate sector themes. They do not show JD CORP projects.</p><div className="spotlight-grid"><Link href="/businesses/construction" className="spotlight-card"><div className="spotlight-image"><Image src="/images/infrastructure.jpg" alt="Cranes above an urban construction site" fill sizes="(max-width: 700px) 100vw, 50vw" className="cover-image" /></div><div><span>03 / BUILT ENVIRONMENT</span><h3>Plans become structures.</h3><ArrowUpRight size={23} /></div></Link><Link href="/businesses/hotels-resorts" className="spotlight-card"><div className="spotlight-image"><Image src="/images/hotel-resorts.jpg" alt="Resort swimming pool surrounded by palm trees" fill sizes="(max-width: 700px) 100vw, 50vw" className="cover-image" /></div><div><span>06 / HOSPITALITY</span><h3>Hospitality designed for memory.</h3><ArrowUpRight size={23} /></div></Link></div></>}
      <div className="section-end dark-end"><span>PROJECT STORIES WILL FOLLOW VERIFICATION</span><TextLink href="/projects" light>VISIT THE PORTFOLIO</TextLink></div></div>
    </section>
    <section className="approach-section section-pad"><div className="approach-bg" aria-hidden="true"><Image src="/images/journey-sketch.png" alt="" fill sizes="(max-width: 800px) 100vw, 80vw" className="approach-bg-img" /></div><div className="container"><SectionIntro number="05" label="HOW WE THINK" title={<>A disciplined approach<br /><em>to what comes next.</em></>} />
      <div className="approach-grid"><div className="approach-lead"><p>Big ambitions need clear thinking. We believe in connecting perspective with practical action, and keeping the long view in sight at every step.</p><TextLink href="/services">EXPLORE OUR APPROACH</TextLink></div><div className="approach-list"><div><span>01 / CLARITY</span><h3>Start with the right questions.</h3><p>Understanding context, priorities and possibilities before moving forward.</p></div><div><span>02 / INTENTION</span><h3>Make every decision count.</h3><p>Bringing focus and care to the choices that shape an outcome.</p></div><div><span>03 / CONTINUITY</span><h3>Think beyond the immediate.</h3><p>Looking for value that lasts beyond the first milestone.</p></div></div></div></div></section>
    <ScrollStory />
    <section className="values-section section-pad"><div className="values-bg" aria-hidden="true"><Image src="/images/golden-path.png" alt="" fill sizes="100vw" className="values-bg-img" /></div><div className="container"><SectionIntro number="06" label="WHAT MATTERS" title={<>Built around<br /><em>what matters.</em></>} description="Principles to guide thoughtful decisions, responsible growth and lasting relationships." />
      <FadeContent className="values-grid" effect="focus" duration={1} stagger={0.12}><div><span className="value-no">01 /</span><h3>Quality as a mindset.</h3><p>Attention to detail is not an afterthought. It shapes the way we think about every opportunity.</p></div><div><span className="value-no">02 /</span><h3>Responsibility in action.</h3><p>A long-term outlook asks us to consider people, places and the consequences of our choices.</p></div><div><span className="value-no">03 /</span><h3>Progress through ideas.</h3><p>We stay open to better ways of thinking, working and creating value together.</p></div></FadeContent><TextLink href="/sustainability">OUR RESPONSIBILITY</TextLink></div></section>
    <section className="insight-teaser"><div className="insight-teaser-image"><Image src="/images/facade.jpg" alt="Geometric modern building facade" fill sizes="(max-width: 800px) 100vw, 50vw" className="cover-image" /></div><div className="insight-teaser-copy"><FadeContent effect="develop" duration={1.3}><span className="eyebrow">07 / PERSPECTIVES & PROGRESS</span><h2>Always looking<br /><em>forward.</em></h2><p>Ideas, observations and announcements from JD CORP will find a home here as they become available.</p><Link href="/insights" className="button-dark">EXPLORE INSIGHTS <ArrowUpRight size={17} /></Link></FadeContent></div></section>
    <section className="contact-band"><div className="container"><div><span className="eyebrow">THE CONVERSATION STARTS HERE</span><h2>Let&apos;s make the next<br /><em>move meaningful.</em></h2></div><div><p>Have a project, opportunity, or idea to discuss? Start a conversation with JD CORP.</p><Link href="/contact" className="circle-arrow" aria-label="Get in touch"><ArrowUpRight size={35} strokeWidth={1.2} /></Link></div></div></section>
  </>;
}
