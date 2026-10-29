"use client";

import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { trustItems } from "@/data/after-extras";
import Reveal from "./Reveal";

const icons = [Truck, RotateCcw, ShieldCheck, Headphones];

// Dark olive band under the hero with the four core trust signals.
export default function TrustStrip() {
  return (
    <section aria-label="Store benefits" className="bg-[#2f3a26] text-stone-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-4 py-12 sm:grid-cols-2 sm:px-6 md:grid-cols-4 md:gap-6 lg:px-8">
        {trustItems.map((item, index) => {
          const Icon = icons[index];
          return (
            <Reveal key={item.title} delay={index * 0.08} className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10">
                <Icon className="h-5 w-5 text-[#ddc287]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-sm text-stone-300">{item.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
