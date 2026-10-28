"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import TiltedCard, { TiltedCardLayer } from "@/components/tilted-card";
import type { Business } from "@/data/content";

export function BusinessCard({ business, index = 0 }: { business: Business; index?: number }) {
  const reduce = useReducedMotion();
  const card = <div className="business-card">
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
        backContent={<div className="tilt-back"><span className="tilt-back-index">JD / {business.index}</span><h3>{business.headline}</h3><p>{business.description}</p><Link href={`/businesses/${business.slug}`} className="tilt-back-link">EXPLORE SECTOR <ArrowUpRight size={16} /></Link></div>}
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
  if (reduce) return card;
  return <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: .65, delay: index * .06, ease: [.22, 1, .36, 1] }}>{card}</motion.div>;
}
