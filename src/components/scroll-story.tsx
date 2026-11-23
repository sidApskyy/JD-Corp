"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  // Slow cinematic dolly push-in & parallax translation
  const scale = useTransform(smoothProgress, [0, 1], [1.14, 1.02]);
  const y = useTransform(smoothProgress, [0, 1], ["-5%", "5%"]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.4, 0.7, 1], [0.6, 0.35, 0.35, 0.65]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || reduce) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      className="hq-story-section"
      aria-label="The JD CORP office"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
    >
      {/* Top architectural seam light */}
      <div className="hq-seam-top" aria-hidden="true" />

      {/* Parallax image container */}
      <div className="hq-image-stage">
        <motion.div
          className="hq-image-motion"
          style={reduce ? undefined : { scale, y }}
        >
          <Image
            src="/images/WhatsApp Image 2026-10-30 at 10.29.18 PM (1).jpeg"
            alt="JD CORP executive office featuring illuminated walnut joinery, backlit world map and executive desk"
            fill
            sizes="100vw"
            priority
            className="hq-cover-image"
          />
        </motion.div>

        {/* Ambient atmospheric lighting bloom over illuminated shelving and map */}
        <div
          className="hq-ambient-bloom"
          style={{
            background: isHovered
              ? `radial-gradient(circle 550px at ${mousePos.x}% ${mousePos.y}%, rgba(231,201,138,0.18) 0%, rgba(184,134,59,0.08) 42%, transparent 75%)`
              : undefined,
          }}
          aria-hidden="true"
        />

        {/* Center world-map gentle breathing illumination */}
        <div className="hq-map-glow" aria-hidden="true" />

        {/* Cinematic rich contrast vignette */}
        <motion.div
          className="hq-vignette"
          style={reduce ? undefined : { opacity: overlayOpacity }}
          aria-hidden="true"
        />

        {/* Architectural gold corner registration brackets */}
        <div className="hq-frame container" aria-hidden="true">
          <span className="hq-corner top-left" />
          <span className="hq-corner top-right" />
          <span className="hq-corner bottom-left" />
          <span className="hq-corner bottom-right" />
        </div>

        {/* Top editorial HUD bar */}
        <div className="hq-top-hud container">
          <div className="hq-hud-left">
            <span className="hq-dot" />
            <span className="hq-hud-tag">JD CORP / THE OFFICE</span>
          </div>
          <div className="hq-hud-right">
            <span>COORDINATE — 01</span>
            <span className="hq-divider" />
            <span>WALNUT, BRASS AND THE MAP WALL</span>
          </div>
        </div>

        {/* Bottom editorial showcase copy */}
        <div className="hq-bottom-copy container">
          <div className="hq-copy-main">
            <span className="eyebrow hq-eyebrow">01 — THE LONG VIEW</span>
            <h2 className="hq-headline">
              Where the decisions<br />
              <em>are made.</em>
            </h2>
          </div>
          <div className="hq-copy-aside">
            <p>
              Walnut, brass and a map of the world. Our office is built the way we like to work: warm, exact and facing outward.
            </p>
            <div className="hq-badge">
              <span className="hq-badge-line" />
              <span className="hq-badge-label">SPACE TO THINK BIGGER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom architectural seam light */}
      <div className="hq-seam-bottom" aria-hidden="true" />
    </section>
  );
}
