"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews, reviewsCopy } from "@/data/after-extras";
import Reveal from "./Reveal";

const GAP = 24;

// Auto-rotating review carousel: glass cards over a soft olive background,
// pausing on hover and keyboard focus.
export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const measure = useCallback(() => {
    const track = trackRef.current;
    const region = regionRef.current;
    const card = track?.firstElementChild;
    if (!track || !region || !card) return;
    const cardWidth = (card as HTMLElement).offsetWidth;
    if (cardWidth === 0) return;
    setStep(cardWidth + GAP);
    setPerView(Math.max(1, Math.round((region.offsetWidth + GAP) / (cardWidth + GAP))));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const maxIndex = Math.max(0, reviews.length - perView);
  const clampedIndex = Math.min(index, maxIndex);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => {
      setIndex((current) => (Math.min(current, maxIndex) >= maxIndex ? 0 : Math.min(current, maxIndex) + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, maxIndex]);

  const goTo = (next: number) => setIndex(((next % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1));

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section aria-labelledby="reviews-heading" className="bg-[#4d5b3f]/10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h2
              id="reviews-heading"
              className="text-4xl font-semibold text-stone-900 [font-family:var(--font-after-display)]"
            >
              {reviewsCopy.heading}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
              {reviewsCopy.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(clampedIndex - 1)}
              aria-label="Previous reviews"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#4d5b3f]/30 text-[#4d5b3f] transition-colors duration-200 hover:bg-[#4d5b3f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(clampedIndex + 1)}
              aria-label="Next reviews"
              className="grid h-11 w-11 place-items-center rounded-full border border-[#4d5b3f]/30 text-[#4d5b3f] transition-colors duration-200 hover:bg-[#4d5b3f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <div
          ref={regionRef}
          className="mt-10 overflow-hidden"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocusCapture={pause}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resume();
          }}
        >
          <motion.ul
            ref={trackRef}
            animate={{ x: -clampedIndex * step }}
            transition={{ type: "spring", stiffness: 300, damping: 34 }}
            className="flex"
            style={{ gap: GAP }}
          >
            {reviews.map((review) => (
              <li
                key={review.name}
                className="w-[86%] shrink-0 rounded-2xl border border-white/60 bg-white/65 p-7 shadow-lg backdrop-blur-md sm:w-[48%] lg:w-[31.5%]"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#4d5b3f] text-sm font-semibold text-white"
                  >
                    {review.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{review.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-[#4d5b3f]">
                      <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                      Verified Buyer
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-[#c8a96a] text-[#c8a96a]" />
                  ))}
                  <span className="sr-only">Rated 5 out of 5</span>
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-stone-700">
                  “{review.quote}”
                </blockquote>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => goTo(dotIndex)}
              aria-label={`Show review group ${dotIndex + 1}`}
              aria-current={dotIndex === clampedIndex}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] ${
                dotIndex === clampedIndex ? "w-8 bg-[#4d5b3f]" : "w-2 bg-[#4d5b3f]/25 hover:bg-[#4d5b3f]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
