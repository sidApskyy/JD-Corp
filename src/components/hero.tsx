import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-static" aria-label="JD CORP introduction">
      <Image
        src="/images/WhatsApp Image 2026-10-30 at 10.29.18 PM.jpeg"
        alt="Illuminated walnut feature wall with the JD Corporation mark and polished stone floor"
        fill
        sizes="100vw"
        priority
        className="hero-static-image"
      />
      <div className="hero-light-shimmer" aria-hidden="true" />
      <div className="hero-static-copy">
        <span className="eyebrow hero-eyebrow-reveal">A DIVERSIFIED CORPORATE GROUP</span>
        <h1 className="hero-title-reveal">
          <span className="hero-line-inner">Building</span>
          <span className="hero-line-inner"><em>What&apos;s Next.</em></span>
        </h1>
        <p className="hero-desc-reveal">
          At JD Corporation, we seek opportunities to bring ideas, capabilities, and people together to create lasting value.
        </p>
        <div className="hero-actions hero-actions-reveal">
          <Link className="button-dark hero-btn-gold" href="/businesses">
            <span>EXPLORE OUR BUSINESSES</span> <ArrowUpRight size={17} />
          </Link>
          <Link className="button-line light hero-secondary" href="/contact">
            <span>LET&apos;S CONNECT</span> <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
