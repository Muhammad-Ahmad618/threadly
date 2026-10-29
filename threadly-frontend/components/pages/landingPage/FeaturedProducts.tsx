"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "@/data/content";
import {
  featuredCopy,
  featuredTabs,
  productImages,
} from "@/data/after-extras";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

// Featured products with glass pill tabs and an animated grid transition.
export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const productByName = new Map(siteContent.products.map((product) => [product.name, product]));
  const products: { name: string; badge: (typeof featuredTabs)[number]["items"][number]["badge"]; product: (typeof siteContent.products)[number] }[] = [];
  for (const entry of featuredTabs[activeTab].items) {
    const product = productByName.get(entry.name);
    if (product) {
      products.push({ ...entry, product });
    }
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % featuredTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + featuredTabs.length) % featuredTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = featuredTabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section id="featured" aria-labelledby="featured-heading" className="bg-[#faf7f2] pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div>
            <h2
              id="featured-heading"
              className="text-4xl font-semibold text-stone-900 [font-family:var(--font-after-display)]"
            >
              {featuredCopy.heading}
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
              {featuredCopy.subtitle}
            </p>
          </div>
          <div
            role="tablist"
            aria-label="Featured product lists"
            className="inline-flex rounded-full border border-white/70 bg-white/60 p-1.5 shadow-sm backdrop-blur-md"
          >
            {featuredTabs.map((tab, index) => (
              <button
                key={tab.label}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`featured-tab-${index}`}
                aria-selected={index === activeTab}
                aria-controls="featured-panel"
                tabIndex={index === activeTab ? 0 : -1}
                onClick={() => setActiveTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] ${
                  index === activeTab ? "text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {index === activeTab && (
                  <motion.span
                    layoutId="featured-tab-pill"
                    className="absolute inset-0 rounded-full bg-[#4d5b3f]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div
          id="featured-panel"
          role="tabpanel"
          aria-labelledby={`featured-tab-${activeTab}`}
          className="mt-10"
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-6"
          >
            {products.map((item, index) => (
              <ProductCard
                key={`${activeTab}-${item.name}`}
                index={index}
                name={item.name}
                price={item.product.price}
                image={productImages[item.name] ?? item.product.image}
                badge={item.badge}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
