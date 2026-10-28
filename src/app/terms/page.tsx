import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Terms of Use", description: "Preliminary terms of use for the JD CORP website.", alternates: { canonical: "/terms" } };
export default function TermsPage() {
  return <><PageHero index="10" eyebrow="LEGAL" title={<>Terms of <em>use.</em></>} intro="Information about using this website." /><div className="legal-body container"><p className="legal-warning">Development notice: These terms are placeholders for review by legal counsel and must not be treated as approved legal terms.</p><h2>Website information</h2><p>The content on this site is provided for general information and may change. Development-only concept directions and editorial studies do not describe actual JD CORP divisions or projects.</p><h2>Imagery</h2><p>Architectural photographs are stock images used to illustrate the design direction. They do not depict JD CORP projects, premises or activities.</p><h2>External links</h2><p>Any external sites are operated independently. Review their terms and policies before using them.</p><p>Last reviewed: pending legal approval.</p></div></>;
}
