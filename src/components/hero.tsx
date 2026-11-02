import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return <section className="hero-static" aria-label="JD CORP introduction">
    <Image
      src="/images/WhatsApp Image 2026-10-30 at 10.29.18 PM.jpeg"
      alt="Illuminated walnut feature wall with the JD Corporation mark and polished stone floor"
      fill
      sizes="100vw"
      preload
      className="hero-static-image"
    />
    <div className="hero-static-copy">
      <span className="eyebrow">A DIVERSIFIED CORPORATE GROUP</span>
      <h1>Building<br /><em>What&apos;s Next.</em></h1>
      <p>At JD Corporation, we seek opportunities to bring ideas, capabilities, and people together to create lasting value.</p>
      <div className="hero-actions">
        <Link className="button-dark" href="/businesses">EXPLORE OUR BUSINESSES <ArrowUpRight size={17} /></Link>
        <Link className="button-line light" href="/contact">LET&apos;S CONNECT <ArrowUpRight size={17} /></Link>
      </div>
      <span className="hero-static-fig">FIG. 001 - ARCHITECTURE AS POSSIBILITY</span>
    </div>
  </section>;
}
