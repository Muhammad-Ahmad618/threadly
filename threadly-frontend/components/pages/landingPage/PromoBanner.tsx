"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { promoCopy } from "@/data/after-extras";
import Reveal from "./Reveal";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

// Full-width sale banner with a parallax lifestyle photo, glass card and a
// live countdown to the end of the current week.
export default function PromoBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const [timeLeft, setTimeLeft] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const now = new Date();
    const target = new Date(now);
    const daysUntilSunday = (7 - now.getDay()) % 7;
    target.setDate(now.getDate() + daysUntilSunday);
    target.setHours(23, 59, 59, 0);
    if (target.getTime() <= now.getTime()) {
      target.setDate(target.getDate() + 7);
    }

    function tick() {
      const diff = Math.max(0, target.getTime() - Date.now());
      const days = Math.floor(diff / 86_400_000);
      const hours = Math.floor((diff % 86_400_000) / 3_600_000);
      const minutes = Math.floor((diff % 3_600_000) / 60_000);
      const seconds = Math.floor((diff % 60_000) / 1000);
      setTimeLeft({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    }

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="promo-heading"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -top-[8%] left-0 h-[116%] w-full -z-10"
        style={reducedMotion ? undefined : { y: parallaxY }}
      >
        <Image
          src={promoCopy.image}
          alt={promoCopy.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1c2417]/85 via-[#1c2417]/60 to-[#1c2417]/35"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-white/25 bg-[#2f3a26]/50 p-8 text-center shadow-2xl backdrop-blur-md md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ddc287]">
              {promoCopy.eyebrow}
            </p>
            <h2
              id="promo-heading"
              className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl [font-family:var(--font-after-display)]"
            >
              {promoCopy.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
              {promoCopy.text}
            </p>
            <div aria-hidden="true" className="mt-8 flex justify-center gap-3">
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="w-[4.5rem] rounded-2xl border border-white/20 bg-black/25 py-3 md:w-20"
                >
                  <span className="block text-3xl font-semibold tabular-nums text-white">
                    {unit.value}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-wider text-white/70">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="sr-only">This sale ends Sunday at midnight.</p>
            <Link
              href="#featured"
              className="mt-9 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#2f3a26] transition-all duration-200 hover:bg-[#f1ece1] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2f3a26]"
            >
              {promoCopy.ctaLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
