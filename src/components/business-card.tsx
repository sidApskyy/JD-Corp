"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TiltedCard, { TiltedCardLayer } from "@/components/tilted-card";
import type { Business } from "@/data/content";

export function BusinessCard({ business }: { business: Business; index?: number }) {
  return <div className="business-card">
    <div className="tilt-square">
      <TiltedCard
        imageSrc={business.image}
        altText={business.imageAlt}
        containerWidth="100%"
        containerHeight="100%"
        imageWidth="100%"
        imageHeight="100%"
        radius={16}
        rotateAmplitude={12}
        scaleOnHover={1.05}
        glare={0.5}
        shadow={0.5}
        gyroscope={false}
        intro={false}
        backContent={<div className="tilt-back"><span className="tilt-back-index">JD / {business.index}</span><h3>{business.headline}</h3><p>{business.description}</p><span className="tilt-back-services">{business.services.join("  /  ")}</span></div>}
      >
        <TiltedCardLayer depth={30}>
          <span className="tilt-index">JD / {business.index}</span>
          <span className="tilt-title">{business.name}</span>
        </TiltedCardLayer>
      </TiltedCard>
    </div>
    <div className="card-info">
      <div className="card-info-top"><span>{business.group.toUpperCase()}</span><span>N° {business.index}</span></div>
      <p>{business.description}</p>
      <Link href={`/businesses/${business.slug}`} className="card-info-link"><span>EXPLORE SECTOR</span><span className="card-info-arrow"><ArrowUpRight size={15} /></span></Link>
    </div>
  </div>;
}
