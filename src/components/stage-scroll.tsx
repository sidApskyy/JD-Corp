"use client";

import { useEffect, useRef, useState } from "react";
import { Scene3D } from "@/components/scene-3d";

type Stage = { index: string; title: string; theme: string; description: string; detail: string };

// The four stages of an engagement. The model on the left assembles as each stage is read.
export function StageScroll({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index)); });
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div className="stage-scroll">
    <div className="stage-scroll-visual">
      <div className="niche">
        <Scene3D kind="build" value={active} />
        <div className="niche-caption"><span className="niche-index">{stages[active].index}</span><span className="niche-text"><strong>{stages[active].title}</strong>{stages[active].theme}</span></div>
        <div className="stage-meter" aria-hidden="true">{stages.map((stage, i) => <span key={stage.index} className={i <= active ? "is-on" : ""} />)}</div>
        <span className="niche-hint" aria-hidden="true">DRAG TO TURN</span>
      </div>
    </div>
    <ol className="stage-list">
      {stages.map((stage, i) => <li key={stage.index} data-index={i} ref={(el) => { refs.current[i] = el; }} className={i === active ? "is-active" : ""}>
        <button type="button" onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })} aria-current={i === active ? "step" : undefined}>
          <span className="stage-no">{stage.index} / {stage.theme}</span>
          <h3>{stage.title}</h3>
        </button>
        <p>{stage.description}</p>
        <p className="stage-detail">{stage.detail}</p>
      </li>)}
    </ol>
  </div>;
}
