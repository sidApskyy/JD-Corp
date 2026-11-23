import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionIntro, Facts, Principles, CtaBand } from "@/components/ui";
import { SceneNiche } from "@/components/scene-showcase";
import { Timeline } from "@/components/sequence";
import { businesses } from "@/data/content";

const fieldList = new Intl.ListFormat("en", { type: "conjunction" }).format(businesses.map(b => b.name));
const groups = [...new Set(businesses.map(b => b.group))].map(g => g.toLowerCase());
const chain = businesses.map(b => ({ label: `${b.index} / ${b.name.toUpperCase()}`, title: b.headline, text: b.step }));

export const metadata: Metadata = { title: "About JD CORP", description: `JD CORP is one group with seven businesses, working across ${businesses.length} fields: ${fieldList}.`, alternates: { canonical: "/about" } };
export default function AboutPage() {
  return <>
    <PageHero eyebrow="ABOUT US" title={<>One group.<br /><em>Seven working parts.</em></>} intro="JD CORP runs on a simple idea: the businesses that create a place should sit at the same table." visual={<SceneNiche kind="office" caption="The JD CORP office, in miniature." hint="DRAG TO LOOK AROUND" credit="INSPIRED BY THE JD CORP OFFICE" />} />
    <section className="content-section section-pad container">
      <div className="content-split">
        <span className="eyebrow">THE GROUP / IN BRIEF</span>
        <div>
          <h2>Built to<br /><em>join things up.</em></h2>
          <p>JD CORP is a corporate group working across {businesses.length} fields: {fieldList}. Each is a business in its own right. Together they cover the whole life of a place, from the first survey to the guest at the door.</p>
          <p>That is the point of the group. When land, construction, capital, supply, operations and marketing answer to one office, decisions are quicker, hand-offs are cleaner and someone is always accountable. The work is organised in two groups: {groups.join(" and ")}.</p>
        </div>
      </div>
      <Facts items={[
        { value: "07", label: "Businesses, one address" },
        { value: "02", label: "Working groups" },
        { value: "01", label: "Table for every decision" },
        { value: "00", label: "Shortcuts taken" },
      ]} />
    </section>
    <section className="dark-band section-pad">
      <div className="container">
        <SectionIntro number="02" label="THE CHAIN" title={<>Land to guest.<br /><em>In one line.</em></>} description="Each business hands clean work to the next. Read down the line — it is the same order every project travels." />
        <Timeline steps={chain} dark />
      </div>
    </section>
    <section className="image-quote">
      <Image src="/images/composition-walnut-portal.jpg" alt="Conceptual stone portal framed by ribbed walnut and brass light" fill sizes="100vw" className="cover-image" />
      <div className="container">
        <div>
          <span>03 / PURPOSE</span>
          <blockquote>Take the long way<br />when it is the <em>right way.</em></blockquote>
          <p className="preview-notice">This is a conceptual material study, not a JD CORP project or location.</p>
        </div>
      </div>
    </section>
    <section className="section-pad container">
      <SectionIntro number="04" label="HOW WE DECIDE" title={<>Three rules.<br /><em>No exceptions.</em></>} description="They apply to a single plot and to the whole group alike." />
      <Principles items={[
        { tag: "WHOLE PICTURE", title: "Decide with every desk in the room.", text: "Land, build, finance, supply and operations weigh in before a commitment is made, not after." },
        { tag: "PLAIN TERMS", title: "Say it simply. Write it down.", text: "Scope, cost and timing are set out in language anyone at the table can hold us to." },
        { tag: "LONG HOLD", title: "Build what we would keep.", text: "If we would not want to own it in twenty years, we should not be building it today." },
      ]} />
    </section>
    <CtaBand eyebrow="NEXT" title={<>See how the seven<br /><em>fit together.</em></>} text="The directory shows what each business does and where your enquiry should begin." href="/businesses" label="EXPLORE THE BUSINESSES" />
  </>;
}
