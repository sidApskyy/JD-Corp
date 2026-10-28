import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top"><span className="eyebrow">THE NEXT CHAPTER STARTS HERE</span><span className="footer-cross" aria-hidden="true">+</span></div>
        <div className="footer-invite"><h2>Ideas become meaningful<br />when they move <em>into the world.</em></h2><Link href="/contact" className="footer-cta" aria-label="Let's talk — contact JD CORP"><ArrowUpRight size={42} strokeWidth={1} /><span>LET&apos;S TALK</span></Link></div>
        <div className="footer-grid">
          <div><Link href="/" className="footer-logo">JD<span> / </span>CORP</Link><p>Building with purpose.<br />Shaping what comes next.</p></div>
          <div><span className="footer-label">DISCOVER</span><Link href="/about">About</Link><Link href="/businesses">Sectors</Link><Link href="/services">Services</Link><Link href="/projects">Projects</Link></div>
          <div><span className="footer-label">EXPLORE</span><Link href="/sustainability">Responsibility</Link><Link href="/insights">Insights</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link></div>
          <div><span className="footer-label">CONNECT</span><p>Have an idea or opportunity?<br />We&apos;d like to hear from you.</p><Link href="/contact" className="footer-contact-link">Get in touch <ArrowUpRight size={15} /></Link>{site.contactEmail && <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>}{site.social.map((item) => <a href={item.href} key={item.href} rel="noopener noreferrer" target="_blank">{item.label}</a>)}</div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} JD CORP. All rights reserved.</span><span>DESIGNED FOR WHAT&apos;S NEXT</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      </div>
    </footer>
  );
}
