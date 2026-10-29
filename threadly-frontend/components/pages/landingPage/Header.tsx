"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { siteContent } from "@/data/content";
import { afterCategories } from "@/data/after-extras";
import { useCart } from "./CartContext";
import { useBodyScrollLock, useEscapeKey, useFocusTrap } from "./overlay-hooks";

// Sticky header: transparent over the hero, glass after a few pixels of
// scroll. Holds the shop mega-dropdown, search overlay, cart count and the
// mobile slide-in menu.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { count, openCart } = useCart();

  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const pendingTileFocusRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobilePanelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega panel when clicking outside of it.
  useEffect(() => {
    if (!megaOpen) return;
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        !megaPanelRef.current?.contains(target) &&
        !megaTriggerRef.current?.contains(target)
      ) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [megaOpen]);

  // After opening with the keyboard, move focus into the panel.
  useEffect(() => {
    if (megaOpen && pendingTileFocusRef.current) {
      pendingTileFocusRef.current = false;
      megaPanelRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
  }, [megaOpen]);

  const closeMega = () => {
    setMegaOpen(false);
    megaTriggerRef.current?.focus();
  };
  useEscapeKey(closeMega, megaOpen);

  const closeSearch = () => setSearchOpen(false);
  useEscapeKey(closeSearch, searchOpen);
  useBodyScrollLock(searchOpen);

  const closeMobile = () => setMobileOpen(false);
  useEscapeKey(closeMobile, mobileOpen);
  useBodyScrollLock(mobileOpen);
  useFocusTrap(mobilePanelRef, mobileOpen);

  function handleMegaTriggerKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      pendingTileFocusRef.current = true;
      setMegaOpen(true);
    }
  }

  function handleTileListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    const tiles = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("a"),
    );
    const currentIndex = tiles.indexOf(document.activeElement as HTMLElement);
    if (currentIndex === -1) return;
    event.preventDefault();
    if (event.key === "ArrowRight") tiles[(currentIndex + 1) % tiles.length]?.focus();
    if (event.key === "ArrowLeft") tiles[(currentIndex - 1 + tiles.length) % tiles.length]?.focus();
    if (event.key === "Home") tiles[0]?.focus();
    if (event.key === "End") tiles[tiles.length - 1]?.focus();
  }

  const normalizedQuery = query.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? [
        ...siteContent.categories
          .filter((category) => category.name.toLowerCase().includes(normalizedQuery))
          .map((category) => ({
            key: `category-${category.name}`,
            label: category.name,
            meta: "Category",
          })),
        ...siteContent.products
          .filter((product) => product.name.toLowerCase().includes(normalizedQuery))
          .map((product) => ({
            key: `product-${product.name}`,
            label: product.name,
            meta: product.price,
          })),
      ].slice(0, 8)
    : [];

  const iconButtonClass =
    "grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "border-b border-white/15 bg-[#2f3a26]/85 shadow-lg backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20 lg:px-8">
          <Link
            href="/after"
            className="flex items-center gap-2.5 rounded-xl p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Threadly home"
          >
            <Image
              src="/images/threadly-mark.png"
              alt=""
              width={284}
              height={310}
              className="h-10 w-auto invert"
            />
            <span className="whitespace-nowrap text-xl font-semibold tracking-wide text-white [font-family:var(--font-after-display)]">
              {siteContent.brand}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {siteContent.mainNav.map((item) =>
                item.hasDropdown ? (
                  <li key={item.label} className="relative">
                    <button
                      ref={megaTriggerRef}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls="shop-mega-menu"
                      onClick={() => setMegaOpen((open) => !open)}
                      onKeyDown={handleMegaTriggerKeyDown}
                      onMouseEnter={() => setMegaOpen(true)}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                        megaOpen ? "bg-white/15 text-white" : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="relative block rounded-full px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                      <span className="after:absolute after:inset-x-4 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#c8a96a] after:transition-transform after:duration-300 hover:after:scale-x-100">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(true)}
              className={iconButtonClass}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <Link
              href="#featured"
              aria-label="Wishlist"
              className={`${iconButtonClass} hidden sm:grid`}
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="#featured"
              aria-label="Account"
              className={`${iconButtonClass} hidden sm:grid`}
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              className={iconButtonClass}
            >
              <span className="relative">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#c8a96a] px-1 text-[10px] font-semibold tabular-nums text-[#2f3a26]">
                    {count}
                  </span>
                )}
              </span>
            </button>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className={`${iconButtonClass} lg:hidden`}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Shop mega-dropdown: glass panel with category image tiles */}
      <div onMouseLeave={() => setMegaOpen(false)}>
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id="shop-mega-menu"
              ref={megaPanelRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full hidden border-y border-white/50 bg-[#faf7f2]/85 shadow-2xl backdrop-blur-xl lg:block"
            >
              <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5b3f]">
                    Shop by Category
                  </h2>
                  <a
                    href="#categories"
                    className="group inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-[#4d5b3f] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                  >
                    View all
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </div>
                <ul
                  className="mt-6 grid grid-cols-6 gap-4"
                  onKeyDown={handleTileListKeyDown}
                >
                  {afterCategories.map((category) => (
                    <li key={category.name}>
                      <a
                        href="#categories"
                        onClick={() => setMegaOpen(false)}
                        className="group block rounded-2xl p-2 transition-colors hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                      >
                        <span className="relative block aspect-[4/5] overflow-hidden rounded-xl">
                          <Image
                            src={category.image}
                            alt={`${category.name} category`}
                            fill
                            sizes="170px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </span>
                        <span className="mt-2.5 block text-sm font-medium text-stone-800 group-hover:text-[#4d5b3f]">
                          {category.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glass search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-[#2f3a26]/60 px-4 pt-20 backdrop-blur-sm sm:pt-24"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search Threadly"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/60 bg-[#faf7f2]/95 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 border-b border-stone-200/80 px-5">
                <Search className="h-5 w-5 shrink-0 text-stone-500" aria-hidden="true" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products and categories…"
                  aria-label="Search products and categories"
                  className="w-full bg-transparent py-4 text-base text-stone-800 placeholder:text-stone-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-stone-500 transition-colors hover:bg-stone-200/70 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              {normalizedQuery ? (
                searchResults.length > 0 ? (
                  <ul className="max-h-80 overflow-y-auto p-3">
                    {searchResults.map((result) => (
                      <li key={result.key}>
                        <a
                          href="#featured"
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between rounded-xl px-4 py-3 text-stone-700 transition-colors hover:bg-white/80 hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                        >
                          <span className="font-medium">{result.label}</span>
                          <span className="text-sm text-stone-500">{result.meta}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-6 py-8 text-center text-sm text-stone-500">
                    No matches for “{query}”. Try “sweater”, “denim” or “dress”.
                  </p>
                )
              ) : (
                <p className="px-6 py-6 text-sm text-stone-500">
                  Popular right now: Wool Sweater, Denim Jacket, Summer Dress.
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile glass slide-in menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[95] bg-[#2f3a26]/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              ref={mobilePanelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[96] flex w-[88%] max-w-sm flex-col border-l border-white/50 bg-[#faf7f2]/95 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-stone-200/80 px-5 py-4">
                <span className="flex items-center gap-2.5">
                  <Image
                    src="/images/threadly-mark.png"
                    alt=""
                    width={284}
                    height={310}
                    className="h-9 w-auto"
                  />
                  <span className="text-lg font-semibold text-stone-800 [font-family:var(--font-after-display)]">
                    {siteContent.brand}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {siteContent.mainNav.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.hasDropdown ? "#categories" : item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-2 py-3.5 text-2xl font-semibold text-stone-800 transition-colors hover:bg-white/70 hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] [font-family:var(--font-after-display)]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <h2 className="mt-8 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4d5b3f]">
                  Categories
                </h2>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {afterCategories.map((category) => (
                    <li key={category.name}>
                      <a
                        href="#categories"
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl border border-stone-200 bg-white/70 px-4 py-3.5 text-sm font-medium text-stone-700 transition-colors hover:border-[#4d5b3f]/40 hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="mt-8 flex flex-wrap gap-2 border-t border-stone-200/80 pt-6">
                  {[
                    { label: "Search", icon: Search },
                    { label: "Wishlist", icon: Heart },
                    { label: "Account", icon: User },
                  ].map((action) => (
                    <li key={action.label}>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          if (action.label === "Search") setSearchOpen(true);
                        }}
                        className="flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-[#4d5b3f]/40 hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                      >
                        <action.icon className="h-4 w-4" aria-hidden="true" />
                        {action.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
