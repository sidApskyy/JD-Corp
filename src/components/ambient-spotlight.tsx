"use client";

import { useEffect, useRef, useState } from "react";

export function AmbientSpotlight() {
  const [visible, setVisible] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId: number | null = null;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      // Smooth interpolation for fluid motion
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--spotlight-x", `${currentX.toFixed(1)}px`);
        spotlightRef.current.style.setProperty("--spotlight-y", `${currentY.toFixed(1)}px`);
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <div
      ref={spotlightRef}
      className={`ambient-spotlight ${visible ? "is-active" : ""}`}
      aria-hidden="true"
    />
  );
}
