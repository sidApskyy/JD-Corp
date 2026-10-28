import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionIntro, TextLink } from "@/components/ui";

export const metadata: Metadata = { title: "About", description: "Discover the perspective, purpose and guiding principles behind JD CORP.", alternates: { canonical: "/about" } };
export default function AboutPage() {
  return <><PageHero index="01" eyebrow="ABOUT US" title={<>A clear vision.<br /><em>A long-term perspective.</em></>} intro="We believe meaningful progress begins with a broader view: one that brings purpose, possibility and practical thinking together." image="/images/tower.jpg" imageAlt="Modern towers rising into a clear sky" />
    <section className="content-section section-pad container"><div className="content-split"><span className="eyebrow">THE GROUP / IN PERSPECTIVE</span><div><h2>Looking beyond<br /><em>the obvious.</em></h2><p>JD CORP is a diversified corporate group with a forward-looking point of view. Our ambition is to connect ideas, capabilities and opportunities through thoughtful decisions and a long-term approach to value.</p><p>As our business information is confirmed, this page will grow to tell a fuller story of the people and work behind the group.</p></div></div></section>
    <section className="image-quote"><Image src="/images/structure.jpg" alt="Curving modern building forms framing the sky" fill sizes="100vw" className="cover-image" /><div className="container"><span>01 / PURPOSE</span><blockquote>To build with intention,<br />and think beyond <em>today.</em></blockquote></div></section>
    <section className="section-pad container"><SectionIntro number="02" label="OUR PRINCIPLES" title={<>A way of thinking.<br /><em>A way forward.</em></>} /><div className="detail-columns"><div><span>01 / PERSPECTIVE</span><h3>See the whole picture.</h3><p>Understanding the wider context helps us make more considered decisions.</p></div><div><span>02 / DISCIPLINE</span><h3>Follow through with care.</h3><p>Good ideas become meaningful through focus, consistency and attention to detail.</p></div><div><span>03 / POSSIBILITY</span><h3>Stay open to what&apos;s next.</h3><p>We look for new ways to connect thinking, people and opportunity.</p></div></div><div className="page-end-link"><TextLink href="/businesses">EXPLORE OUR BUSINESSES</TextLink></div></section>
  </>;
}
