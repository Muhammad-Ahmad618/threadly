"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/after-extras";

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Bumped on resume / manual navigation so the timer and the progress pill
  // always restart together.
  const [cycle, setCycle] = useState(0);
  const reducedMotion = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const pausedRef = useRef(false);

  const slideCount = heroSlides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % slideCount) + slideCount) % slideCount);
      setCycle((current) => current + 1);
    },
    [slideCount],
  );

  const pause = useCallback(() => {
    if (!pausedRef.current) {
      pausedRef.current = true;
      setPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (pausedRef.current) {
      pausedRef.current = false;
      setPaused(false);
      setCycle((current) => current + 1);
    }
  }, []);

  const autoplayOff = paused || Boolean(reducedMotion);

  useEffect(() => {
    if (autoplayOff) return;
    const timer = setTimeout(
      () => setActive((current) => (current + 1) % slideCount),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [active, cycle, autoplayOff, slideCount]);

  function handleTouchEnd(event: React.TouchEvent) {
    if (!touchStart.current) return;
    const dx = event.changedTouches[0].clientX - touchStart.current.x;
    const dy = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      goTo(active + (dx < 0 ? 1 : -1));
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") goTo(active + 1);
    if (event.key === "ArrowLeft") goTo(active - 1);
  }

  const textStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const textItem = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const currentSlide = heroSlides[active];

  return (
    <section
      aria-label="Featured collections"
      className="relative -mt-16 h-[90vh] min-h-[560px] overflow-hidden md:-mt-20"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          resume();
      }}
      onTouchStart={(event) => {
        touchStart.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => {
        const isActive = index === active;
        return (
          <div
            key={slide.headline}
            aria-hidden={!isActive}
            inert={!isActive}
            className="absolute inset-0"
          >
            <motion.div
              className="h-full w-full"
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale: isActive && !reducedMotion ? 1.08 : 1 }}
                transition={{ duration: 7.5, ease: "linear" }}
              >
                <Image
                  src={slide.image}
                  alt={isActive ? slide.imageAlt : ""}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        );
      })}

      {/* Readability scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1c2417]/70 via-[#1c2417]/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#1c2417]/55 to-transparent"
      />

      {/* Glass content card */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 md:pt-20 lg:px-8">
          <motion.div
            key={active}
            variants={textStagger}
            initial="hidden"
            animate="show"
            className="pointer-events-auto max-w-2xl rounded-3xl border border-white/25 bg-[#2f3a26]/50 p-6 shadow-xl backdrop-blur-md sm:p-8 md:max-w-xl md:p-10"
          >
            <motion.p
              variants={textItem}
              className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ddc287]"
            >
              {currentSlide.eyebrow}
            </motion.p>
            {active === 0 ? (
              <h1 className="mt-4 text-4xl font-semibold leading-[1.06] text-white sm:text-5xl md:text-6xl lg:text-7xl [font-family:var(--font-after-display)]">
                {currentSlide.headline}
              </h1>
            ) : (
              <h2 className="mt-4 text-4xl font-semibold leading-[1.06] text-white sm:text-5xl md:text-6xl lg:text-7xl [font-family:var(--font-after-display)]">
                {currentSlide.headline}
              </h2>
            )}
            <motion.p
              variants={textItem}
              className="mt-4 max-w-lg text-base leading-relaxed text-white/90 sm:mt-5 md:text-lg"
            >
              {currentSlide.support}
            </motion.p>
            <motion.div
              variants={textItem}
              className="mt-6 flex flex-wrap gap-3 sm:mt-8"
            >
              <Link
                href="#featured"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#2f3a26] transition-all duration-200 hover:bg-[#f1ece1] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4d5b3f]"
              >
                Shop New Arrivals
              </Link>
              <Link
                href="#categories"
                className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Collections
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Glass arrow controls */}
      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute bottom-16 left-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute bottom-16 right-3 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Pill progress indicators */}
      <div className="absolute inset-x-0 bottom-20 z-10 flex items-center justify-center gap-2.5 md:bottom-16">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.headline}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active}
            className={`relative h-2.5 overflow-hidden rounded-full bg-white/40 transition-all duration-300 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === active ? "w-16" : "w-9"
            }`}
          >
            {index === active && !reducedMotion && !paused && (
              <motion.span
                key={`${active}-${cycle}`}
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/80"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={reducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </div>
    </section>
  );
}
