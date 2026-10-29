"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import ScrollExpand from "@/components/scroll-expand";

function StaticHero() {
  return <section className="hero-static">
    <img src="/images/hero.jpg" alt="Sculptural contemporary building with angled glass and metal facade" fetchPriority="high" />
    <div className="hero-static-copy">
      <span className="eyebrow">JD CORP / A DIVERSIFIED CORPORATE GROUP</span>
      <h1>Building with purpose. <em>Shaping</em> what comes next<span className="accent-dot">.</span></h1>
      <p>We look at how land, buildings, capital and trade connect, and how better decisions can move each forward.</p>
      <div className="hero-actions">
        <Link className="button-dark" href="/businesses">EXPLORE OUR SECTORS <ArrowUpRight size={17} /></Link>
        <Link className="button-line light" href="/contact">START A CONVERSATION <ArrowUpRight size={17} /></Link>
      </div>
    </div>
  </section>;
}

export function Hero() {
  const reduce = useReducedMotion();
  if (reduce) return <StaticHero />;
  return <section className="hero-expand" aria-label="JD CORP introduction">
    <ScrollExpand
      src="/images/hero.jpg"
      alt="Sculptural contemporary building with angled glass and metal facade"
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
        <span className="hero-expand-eyebrow">JD CORP / A DIVERSIFIED CORPORATE GROUP</span>
        <span className="hero-expand-h1">Building with<br />purpose. <em>Shaping</em><br />what comes next<span className="accent-dot">.</span></span>
      </span>
    </>}
    >
      <div className="hero-expand-copy">
        <p>We look at how land, buildings, capital and trade connect, and how better decisions can move each forward.</p>
        <div className="hero-actions">
          <Link className="button-dark light" href="/businesses">EXPLORE OUR SECTORS <ArrowUpRight size={17} /></Link>
          <Link className="button-line light" href="/contact">START A CONVERSATION <ArrowUpRight size={17} /></Link>
        </div>
        <span className="hero-expand-fig">FIG. 001 - ARCHITECTURE AS POSSIBILITY</span>
      </div>
    </ScrollExpand>
  </section>;
}
