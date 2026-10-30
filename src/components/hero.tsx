"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import ScrollExpand from "@/components/scroll-expand";

function StaticHero() {
  return <section className="hero-static">
    <img src="/images/office-hero.jpg" alt="JD CORP executive office with illuminated walnut shelving, world map feature panel and polished wood desk" fetchPriority="high" />
    <div className="hero-static-copy">
      <span className="eyebrow">A DIVERSIFIED CORPORATE GROUP</span>
      <h1>Building <em>What&apos;s Next.</em></h1>
      <p>At JD Corporation, we seek opportunities to bring ideas, capabilities, and people together to create lasting value.</p>
      <div className="hero-actions">
        <Link className="button-dark" href="/businesses">EXPLORE OUR BUSINESSES <ArrowUpRight size={17} /></Link>
        <Link className="button-line light" href="/contact">LET&apos;S CONNECT <ArrowUpRight size={17} /></Link>
      </div>
    </div>
  </section>;
}

export function Hero() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticHero />;
  return <section className="hero-expand" aria-label="JD CORP introduction">
    <ScrollExpand
      src="/images/office-hero.jpg"
      alt="JD CORP executive office with illuminated walnut shelving, world map feature panel and polished wood desk"
      useWindowScroll
      startWidth={44}
      startHeight={58}
      startRadius={0}
      mediaZoom={1.32}
      scrollDistance={1.15}
      holdDistance={0.45}
      smoothing={0.12}
      overlayScrim={0.68}
      scrollHint="SCROLL TO EXPLORE"
      title={<>
      <span className="hero-spotlight" aria-hidden="true" />
      <span className="hero-expand-title-inner">
        <span className="hero-expand-eyebrow">A DIVERSIFIED CORPORATE GROUP</span>
        <h1 className="hero-expand-h1">Building<br /><em>What&apos;s Next.</em></h1>
      </span>
    </>}
    >
      <div className="hero-expand-copy">
        <p>At JD Corporation, we seek opportunities to bring ideas, capabilities, and people together to create lasting value.</p>
        <div className="hero-actions">
          <Link className="button-dark light" href="/businesses">EXPLORE OUR BUSINESSES <ArrowUpRight size={17} /></Link>
          <Link className="button-line light" href="/contact">LET&apos;S CONNECT <ArrowUpRight size={17} /></Link>
        </div>
        <span className="hero-expand-fig">FIG. 001 - ARCHITECTURE AS POSSIBILITY</span>
      </div>
    </ScrollExpand>
  </section>;
}
