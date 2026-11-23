"use client";

import { useEffect, useRef, useState } from "react";
import { MODEL_ZONES } from "@/components/three/model-scene";

// One business lifted off the group model and turned slowly on its own plinth.
export function ModelVignette({ slug, label }: { slug: string; label: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const index = Math.max(0, MODEL_ZONES.findIndex((zone) => zone.slug === slug));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let dispose = () => {};
    Promise.all([import("three"), import("@/components/three/model-scene")]).then(([THREE, { createModelScene }]) => {
      if (cancelled) return;
      try {
        dispose = createModelScene(THREE, host, { focus: slug, getActive: () => index, select: () => {}, advance: () => {}, touched: () => true, touch: () => {}, tag: () => null });
        setReady(true);
      } catch { /* keep the static niche */ }
    }).catch(() => {});
    return () => { cancelled = true; dispose(); };
  }, [slug, index]);

  return <div className="niche">
    <div ref={hostRef} className={`scene-host ${ready ? "is-ready" : ""}`} aria-hidden="true" />
    <div className="niche-caption"><span className="niche-index">{String(index + 1).padStart(2, "0")}</span><span className="niche-text"><strong>{label}</strong>From the JD CORP model</span></div>
    <span className="niche-hint" aria-hidden="true">DRAG TO TURN</span>
  </div>;
}
