import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionIntro, Principles, CtaBand } from "@/components/ui";
import { SceneNiche } from "@/components/scene-showcase";

export const metadata: Metadata = { title: "Responsibility", description: "How JD CORP approaches quality, people and long-term ownership.", alternates: { canonical: "/sustainability" } };
export default function SustainabilityPage() {
  return <>
    <PageHero index="05" eyebrow="RESPONSIBILITY" title={<>Build as if<br /><em>you will keep it.</em></>} intro="Responsibility is not a department. It is what long-term ownership looks like in practice." visual={<SceneNiche kind="grove" caption="Light moves across the day. Planting grows in." hint="DRAG TO TURN" credit="CONCEPT MODEL" />} />
    <section className="section-pad container"><SectionIntro number="01" label="OUR FRAMEWORK" title={<>Long view.<br /><em>Short list.</em></>} description="Formal commitments and measured targets will be published here once verified. Until then, these are the standards we hold ourselves to." /><Principles items={[
      { tag: "QUALITY", title: "Do it once, properly.", text: "Work that has to be redone costs the client, the site and the neighbours." },
      { tag: "PEOPLE", title: "Look after the people on the job.", text: "Everyone who works on a project, or lives beside it, should be better off for it." },
      { tag: "FUTURE", title: "Leave the place better.", text: "Land outlasts every owner. We plan for the people who come after us." },
    ]} /><div className="responsibility-note"><span className="eyebrow">A NOTE ON TRANSPARENCY</span><p>Environmental targets, safety policies, certifications and performance data have not been supplied. This page does not make claims about those areas. Verified information can be added when available.</p></div></section>
    <div className="wide-image"><Image src="/images/composition-ivory-joinery.jpg" alt="Conceptual meeting of ivory stone and walnut joinery" fill sizes="100vw" className="cover-image" /></div>
    <CtaBand eyebrow="ACCOUNTABILITY" title={<>Ask us the<br /><em>hard question.</em></>} text="If a claim on this site needs a source, or a standard needs explaining, ask. We would rather answer than assert." href="/contact" label="TALK TO US" />
  </>;
}
