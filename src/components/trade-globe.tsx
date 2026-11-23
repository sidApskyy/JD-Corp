"use client";

import { useEffect, useRef, useState } from "react";

export function TradeGlobe() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let cancelled = false;
    let dispose = () => {};
    Promise.all([import("three"), import("@/components/three/globe-scene"), import("@/data/land-dots")]).then(([THREE, { createGlobeScene }, { landDots }]) => {
      if (!cancelled) dispose = createGlobeScene(THREE, stage, landDots);
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; dispose(); };
  }, []);

  return <div className={`globe-stage ${failed ? "is-failed" : ""}`} ref={stageRef}>
    <span className="globe-ring" aria-hidden="true" />
    {!failed && <span className="globe-hint" aria-hidden="true">DRAG TO TURN</span>}
    <span className="globe-credit">ILLUSTRATIVE TRADE LANES</span>
  </div>;
}
