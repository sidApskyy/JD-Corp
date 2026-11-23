import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ScrollStory } from "@/components/scroll-story";
import { SectionIntro, TextLink } from "@/components/ui";
import { Reveal } from "@/components/motion-ui";
import { SectorExplorer } from "@/components/sector-explorer";
import { SiteModel } from "@/components/site-model";
import { TradeGlobe } from "@/components/trade-globe";
import { Sequence } from "@/components/sequence";
import { ShelfObjects } from "@/components/shelf-objects";
import { businesses } from "@/data/content";

export default function Home() {
  return <>
    <Hero />
    <section className="intro-section section-pad">
      <div className="intro-bg" aria-hidden="true"><Image src="/images/Cityscape on Walnut Grain.png" alt="" fill sizes="100vw" className="intro-bg-img" /></div>
      <div className="container">
        <div className="intro-marker"><span className="eyebrow">01 / THE GROUP</span><span className="thin-cross">+</span></div>
        <Reveal className="intro-body"><h2>Most groups collect businesses.<br /><em>We connect them.</em></h2><div className="intro-support"><p>A plot of land needs a plan. A plan needs a builder. A building needs capital, materials, guests and a story. JD CORP keeps all seven under one roof, so nothing is lost in the hand-offs.</p><TextLink href="/about">READ OUR STORY</TextLink></div></Reveal>
        <div className="intro-rule"><span>GROUND</span><span>STRUCTURE</span><span>ARRIVAL</span></div>
      </div>
    </section>
    <section className="model-section section-pad" id="model">
      <div className="container">
        <SectionIntro number="02" label="THE MODEL" title={<>Seven businesses.<br /><em>One working model.</em></>} description="Turn the model and pick a business. Each one hands something to the next, from the first survey to the guest at the door." light />
        <SiteModel businesses={businesses} />
      </div>
    </section>
    <section className="statement-section"><div className="statement-bg" aria-hidden="true"><Image src="/images/composition-walnut-portal.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 70vw" className="statement-bg-img" /></div><div className="container statement-inner"><span className="eyebrow">THE HOUSE VIEW</span><Reveal><p>A deal ends at signing.<br />A place begins there.<br /><em>We stay for both.</em></p></Reveal><span className="statement-coordinate">JD / 002 — THE LONG LEDGER</span></div></section>
    <section className="business-section section-pad" id="businesses"><div className="container"><SectionIntro number="03" label="THE BUSINESSES" title={<>Seven doors.<br /><em>One house.</em></>} description="Each business stands on its own. Open any door to see what it does and how to work with it." />
      <SectorExplorer businesses={businesses} />
      <div className="section-end"><span>EVERY BUSINESS, IN DETAIL</span><TextLink href="/businesses">VIEW ALL SEVEN</TextLink></div></div>
    </section>
    <section className="globe-section section-pad" id="reach">
      <div className="container globe-layout">
        <Reveal className="globe-copy">
          <span className="eyebrow">04 / BEYOND BOUNDARIES</span>
          <h2>The map on our wall<br /><em>is a working document.</em></h2>
          <p>A world map covers the wall of our office for a reason. Goods, capital and guests do not stop at a border, and the thinking behind them should not either.</p>
          <ul className="globe-points">
            <li><span>TRADE</span>Goods move to where they are needed.</li>
            <li><span>CAPITAL</span>Money goes where it is understood.</li>
            <li><span>HOSPITALITY</span>The door opens to whoever arrives.</li>
          </ul>
          <TextLink href="/businesses/import-export" light>EXPLORE IMPORT &amp; EXPORT</TextLink>
        </Reveal>
        <TradeGlobe />
      </div>
    </section>
    <section className="approach-section section-pad"><div className="approach-bg" aria-hidden="true"><Image src="/images/composition-ivory-joinery.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 80vw" className="approach-bg-img" /></div><div className="container"><SectionIntro number="05" label="HOW WE WORK" title={<>Four moves,<br /><em>in order.</em></>} />
      <div className="approach-grid"><div className="approach-lead"><p>Nothing here is complicated. It is simply done in sequence, and no step is skipped.</p><TextLink href="/services">HOW WE ENGAGE</TextLink></div><Sequence /></div></div></section>
    <ScrollStory />
    <section className="values-section section-pad"><div className="values-bg" aria-hidden="true"><Image src="/images/material-walnut-ribbed.jpg" alt="" fill sizes="100vw" className="values-bg-img" /></div><div className="container"><SectionIntro number="06" label="ON OUR SHELVES" title={<>Three objects.<br /><em>Three habits.</em></>} description="The things we keep on the office shelves say more about how we work than a mission statement would." />
      <ShelfObjects /><TextLink href="/sustainability">OUR RESPONSIBILITY</TextLink></div></section>
    <section className="insight-teaser" id="insight-teaser"><Image src="/images/Golden  Waterfront Skyline.png" alt="" fill sizes="100vw" className="insight-teaser-bg" /><div className="insight-teaser-copy"><Reveal><span className="eyebrow">07 / THE JOURNAL</span><h2>Notes from<br /><em>the desk.</em></h2><p>Announcements, site updates and plain-spoken views on land, building and trade will be published here as they are ready.</p><Link href="/insights" className="button-dark">OPEN THE JOURNAL <ArrowUpRight size={17} /></Link><span className="insight-teaser-credit">ILLUSTRATIVE ARCHITECTURAL STUDY</span></Reveal></div></section>
    <section className="contact-band"><div className="container"><div><span className="eyebrow">THE DOOR IS OPEN</span><h2>Bring the plot, the plan<br /><em>or just the idea.</em></h2></div><div><p>Tell us what you are working on. We will tell you honestly where we can help.</p><Link href="/contact" className="circle-arrow" aria-label="Get in touch"><ArrowUpRight size={35} strokeWidth={1.2} /></Link></div></div></section>
  </>;
}
