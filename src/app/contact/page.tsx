import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero, SectionIntro } from "@/components/ui";
import { SceneNiche } from "@/components/scene-showcase";
import { Accordion } from "@/components/accordion";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation with JD CORP about an idea, project or opportunity.", alternates: { canonical: "/contact" } };
export default function ContactPage() {
  return <>
    <PageHero index="08" eyebrow="CONTACT" title={<>Start with<br /><em>a conversation.</em></>} intro="A plot, a project, a partnership or a question. Tell us what you have in mind." visual={<SceneNiche kind="door" caption="The door is open." hint="DRAG TO TURN" credit="CONCEPT MODEL" />} />
    <section className="contact-page-section section-pad container"><div className="contact-aside"><span className="eyebrow">THE DOOR IS OPEN</span><h2>The first step<br />is <em>a simple one.</em></h2><p>Use the form to share your enquiry. We&apos;ll only indicate success if your message is accepted by our delivery service.</p>{site.contactEmail && <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>}<div className="contact-aside-line"><span>JD CORP</span><span>BUILDING WITH PURPOSE</span></div></div><ContactForm /></section>
    <section className="section-pad container">
      <SectionIntro number="01" label="BEFORE YOU WRITE" title={<>A few honest<br /><em>answers.</em></>} description="The questions people usually ask before pressing send." />
      <Accordion items={[
        { q: "Which business should I write to?", a: "You do not need to choose. Write to the group and say what you are bringing — a plot, drawings, capital, goods or a project to launch — and the enquiry is routed to the right desk." },
        { q: "What happens after I send the form?", a: "Your message goes to the team that triages new enquiries. You will see a confirmation only if the delivery service accepts it — we will never show success for a message that did not send." },
        { q: "Can I discuss more than one business at once?", a: "Yes — that is the point of the group. A single project often needs land, construction, capital and a launch, and one conversation can cover all of it." },
        { q: "Do you take on small enquiries?", a: "We would rather hear a small, clear enquiry than a large, vague one. Tell us plainly what you have and what you want, and we will tell you plainly whether it fits." },
      ]} />
    </section>
  </>;
}
