"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion-ui";

const objects = [
  { key: "compass", name: "THE COMPASS", title: "Know the direction first.", text: "Every project starts with where it is going and why. The route comes after." },
  { key: "hourglass", name: "THE HOURGLASS", title: "Respect the time it takes.", text: "Good land, good buildings and good partners are not rushed. We plan in years, not quarters." },
  { key: "globe", name: "THE GLOBE", title: "Look past the fence.", text: "The better answer is often in another market, another discipline or another country." },
] as const;

function Compass() {
  const needle = useRef<SVGGElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = needle.current?.ownerSVGElement?.getBoundingClientRect();
        if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
        const angle = (Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2)) * 180) / Math.PI + 90;
        needle.current!.style.transform = `rotate(${angle}deg)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(frame); };
  }, []);
  return <svg viewBox="0 0 120 120" className="shelf-icon" aria-hidden="true">
    <circle cx="60" cy="60" r="50" /><circle cx="60" cy="60" r="42" className="thin" />
    {Array.from({ length: 24 }, (_, i) => <line key={i} x1="60" y1="12" x2="60" y2={i % 6 === 0 ? 22 : 17} transform={`rotate(${i * 15} 60 60)`} className="thin" />)}
    <g ref={needle} className="compass-needle"><path d="M60 22 L67 60 L60 98 L53 60 Z" className="thin" /><path d="M60 22 L67 60 L53 60 Z" className="fill" /></g>
    <circle cx="60" cy="60" r="3" className="fill" />
  </svg>;
}

function Hourglass() {
  return <svg viewBox="0 0 120 120" className="shelf-icon shelf-hourglass" aria-hidden="true">
    <g className="hourglass-body">
      <line x1="32" y1="14" x2="88" y2="14" /><line x1="32" y1="106" x2="88" y2="106" />
      <path d="M38 14 C38 44 56 50 56 60 C56 70 38 76 38 106 M82 14 C82 44 64 50 64 60 C64 70 82 76 82 106" />
      <path d="M46 34 H74 C70 44 62 50 60 56 C58 50 50 44 46 34 Z" className="fill sand-top" />
      <path d="M42 104 C46 92 54 88 60 86 C66 88 74 92 78 104 Z" className="fill sand-bottom" />
      <line x1="60" y1="58" x2="60" y2="88" className="sand-stream" />
    </g>
  </svg>;
}

function Globe() {
  return <svg viewBox="0 0 120 120" className="shelf-icon shelf-globe" aria-hidden="true">
    <circle cx="60" cy="56" r="38" />
    <ellipse cx="60" cy="56" rx="38" ry="13" className="thin" /><line x1="22" y1="56" x2="98" y2="56" className="thin" />
    <ellipse cx="60" cy="56" rx="14" ry="38" className="thin meridian m1" /><ellipse cx="60" cy="56" rx="28" ry="38" className="thin meridian m2" />
    <path d="M30 86 A44 44 0 0 0 96 80" className="thin" /><line x1="60" y1="96" x2="60" y2="108" /><line x1="42" y1="108" x2="78" y2="108" />
  </svg>;
}

const icons = { compass: <Compass />, hourglass: <Hourglass />, globe: <Globe /> };

export function ShelfObjects() {
  return <div className="shelf-grid">
    {objects.map((item, index) => <Reveal key={item.key} delay={index * 0.12} className="shelf-item">
      {icons[item.key]}
      <span className="value-no">{String(index + 1).padStart(2, "0")} / {item.name}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </Reveal>)}
  </div>;
}
