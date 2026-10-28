"use client";

import FlexCarousel from "@/components/flex-carousel";
import type { FlexCarouselItem } from "@/components/flex-carousel";

export function SectorCarousel({ items }: { items: FlexCarouselItem[] }) {
  return <div className="gallery-canvas"><FlexCarousel items={items} preset="arch" intro="rise" fit="landscape" cardHeight={0.6} gap={14} radius={0} squeeze={0.18} focusOnClick captions captureWheel={false} autoplay interval={5} /></div>;
}
