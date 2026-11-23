"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Business } from "@/data/content";
import { MODEL_ZONES } from "@/components/three/model-scene";

export function SiteModel({ businesses }: { businesses: Business[] }) {
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const stageRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const touchedRef = useRef(false);
  const current = businesses[active];

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let cancelled = false;
    let dispose = () => {};
    Promise.all([import("three"), import("@/components/three/model-scene")]).then(([THREE, { createModelScene }]) => {
      if (cancelled) return;
      dispose = createModelScene(THREE, stage, {
        getActive: () => activeRef.current,
        select: setActive,
        advance: () => setActive((value) => (value + 1) % MODEL_ZONES.length),
        touched: () => touchedRef.current,
        touch: () => { touchedRef.current = true; },
        tag: () => tagRef.current,
      });
      setStatus("ready");
    }).catch(() => { if (!cancelled) setStatus("failed"); });
    return () => { cancelled = true; dispose(); };
  }, []);

  const choose = (index: number) => { touchedRef.current = true; setActive(index); };

  return <div className="model-layout">
    <div className="model-stage" ref={stageRef}>
      {status === "failed" && <Image src={current.image} alt={current.imageAlt} fill sizes="(max-width: 900px) 100vw, 60vw" className="cover-image" />}
      {status !== "failed" && <div className={`model-tag ${status === "ready" ? "is-ready" : ""}`} ref={tagRef} aria-hidden="true"><span>{current.index}</span>{current.name}</div>}
      {status !== "failed" && <span className="model-hint" aria-hidden="true">DRAG TO TURN THE MODEL · SELECT A BUSINESS</span>}
      <span className="model-credit">CONCEPT MODEL, NOT TO SCALE</span>
    </div>
    <ol className="model-list" aria-label="The seven businesses of JD CORP">
      {businesses.map((business, index) => <li key={business.slug} className={index === active ? "is-active" : ""}>
        <button type="button" aria-expanded={index === active} onClick={() => choose(index)}><span>{business.index}</span>{business.name}</button>
        <div className="model-detail" hidden={index !== active}>
          <h3>{business.headline}</h3>
          <p>{business.step}</p>
          <Link href={`/businesses/${business.slug}`} className="model-link">OPEN {business.name.toUpperCase()} <ArrowUpRight size={15} /></Link>
        </div>
      </li>)}
    </ol>
  </div>;
}
