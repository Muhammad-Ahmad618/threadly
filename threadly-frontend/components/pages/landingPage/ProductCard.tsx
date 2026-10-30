"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "./CartContext";
import { productExtras, productImageAlts, productPrices, type BadgeKind } from "@/data/after-extras";

const badgeStyles: Record<BadgeKind, string> = {
  new: "bg-[#4d5b3f] text-white",
  best: "bg-[#c8a96a] text-[#2f3a26]",
  sale: "bg-[#2f3a26] text-white",
};

function slugify(text: string): string {
  return text.replace(/\s+/g, "-").toLowerCase();
}

export default function ProductCard({
  name,
  price,
  image,
  badge,
  index = 0,
}: {
  name: string;
  price: string;
  image: string;
  badge: BadgeKind;
  index?: number;
}) {
  const extras = productExtras[name] ?? { rating: 5, reviews: 0 };
  const { addItem } = useCart();
  const [wished, setWished] = useState(false);

  const numericPrice = productPrices[name] ?? Number(price.replace("$", ""));

  const discount =
    badge === "sale"
      ? (extras.discount ??
        (extras.oldPrice
          ? Math.round(
              (1 - numericPrice / Number(extras.oldPrice.replace("$", ""))) * 100,
            )
          : 0))
      : 0;

  const badgeLabel =
    badge === "new" ? "New" : badge === "best" ? "Best Seller" : `-${discount}%`;

  function handleAdd() {
    addItem({ id: name, name, price: numericPrice, image });
  }

  // Auto-generate product slug from name for navigation
  const productSlug = slugify(name);

  return (
    <Link
      href={`/products/${productSlug}`}
      className="block"
    >
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(index * 0.06, 0.3) }}
        className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-3 transition-shadow duration-300 hover:shadow-lg md:p-4"
      >
        <div className="relative overflow-hidden rounded-xl">
          <div className="relative aspect-[4/5]">
            <Image
              src={image}
              alt={productImageAlts[name] ?? name}
              fill
              sizes="(max-width: 639px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[badge]}`}
          >
            {badgeLabel}
          </span>
          <button
            type="button"
            onClick={() => setWished((current) => !current)}
            aria-pressed={wished}
            aria-label={wished ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-stone-500 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${wished ? "fill-[#4d5b3f] text-[#4d5b3f]" : ""}`}
              aria-hidden="true"
            />
          </button>
          {/* Glass quick-add: slides up on hover (desktop) */}
          <button
            type="button"
            onClick={handleAdd}
            className="absolute inset-x-3 bottom-3 hidden translate-y-[calc(100%+1.25rem)] items-center justify-center gap-2 rounded-full border border-white/20 bg-[#2f3a26]/70 py-3.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-transform duration-300 ease-out focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group-hover:translate-y-0 md:flex"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Add to Cart
          </button>
        </div>

        <div className="mt-4 flex flex-1 flex-col px-1 pb-1">
          <h3 className="text-base font-medium text-stone-800">{name}</h3>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="flex" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star < Math.round(extras.rating)
                      ? "fill-[#c8a96a] text-[#c8a96a]"
                      : "fill-stone-200 text-stone-200"
                  }`}
                />
              ))}
            </span>
            <span className="sr-only">
              Rated {extras.rating} out of 5 from {extras.reviews} reviews
            </span>
            <span className="text-xs text-stone-500">({extras.reviews})</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold text-stone-900">
              {price}
              {badge === "sale" && extras.oldPrice && (
                <span className="ml-2 text-sm font-normal text-stone-400 line-through">
                  {extras.oldPrice}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full bg-[#4d5b3f] px-5 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#3f4b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2 md:hidden"
            >
              Add
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}