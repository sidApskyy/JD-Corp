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
        <span className="eyebrow hero-eyebrow-reveal">SEVEN BUSINESSES. ONE GROUP.</span>
        <h1 className="hero-title-reveal">
          <span className="hero-line-inner">Land to</span>
          <span className="hero-line-inner"><em>landmark.</em></span>
        </h1>
        <p className="hero-desc-reveal">
          Land, real estate, construction, investment, trade, hospitality and marketing: seven businesses that work as one, so the ground we secure becomes the place people arrive at.
        </p>
        <div className="hero-actions hero-actions-reveal">
          <Link className="button-dark hero-btn-gold" href="/#model">
            <span>SEE HOW IT CONNECTS</span> <ArrowUpRight size={17} />
          </Link>
          <Link className="button-line light hero-secondary" href="/contact">
            <span>START A CONVERSATION</span> <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
