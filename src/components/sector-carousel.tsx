"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
};

export function SectorCarousel({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragRef = useRef({ isDown: false, startX: 0, moved: false });
  const count = items.length;

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { isDown: true, startX: e.clientX, moved: false };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDown) return;
    const delta = e.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
      dragRef.current.isDown = false;
      dragRef.current.moved = true;
    }
  };

  const handlePointerUp = () => {
    dragRef.current.isDown = false;
  };

  return (
    <div
      className="luxury-gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={onKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      tabIndex={0}
      role="region"
      aria-label="JD CORP Sector Gallery"
    >
      <div className="luxury-gallery-stage">
        {items.map((item, idx) => {
          let offset = idx - active;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;
          const abs = Math.abs(offset);
          const isVisible = abs <= 2;

          return (
            <div
              key={item.src}
              className={`luxury-gallery-card ${offset === 0 ? "is-active" : ""}`}
              style={{
                transform: `translateX(${offset * 64}%) scale(${1 - abs * 0.16}) rotateY(${offset * -18}deg)`,
                zIndex: 10 - abs,
                opacity: isVisible ? Math.max(0.2, 1 - abs * 0.45) : 0,
                pointerEvents: offset === 0 ? "auto" : "none",
                display: isVisible ? "block" : "none",
              }}
              onClick={() => {
                if (offset !== 0) setActive(idx);
              }}
            >
              <div className="luxury-gallery-image-wrap">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 800px) 90vw, 680px"
                  className="luxury-gallery-img"
                  priority={idx === 0}
                />
                <div className="luxury-gallery-overlay" />
                <div className="luxury-gallery-card-info">
                  {item.subtitle && <span className="luxury-gallery-subtitle">{item.subtitle}</span>}
                  <h3 className="luxury-gallery-title">{item.title}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="luxury-gallery-controls">
        <div className="luxury-gallery-counter">
          <span className="current-num">{String(active + 1).padStart(2, "0")}</span>
          <span className="counter-slash">/</span>
          <span className="total-num">{String(count).padStart(2, "0")}</span>
        </div>
        <div className="luxury-gallery-track">
          <div
            className="luxury-gallery-progress"
            style={{ width: `${((active + 1) / count) * 100}%` }}
          />
        </div>
        <div className="luxury-gallery-nav">
          <button
            type="button"
            className="gallery-nav-btn"
            onClick={prev}
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="gallery-nav-btn"
            onClick={next}
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
