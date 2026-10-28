import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation with JD CORP about an idea, project or opportunity.", alternates: { canonical: "/contact" } };
export default function ContactPage() {
  return <><PageHero index="08" eyebrow="CONTACT" title={<>Let&apos;s start<br /><em>a conversation.</em></>} intro="Have a project, opportunity, or idea to discuss? Tell us what you have in mind." />
    <section className="contact-page-section section-pad container"><div className="contact-aside"><span className="eyebrow">MAKE THE NEXT MOVE</span><h2>Good things<br />begin with <em>hello.</em></h2><p>Use the form to share your enquiry. We&apos;ll only indicate success if your message is accepted by our delivery service.</p>{site.contactEmail && <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>}<div className="contact-aside-line"><span>JD CORP</span><span>BUILDING WITH PURPOSE</span></div></div><ContactForm /></section>
  </>;
}
