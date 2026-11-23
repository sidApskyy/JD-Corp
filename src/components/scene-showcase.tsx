"use client";

import { useEffect, useRef, useState } from "react";
import { Scene3D, type SceneKind } from "@/components/scene-3d";

type Item = { index: string; name: string; line: string };

// A 3D piece with a caption that steps through its items and responds to clicks on the model.
export function SceneShowcase({ kind, items, hint, credit, interval = 3800 }: { kind: SceneKind; items: Item[]; hint?: string; credit?: string; interval?: number }) {
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const current = items[active];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => { if (!touched.current) setActive((value) => (value + 1) % items.length); }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  const choose = (index: number) => { touched.current = true; setActive(index); };

  return <div className="niche">
    <Scene3D kind={kind} value={active} onSelect={choose} />
    <div className="niche-caption" aria-live="polite">
      <span className="niche-index">{current.index}</span>
      <span key={current.name} className="niche-text"><strong>{current.name}</strong>{current.line}</span>
    </div>
    <div className="niche-dots" role="group" aria-label="Choose an item">
      {items.map((item, index) => <button key={item.name} type="button" aria-label={item.name} aria-pressed={index === active} className={index === active ? "is-active" : ""} onClick={() => choose(index)} />)}
    </div>
    {hint && <span className="niche-hint" aria-hidden="true">{hint}</span>}
    {credit && <span className="niche-credit">{credit}</span>}
  </div>;
}

export function SceneNiche({ kind, hint, credit, caption }: { kind: SceneKind; hint?: string; credit?: string; caption?: string }) {
  return <div className="niche">
    <Scene3D kind={kind} />
    {caption && <div className="niche-caption"><span className="niche-text"><strong>{caption}</strong></span></div>}
    {hint && <span className="niche-hint" aria-hidden="true">{hint}</span>}
    {credit && <span className="niche-credit">{credit}</span>}
  </div>;
}
