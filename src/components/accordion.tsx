"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return <div className="accordion">
    {items.map((item, i) => {
      const id = `acc-${i}`;
      return <div key={item.q} className={`accordion-item ${open === i ? "is-open" : ""}`}>
        <h3><button type="button" aria-expanded={open === i} aria-controls={id} onClick={() => setOpen(open === i ? -1 : i)}><span>{item.q}</span><Plus size={20} strokeWidth={1.4} aria-hidden="true" /></button></h3>
        <div id={id} className="accordion-panel" role="region"><div><p>{item.a}</p></div></div>
      </div>;
    })}
  </div>;
}
