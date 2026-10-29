"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { afterCategories } from "@/data/after-extras";
import { siteContent } from "@/data/content";
import Reveal from "./Reveal";

// Bento-style category grid: the first card spans 2×2 to create hierarchy.
export default function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="bg-[#faf7f2] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div>
            <h2
              id="categories-heading"
              className="text-4xl font-semibold text-stone-900 [font-family:var(--font-after-display)]"
            >
              {siteContent.categoriesHeading}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
              Six curated edits, one standard of quality. Start where your wardrobe needs it most.
            </p>
          </div>
          <Link
            href="#featured"
            className="group inline-flex items-center gap-2 rounded-full border border-[#4d5b3f]/30 px-5 py-2.5 text-sm font-semibold text-[#4d5b3f] transition-colors duration-200 hover:bg-[#4d5b3f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {afterCategories.map((category, index) => {
            const isBig = index === 0;
            const isLast = index === afterCategories.length - 1;
            return (
              <Reveal
                key={category.name}
                delay={Math.min(index * 0.07, 0.35)}
                className={
                  isBig
                    ? "sm:col-span-2 md:col-span-2 md:row-span-2"
                    : isLast
                      ? "sm:col-span-2 md:col-span-1"
                      : ""
                }
              >
                <Link
                  href={category.href}
                  className={`group relative block h-full overflow-hidden rounded-2xl ${
                    isBig ? "aspect-[4/5] sm:aspect-[16/9] md:aspect-auto" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes={
                      isBig
                        ? "(max-width: 639px) 100vw, (max-width: 767px) 100vw, 66vw"
                        : "(max-width: 639px) 100vw, (max-width: 767px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#1c2417]/80 via-[#1c2417]/25 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 block p-6 transition-transform duration-300 ease-out group-hover:-translate-y-1">
                    <span className="block text-xl font-semibold text-white md:text-2xl">
                      {category.name}
                    </span>
                    <span className="mt-1 block text-sm text-white/85">
                      {category.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ddc287]">
                      Shop now
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
