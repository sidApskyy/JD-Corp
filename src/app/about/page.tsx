import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionIntro, TextLink } from "@/components/ui";
import { Reveal } from "@/components/motion-ui";
import { businesses } from "@/data/content";

const fieldList = new Intl.ListFormat("en", { type: "conjunction" }).format(businesses.map(b => b.name));
const groups = [...new Set(businesses.map(b => b.group))].map(g => g.toLowerCase());

export const metadata: Metadata = { title: "About JD CORP", description: `A corporate group working across ${businesses.length} fields: ${fieldList}.`, alternates: { canonical: "/about" } };
export default function AboutPage() {
  return <>
    <PageHero eyebrow="ABOUT US" title={<>A clear vision.<br /><em>A long-term perspective.</em></>} intro="We believe meaningful progress begins with a broader view: one that brings purpose, possibility and practical thinking together." image="/images/tower.jpg" imageAlt="Modern towers rising into a clear sky" />
    <section className="content-section section-pad container">
      <Reveal>
        <div className="content-split">
          <span className="eyebrow">THE GROUP / IN PERSPECTIVE</span>
          <div>
            <h2>Looking beyond<br /><em>the obvious.</em></h2>
            <p>JD CORP is a corporate group working across {businesses.length} fields: {fieldList}. We look at how these disciplines connect, and how better decisions can build lasting value over time.</p>
            <p>Our work is organized around two groups — {groups.join(" and ")} — with the same long-term perspective running through each one.</p>
          </div>
        </div>
      </Reveal>
    </section>
    <section className="image-quote">
      <Image src="/images/structure.jpg" alt="Curving modern building forms framing the sky" fill sizes="100vw" className="cover-image" />
      <div className="container">
        <Reveal>
          <span>01 / PURPOSE</span>
          <blockquote>To build with intention,<br />and think beyond <em>today.</em></blockquote>
          <p className="preview-notice">This image is illustrative and does not represent a specific JD CORP project or location.</p>
        </Reveal>
      </div>
    </section>
    <section className="section-pad container">
      <SectionIntro number="02" label="OUR PRINCIPLES" title={<>A way of thinking.<br /><em>A way forward.</em></>} description="Three principles guide how we think across every sector." />
      <Reveal delay={0.15}>
        <div className="detail-columns">
          <div>
            <span>01 / PERSPECTIVE</span>
            <h3>See the whole picture.</h3>
            <p>From land planning to trade logistics, we connect decisions across disciplines rather than working in isolation.</p>
          </div>
          <div>
            <span>02 / DISCIPLINE</span>
            <h3>Build with precision.</h3>
            <p>Every phase — planning, capital, construction, operations — is managed with care, consistency and long-term intent.</p>
          </div>
          <div>
            <span>03 / POSSIBILITY</span>
            <h3>Shape what&apos;s next.</h3>
            <p>We look for new ways to combine places, capital and markets so that value grows over time.</p>
          </div>
        </div>
      </Reveal>
      <div className="page-end-link">
        <TextLink href="/contact">START A CONVERSATION</TextLink>
        <TextLink href="/businesses">EXPLORE OUR BUSINESSES</TextLink>
      </div>
    </section>
  </>;
}
