"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { announcementMessages } from "@/data/after-extras";

// Slim promo bar above the header. Rotates between a few messages (unless the
// user prefers reduced motion) and can be dismissed.
export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || dismissed) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % announcementMessages.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [reducedMotion, dismissed]);

  if (dismissed) return null;

  return (
    <div className="relative z-40 bg-[#2f3a26] text-stone-100">
      <div className="mx-auto flex max-w-7xl items-center justify-center px-12 py-2.5">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-center text-sm leading-5"
          >
            {announcementMessages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-1.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-stone-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
