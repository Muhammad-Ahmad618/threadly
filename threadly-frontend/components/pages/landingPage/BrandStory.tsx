"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { storyCopy } from "@/data/after-extras";
import Reveal from "./Reveal";

// Animated count-up number (jumps straight to the value for reduced motion).
function CountUp({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    if (reducedMotion) {
      frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }
    const start = performance.now();
    const duration = 1400;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reducedMotion]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Two-column brand story with an overlapping second photo and animated stats.
export default function BrandStory() {
  return (
    <section aria-labelledby="story-heading" className="bg-[#faf7f2] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        <Reveal className="relative mb-10 md:mb-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={storyCopy.mainImage}
              alt={storyCopy.mainImageAlt}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 aspect-square w-40 overflow-hidden rounded-2xl border-4 border-[#faf7f2] shadow-xl md:-right-10 md:w-56">
            <Image
              src={storyCopy.detailImage}
              alt={storyCopy.detailImageAlt}
              fill
              sizes="(max-width: 767px) 160px, 224px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4d5b3f]">
            {storyCopy.eyebrow}
          </p>
          <h2
            id="story-heading"
            className="mt-3 text-4xl font-semibold leading-tight text-stone-900 [font-family:var(--font-after-display)]"
          >
            {storyCopy.heading}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600 md:text-lg">
            {storyCopy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-stone-200 pt-8">
            {storyCopy.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-semibold text-[#2f3a26] md:text-4xl [font-family:var(--font-after-display)]">
                  <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm text-stone-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
