"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Headphones,
  Lock,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";
import { formatMoney, useCart } from "@/components/pages/landingPage/CartContext";
import ProductCard from "@/components/pages/landingPage/ProductCard";
import Reveal from "@/components/pages/landingPage/Reveal";
import { siteContent } from "@/data/content";
import {
  featuredTabs,
  freeShippingThreshold,
  productImages,
  trustItems,
} from "@/data/after-extras";

// Demo promo codes — there is no backend, so validation happens here.
const promoCodes: Record<string, { label: string; percent: number }> = {
  THREADLY10: { label: "THREADLY10", percent: 10 },
  WELCOME15: { label: "WELCOME15", percent: 15 },
};

const trustIcons = [Truck, RotateCcw, ShieldCheck, Headphones];

const roundMoney = (amount: number) => Math.round(amount * 100) / 100;

// Full-page cart: line items on the left, a sticky order summary on the
// right, a promo code field, trust signals and a "complete the look" row.
// Reads and mutates the same CartContext the drawer uses.
export default function CartPage() {
  const { items, removeItem, setQuantity, count, subtotal } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ label: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const discount = appliedPromo ? roundMoney((subtotal * appliedPromo.percent) / 100) : 0;
  const total = roundMoney(Math.max(0, subtotal - discount));
  const remaining = Math.max(0, roundMoney(freeShippingThreshold - subtotal));
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  function handlePromoSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const key = promoInput.trim().toUpperCase();
    const match = promoCodes[key];
    if (!match) {
      setAppliedPromo(null);
      setPromoError(`“${promoInput.trim()}” isn’t a valid code. Try THREADLY10.`);
      return;
    }
    setPromoError(null);
    setAppliedPromo(match);
    setPromoInput("");
  }

  function clearPromo() {
    setAppliedPromo(null);
    setPromoError(null);
    setPromoInput("");
  }

  const productByName = new Map(siteContent.products.map((product) => [product.name, product]));
  const suggestions = featuredTabs[1].items.flatMap((entry) => {
    const product = productByName.get(entry.name);
    return product ? [{ entry, product }] : [];
  });

  return (
    <>
      {/* Olive title band — the transparent header sits over it, exactly like
          the hero on the landing page. */}
      <section className="-mt-16 bg-[#2f3a26] pt-16 text-white md:-mt-20 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 md:py-14 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-stone-400">
              <li>
                <Link
                  href="/"
                  className="rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="font-medium text-white">
                Cart
              </li>
            </ol>
          </nav>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#ddc287]">
                Your bag
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl [font-family:var(--font-after-display)]">
                Shopping Cart
              </h1>
            </div>
            <p className="text-sm text-stone-400">
              {count} {count === 1 ? "item" : "items"} · Free shipping over{" "}
              <span className="text-stone-200">{formatMoney(freeShippingThreshold)}</span>
            </p>
          </div>
        </div>
      </section>

      {items.length === 0 ? (
        <section className="bg-[#faf7f2] pb-16 pt-12 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="mx-auto max-w-xl rounded-3xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#4d5b3f]/10">
                <ShoppingBag className="h-9 w-9 text-[#4d5b3f]" aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-3xl font-semibold text-stone-900 [font-family:var(--font-after-display)]">
                Your cart is empty
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-stone-500">
                Nothing here yet — but the good stuff is one click away. Free shipping
                unlocks at {formatMoney(freeShippingThreshold)}.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/#featured"
                  className="w-full rounded-full bg-[#4d5b3f] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#3f4b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2 sm:w-auto"
                >
                  Start shopping
                </Link>
                <Link
                  href="/#categories"
                  className="w-full rounded-full border border-stone-300 px-7 py-3.5 text-sm font-semibold text-stone-700 transition-colors hover:border-[#4d5b3f]/50 hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] sm:w-auto"
                >
                  Browse categories
                </Link>
              </div>
              <p className="mt-6 text-sm text-stone-500">
                Have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-[#4d5b3f] underline-offset-4 hover:underline"
                >
                  Log in
                </a>{" "}
                to sync your bag across devices.
              </p>
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="bg-[#faf7f2] pb-16 pt-8 md:pb-24 md:pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#featured"
              className="inline-flex items-center gap-2 rounded-full text-sm font-semibold text-[#4d5b3f] transition-colors hover:text-[#3f4b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Continue shopping
            </Link>

            <div className="mt-6 grid gap-8 lg:grid-cols-3 lg:gap-10">
              {/* Line items */}
              <div className="lg:col-span-2">
                <div className="flex items-baseline justify-between gap-4 pb-4">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5b3f]">
                    Cart items
                  </h2>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                    Total
                  </span>
                </div>

                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:gap-5 sm:p-5"
                      >
                        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:h-36 sm:w-28">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 96px, 112px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="truncate text-base font-medium text-stone-800 [font-family:var(--font-after-display)]">
                                {item.name}
                              </p>
                              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#4d5b3f]">
                                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                                In stock · ships in 1–2 days
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>

                          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
                            <div className="flex flex-col gap-2">
                              <div className="flex w-fit items-center gap-1 rounded-full border border-stone-200 bg-white">
                                <button
                                  type="button"
                                  onClick={() => setQuantity(item.id, item.qty - 1)}
                                  aria-label={`Decrease quantity of ${item.name}`}
                                  className="grid h-10 w-10 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                                >
                                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                                <span
                                  aria-label={`Quantity ${item.qty}`}
                                  className="w-7 text-center text-sm font-semibold tabular-nums text-stone-800"
                                >
                                  {item.qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setQuantity(item.id, item.qty + 1)}
                                  aria-label={`Increase quantity of ${item.name}`}
                                  className="grid h-10 w-10 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                                >
                                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                                </button>
                              </div>
                              <span className="text-xs text-stone-400">
                                {formatMoney(item.price)} each
                              </span>
                            </div>
                            <p className="text-lg font-semibold tabular-nums text-stone-900">
                              {formatMoney(item.price * item.qty)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Assurance row */}
                <div className="mt-6 grid gap-3 rounded-2xl border border-stone-200 bg-white p-5 sm:grid-cols-3">
                  {[
                    { icon: Truck, text: "Free shipping over $75" },
                    { icon: Lock, text: "Encrypted, secure checkout" },
                    { icon: RotateCcw, text: "Easy 30-day returns" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#4d5b3f]/10">
                        <item.icon className="h-4 w-4 text-[#4d5b3f]" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-medium leading-snug text-stone-600">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <aside aria-label="Order summary" className="lg:col-span-1">
                <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
                  <h2 className="text-xl font-semibold text-stone-900 [font-family:var(--font-after-display)]">
                    Order Summary
                  </h2>

                  {/* Free shipping progress */}
                  <div className="mt-5">
                    {remaining > 0 ? (
                      <p className="text-sm text-stone-600">
                        You&rsquo;re{" "}
                        <span className="font-semibold text-[#4d5b3f]">
                          {formatMoney(remaining)}
                        </span>{" "}
                        away from free shipping
                      </p>
                    ) : (
                      <p className="flex items-center gap-1.5 text-sm font-medium text-[#4d5b3f]">
                        <Check className="h-4 w-4" aria-hidden="true" />
                        Free shipping unlocked
                      </p>
                    )}
                    <div
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={freeShippingThreshold}
                      aria-valuenow={Math.min(subtotal, freeShippingThreshold)}
                      aria-label="Progress towards free shipping"
                      className="mt-2.5 h-2 overflow-hidden rounded-full bg-stone-200"
                    >
                      <div
                        className="h-full rounded-full bg-[#4d5b3f] transition-[width] duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Promo code */}
                  <form onSubmit={handlePromoSubmit} className="mt-6">
                    <label
                      htmlFor="promo-code"
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5b3f]"
                    >
                      <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                      Promo code
                    </label>
                    <div className="mt-2.5 flex gap-2">
                      <input
                        id="promo-code"
                        type="text"
                        value={promoInput}
                        onChange={(event) => {
                          setPromoInput(event.target.value);
                          if (promoError) setPromoError(null);
                        }}
                        placeholder="THREADLY10"
                        autoComplete="off"
                        className="min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-4 py-3 text-sm uppercase tracking-wide text-stone-800 placeholder:normal-case placeholder:tracking-normal placeholder:text-stone-400 focus:border-[#4d5b3f] focus:outline-none focus:ring-2 focus:ring-[#4d5b3f]/25"
                      />
                      <button
                        type="submit"
                        className="shrink-0 rounded-full border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-[#4d5b3f] hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                      >
                        Apply
                      </button>
                    </div>
                    <div aria-live="polite" className="mt-2 min-h-4">
                      {promoError && (
                        <p className="text-xs font-medium text-red-600">{promoError}</p>
                      )}
                      {appliedPromo && (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-[#4d5b3f]">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          {appliedPromo.label} applied — {appliedPromo.percent}% off
                          <button
                            type="button"
                            onClick={clearPromo}
                            className="ml-1 rounded text-stone-400 underline underline-offset-2 transition-colors hover:text-stone-600"
                          >
                            Remove
                          </button>
                        </p>
                      )}
                    </div>
                  </form>

                  {/* Totals */}
                  <dl className="mt-5 space-y-3 border-t border-stone-200 pt-5 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-stone-500">Subtotal ({count} items)</dt>
                      <dd className="font-medium tabular-nums text-stone-800">
                        {formatMoney(subtotal)}
                      </dd>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between">
                        <dt className="text-stone-500">
                          Discount ({appliedPromo?.label})
                        </dt>
                        <dd className="font-medium tabular-nums text-[#4d5b3f]">
                          −{formatMoney(discount)}
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <dt className="text-stone-500">Shipping</dt>
                      <dd className="font-medium text-stone-800">
                        {remaining > 0 ? "Calculated at checkout" : "Free"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                      <dt className="text-base font-semibold text-stone-900">
                        Estimated total
                      </dt>
                      <dd className="text-xl font-semibold tabular-nums text-stone-900 [font-family:var(--font-after-display)]">
                        {formatMoney(total)}
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    disabled={items.length === 0}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#4d5b3f] py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3f4b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    Checkout · {formatMoney(total)}
                  </button>

                  <p className="mt-3 text-center text-xs text-stone-500">
                    Demo storefront — checkout is not connected.
                  </p>

                  <ul className="mt-5 space-y-2.5 border-t border-stone-200 pt-5">
                    {trustItems.slice(0, 3).map((item, index) => {
                      const Icon = trustIcons[index];
                      return (
                        <li key={item.title} className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 shrink-0 text-[#4d5b3f]" aria-hidden="true" />
                          <span className="text-xs text-stone-500">
                            <span className="font-medium text-stone-700">{item.title}</span> —{" "}
                            {item.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Recommendations */}
      <section
        aria-labelledby="suggestions-heading"
        className="border-t border-stone-200 bg-[#faf7f2] py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <h2
                id="suggestions-heading"
                className="text-3xl font-semibold text-stone-900 md:text-4xl [font-family:var(--font-after-display)]"
              >
                {items.length > 0 ? "Complete the look" : "Popular right now"}
              </h2>
              <p className="mt-2.5 max-w-xl text-base text-stone-600">
                {items.length > 0
                  ? "Pieces our stylists pair with what’s already in your bag."
                  : "Best sellers with free shipping over $75 and easy 30-day returns."}
              </p>
            </div>
            <Link
              href="/#featured"
              className="group inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-[#4d5b3f] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
            >
              View all products
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
            {suggestions.map(({ entry, product }, index) => (
              <ProductCard
                key={entry.name}
                index={index}
                name={entry.name}
                price={product.price}
                image={productImages[entry.name] ?? product.image}
                badge={entry.badge}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
