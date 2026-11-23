import type { Metadata } from "next";
import { PageHero, SectionIntro, TextLink, Principles, CtaBand } from "@/components/ui";
import { SceneNiche } from "@/components/scene-showcase";
import { vacancies, visible } from "@/data/content";

export const metadata: Metadata = { title: "Careers", description: "Explore careers and opportunities at JD CORP.", alternates: { canonical: "/careers" } };
export default function CareersPage() {
  const jobs = visible(vacancies);
  return <>
    <PageHero index="07" eyebrow="CAREERS" title={<>Work where<br /><em>the work connects.</em></>} intro="A group with seven businesses needs people who are curious about more than one." visual={<SceneNiche kind="network" caption="Seven clusters of desks — move your pointer across them." hint="MOVE YOUR POINTER" credit="THE GROUP, ABSTRACTED" />} />
    <section className="section-pad container"><SectionIntro number="01" label="WHAT WE LOOK FOR" title={<>Good people.<br /><em>Clear work.</em></>} description="Three things matter here, whatever the role." /><Principles items={[
      { tag: "CURIOSITY", title: "Ask how it works.", text: "Then ask how it connects to the business next door." },
      { tag: "OWNERSHIP", title: "Finish what you start.", text: "Details are where trust is earned." },
      { tag: "CANDOUR", title: "Say it early.", text: "A problem is cheapest on the day it is found." },
    ]} /></section>
    <section className="jobs-section section-pad"><div className="container"><div className="directory-heading"><span className="eyebrow">OPEN OPPORTUNITIES</span><p>Current roles at JD CORP.</p></div>{jobs.length ? jobs.map((job) => <a key={job.title} className="job-row" href={job.href}><strong>{job.title}</strong><span>{job.location}</span></a>) : <div className="empty-editorial"><span>NO CURRENT OPENINGS</span><p>We don&apos;t have any verified vacancies to share right now. For general enquiries, please use the contact form.</p></div>}<div className="page-end-link"><TextLink href="/contact">SEND A GENERAL ENQUIRY</TextLink></div></div></section>
    <CtaBand eyebrow="NO OPEN ROLE?" title={<>Write anyway.<br /><em>Good letters keep.</em></>} text="Tell us which business you see yourself in and what you would bring to its desk." href="/contact" label="SEND A GENERAL ENQUIRY" />
  </>;
}
