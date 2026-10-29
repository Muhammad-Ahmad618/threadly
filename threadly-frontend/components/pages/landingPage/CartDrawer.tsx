"use client";

import Image from "next/image";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatMoney, useCart } from "./CartContext";
import { freeShippingThreshold } from "@/data/after-extras";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "./overlay-hooks";

// Glass cart drawer: line items, quantity controls, free-shipping progress
// and checkout. State comes from CartContext (persisted to localStorage).
export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, setQuantity, count, subtotal } = useCart();
  const panelRef = useRef<HTMLElement>(null);

  useEscapeKey(closeCart, isCartOpen);
  useBodyScrollLock(isCartOpen);
  useFocusTrap(panelRef, isCartOpen);

  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]" role="presentation">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-[#2f3a26]/50 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/50 bg-[#faf7f2]/90 shadow-2xl backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-stone-200/80 px-5 py-4">
              <h2
                id="cart-drawer-title"
                className="text-xl font-semibold text-stone-900 [font-family:var(--font-after-display)]"
              >
                Your Cart{" "}
                <span className="text-base font-medium text-stone-500">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-11 w-11 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#4d5b3f]/10">
                  <ShoppingBag className="h-7 w-7 text-[#4d5b3f]" aria-hidden="true" />
                </span>
                <p className="text-lg font-medium text-stone-800">Your cart is empty</p>
                <p className="max-w-xs text-sm leading-relaxed text-stone-500">
                  Fill it with best sellers — free shipping unlocks at {formatMoney(freeShippingThreshold)}.
                </p>
                <a
                  href="#featured"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-[#4d5b3f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3f4b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2"
                >
                  Continue shopping
                </a>
              </div>
            ) : (
              <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-stone-200/80 bg-white/70 p-3"
                  >
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-medium text-stone-800">{item.name}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-sm text-stone-500">{formatMoney(item.price)}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-white">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.id, item.qty - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="grid h-11 w-11 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
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
                            className="grid h-11 w-11 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                          >
                            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-stone-900">
                          {formatMoney(item.price * item.qty)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <footer className="border-t border-stone-200/80 px-5 py-5">
              <div className="mb-4">
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
                  className="mt-2 h-2 overflow-hidden rounded-full bg-stone-200"
                >
                  <div
                    className="h-full rounded-full bg-[#4d5b3f] transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-stone-600">Subtotal</span>
                <span className="font-semibold tabular-nums text-stone-900">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                type="button"
                disabled={items.length === 0}
                className="mt-4 w-full rounded-full bg-[#4d5b3f] py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#3f4b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout · {formatMoney(subtotal)}
              </button>
              <p className="mt-3 text-center text-xs text-stone-500">
                Demo storefront — checkout is not connected.
              </p>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
