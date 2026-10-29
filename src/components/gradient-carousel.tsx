"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Item = { src: string; alt: string; title: string; slug: string };

export function GradientCarousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);
  const drag = useRef({ active: false, x: 0, moved: false });
  const n = items.length;

  useEffect(() => {
    const t = setTimeout(() => setIndex(i => (i + 1) % n), 4500);
    return () => clearTimeout(t);
  }, [index, n]);
  const go = useCallback((d: number) => setIndex(i => Math.min(n - 1, Math.max(0, i + d))), [n]);

  const onKeyDown = (e: { key: string; preventDefault(): void }) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
  };

  const onDown = (e: React.PointerEvent) => { drag.current = { active: true, x: e.clientX, moved: false }; };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 60) { go(dx < 0 ? 1 : -1); drag.current = { active: false, x: 0, moved: true }; }
  };
  const end = () => { drag.current.active = false; };
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5 && Math.abs(e.deltaX) > 20) go(e.deltaX > 0 ? 1 : -1);
  };

  return <div className="grad-carousel" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={end} onPointerCancel={end} onWheel={onWheel} onKeyDown={onKeyDown} onDragStart={e => e.preventDefault()} role="region" aria-label="Project carousel" tabIndex={0}>
    <div className="grad-glow" aria-hidden="true" style={{ background: "radial-gradient(60% 60% at 50% 58%, rgba(212,175,110,.5) 0%, rgba(140,110,60,.28) 48%, transparent 74%)" }} />
    <div className="grad-stage">
      {items.map((it, i) => {
        let off = i - index;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        const a = Math.abs(off);
        return <Link key={it.slug} href={`/projects/${it.slug}`} className="grad-card" onClick={e => { if (drag.current.moved) e.preventDefault(); }} style={{ transform: `translateX(${off * 72}%) rotateY(${off * -28}deg) translateZ(${-a * 200}px) scale(${1 - a * 0.15})`, zIndex: 10 - a, opacity: a > 2 ? 0 : 1, pointerEvents: a > 0 ? "auto" : "auto" }} aria-hidden={a > 2} tabIndex={a > 0 ? -1 : undefined}>
          <img src={it.src} alt={it.alt} draggable={false} />
          <span className="grad-card-meta"><span>{it.title}</span><ArrowUpRight size={16} /></span>
        </Link>;
      })}
    </div>
    <div className="grad-dots">{items.map((it, i) => <button key={it.slug} className={i === index ? "on" : ""} aria-label={`Go to ${it.title}`} onClick={() => setIndex(i)} />)}</div>
  </div>;
}
