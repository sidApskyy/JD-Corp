import type { Metadata } from "next";
import { PageHero, SectionIntro, TextLink } from "@/components/ui";
import { vacancies, visible } from "@/data/content";

export const metadata: Metadata = { title: "Careers", description: "Explore careers and opportunities at JD CORP.", alternates: { canonical: "/careers" } };
export default function CareersPage() {
  const jobs = visible(vacancies);
  return <><PageHero index="07" eyebrow="CAREERS" title={<>Make room for<br /><em>what&apos;s next.</em></>} intro="Meaningful work is shaped by curious minds, clear thinking and a willingness to build something better together." image="/images/office-desk-detail.jpg" imageAlt="Executive desk and leather chair in the JD CORP office" />
    <section className="section-pad container"><SectionIntro number="01" label="WORKING TOGETHER" title={<>Good work starts<br /><em>with people.</em></>} description="A place for the opportunities and working principles that will shape the next chapter of JD CORP." /><div className="detail-columns"><div><span>01 / CURIOSITY</span><h3>Ask better questions.</h3><p>Be open to new perspectives and ideas.</p></div><div><span>02 / OWNERSHIP</span><h3>Care about the details.</h3><p>Bring attention and thought to the work in front of you.</p></div><div><span>03 / COLLABORATION</span><h3>Move forward together.</h3><p>Better outcomes often begin with shared thinking.</p></div></div></section>
    <section className="jobs-section section-pad"><div className="container"><div className="directory-heading"><span className="eyebrow">OPEN OPPORTUNITIES</span><p>Current roles at JD CORP.</p></div>{jobs.length ? jobs.map((job) => <a key={job.title} className="job-row" href={job.href}><strong>{job.title}</strong><span>{job.location}</span></a>) : <div className="empty-editorial"><span>NO CURRENT OPENINGS</span><p>We don&apos;t have any verified vacancies to share right now. For general enquiries, please use the contact form.</p></div>}<div className="page-end-link"><TextLink href="/contact">SEND A GENERAL ENQUIRY</TextLink></div></div></section>
  </>;
}
