"use client";

import { useEffect, useRef, useState } from "react";

const scenes = {
  orrery: () => import("@/components/three/scenes/orrery"),
  stack: () => import("@/components/three/scenes/stack"),
  build: () => import("@/components/three/scenes/build"),
  network: () => import("@/components/three/scenes/network"),
  grove: () => import("@/components/three/scenes/grove"),
  compass: () => import("@/components/three/scenes/compass"),
  plinth: () => import("@/components/three/scenes/plinth"),
  door: () => import("@/components/three/scenes/door"),
  office: () => import("@/components/three/scenes/office"),
};

export type SceneKind = keyof typeof scenes;

// Loads three.js and one scene on demand. If WebGL is unavailable, the warm niche behind it remains.
export function Scene3D({ kind, value = 0, onSelect, className = "" }: { kind: SceneKind; value?: number; onSelect?: (index: number) => void; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  const selectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);

  useEffect(() => { valueRef.current = value; selectRef.current = onSelect; });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let dispose = () => {};
    Promise.all([import("three"), import("@/components/three/stage"), scenes[kind]()]).then(([THREE, { createStage }, scene]) => {
      if (cancelled) return;
      try {
        const stage = createStage(THREE, host, scene.options);
        scene.build(stage, { value: () => valueRef.current, select: (index) => selectRef.current?.(index) });
        stage.start();
        dispose = stage.dispose;
        setReady(true);
      } catch {
        /* WebGL unavailable: keep the static niche. */
      }
    }).catch(() => {});
    return () => { cancelled = true; dispose(); };
  }, [kind]);

  return <div ref={hostRef} className={`scene-host ${ready ? "is-ready" : ""} ${className}`.trim()} aria-hidden="true" />;
}
