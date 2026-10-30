"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Star, X } from "lucide-react";
import { formatMoney, useCart } from "@/components/pages/landingPage/CartContext";
import ProductCard from "@/components/pages/landingPage/ProductCard";
import { productImages, productImageAlts, productPrices, productExtras } from "@/data/after-extras";

const badgeStyles = {
  new: "bg-[#4d5b3f] text-white",
  best: "bg-[#c8a96a] text-[#2f3a26]",
  sale: "bg-[#2f3a26] text-white",
};

function getProductNameFromSlug(slug: string): string {
  return slug
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/[-_]/g, " ")
    .replace(/\bA\b/, "a");
}

const allReviews = [
  { initials: "MK", name: "Maya K.", quote: "The linen shirt is the nicest I have owned — the weight is perfect and it survived a week of travel without looking rumpled." },
  { initials: "JR", name: "Jonas R.", quote: "Ordered on Tuesday, wore it Friday. The wool sweater feels twice its price and the free returns made sizing stress-free." },
  { initials: "AT", name: "Amara T.", quote: "Bought the kids set as a gift and ended up ordering two more. The fabric is still soft after countless washes." },
  { initials: "SL", name: "Sofia L.", quote: "Support answered in minutes and swapped my size the same day. This is what customer service should feel like." },
  { initials: "DW", name: "Daniel W.", quote: "The casual pants drape beautifully and the beige goes with everything. I have since bought them in a second color." },
  { initials: "RP", name: "Rosa P.", quote: "Sale section actually has good sizes left. Got the denim jacket for 20% off and the stitching is impeccable." },
];

const descriptions: Record<string, string> = {
  "Cotton Shirt": "A crisp, breathable cotton shirt designed for everyday wear. Soft finish that gets better with every wash.",
  "Casual Pants": "Beige wide-leg pants with a relaxed fit. Perfect for both work and weekend, featuring a comfortable elastic waistband.",
  "Basic Hoodie": "A soft sage green hoodie with a relaxed fit and dropped shoulders. Quality cotton blend that holds its shape.",
  "Denim Jacket": "A classic denim jacket with brown leather patches and vintage hardware. Built to last and soften with wear.",
  "Summer Dress": "A cream lace summer dress with a flowy silhouette and short sleeves. Ideal for warm-weather events.",
  "Kids Set": "A cream ribbed onesie and lightweight pants set for babies. Soft, durable fabrics that survive countless washes.",
  "Wool Sweater": "A camel wool sweater folded on white bedding. Medium weight with a comfortable crew neck.",
  "Denim Shorts": "Light-wash denim shorts with a relaxed fit and five-pocket style. Everyday wear with vintage hardware.",
};

const sizeOptions: Record<string, string[]> = {
  "Cotton Shirt": ["S", "M", "L", "XL", "2XL"],
  "Casual Pants": ["28", "30", "32", "34", "36"],
  "Basic Hoodie": ["S", "M", "L", "XL"],
  "Denim Jacket": ["S", "M", "L", "XL", "2XL"],
  "Summer Dress": ["XS", "S", "M", "L", "XL"],
  "Kids Set": ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"],
  "Wool Sweater": ["S", "M", "L", "XL"],
  "Denim Shorts": ["28", "30", "32", "34", "36"],
};

export default function ProductDetail({
  slug,
}: {
  slug: string;
}) {
  const normalizedSlug = slug.replace(/-+/g, "-").toLowerCase();
  const productName = getProductNameFromSlug(normalizedSlug);

  const price = productPrices[normalizedSlug] ?? 0;
  const extras = productExtras[normalizedSlug] ?? { rating: 0, reviews: 0 };
  const image = productImages[normalizedSlug] ?? "/images/after/hero-1.jpg";
  const imageAlt = productImageAlts[normalizedSlug] ?? productName;

  // Determine badge: check if product appears in featured tabs
  const featuredItems = [
    { name: "Cotton Shirt", badge: "new" },
    { name: "Summer Dress", badge: "new" },
    { name: "Casual Pants", badge: "new" },
    { name: "Basic Hoodie", badge: "new" },
    { name: "Wool Sweater", badge: "best" },
    { name: "Denim Jacket", badge: "best" },
    { name: "Kids Set", badge: "best" },
    { name: "Denim Shorts", badge: "best" },
    { name: "Denim Jacket", badge: "sale" },
    { name: "Summer Dress", badge: "sale" },
    { name: "Basic Hoodie", badge: "sale" },
    { name: "Kids Set", badge: "sale" },
  ];
  const featuredItem = featuredItems.find((fi) => fi.name === productName);
  const finalBadge = featuredItem?.badge ?? "new";

  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [wished, setWished] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  const numericPrice = price;

  const discount =
    finalBadge === "sale"
      ? (extras.discount ??
        (extras.oldPrice
          ? Math.round(
              (1 - numericPrice / Number(extras.oldPrice.replace("$", ""))) * 100,
            )
          : 0))
      : 0;

  const badgeLabel =
    finalBadge === "new" ? "New" : finalBadge === "best" ? "Best Seller" : `-${discount}%`;

  function handleAdd() {
    addItem({ id: normalizedSlug, name: productName, price: numericPrice, image });
  }

  const descriptionsMap: Record<string, string> = {
    "Cotton Shirt": "A crisp, breathable cotton shirt designed for everyday wear. Soft finish that gets better with every wash.",
    "Casual Pants": "Beige wide-leg pants with a relaxed fit. Perfect for both work and weekend, featuring a comfortable elastic waistband.",
    "Basic Hoodie": "A soft sage green hoodie with a relaxed fit and dropped shoulders. Quality cotton blend that holds its shape.",
    "Denim Jacket": "A classic denim jacket with brown leather patches and vintage hardware. Built to last and soften with wear.",
    "Summer Dress": "A cream lace summer dress with a flowy silhouette and short sleeves. Ideal for warm-weather events.",
    "Kids Set": "A cream ribbed onesie and lightweight pants set for babies. Soft, durable fabrics that survive countless washes.",
    "Wool Sweater": "A camel wool sweater folded on white bedding. Medium weight with a comfortable crew neck.",
    "Denim Shorts": "Light-wash denim shorts with a relaxed fit and five-pocket style. Everyday wear with vintage hardware.",
  };

  const description =
    descriptionsMap[normalizedSlug] ||
    "Quality craftsmanship and natural fabrics designed to last. Every piece is quality-checked before shipping.";

  const sizeOptionsList = sizeOptions[normalizedSlug] ?? ["S", "M", "L"];

  // Find matching review
  const matchingReview =
    allReviews.find(
      (r) =>
        r.quote.toLowerCase().includes(normalizedSlug) ||
        (normalizedSlug.includes("wool") && r.name === "Jonas R.") ||
        (normalizedSlug.includes("kids") && r.name === "Amara T.") ||
        (normalizedSlug.includes("denim") && r.name === "Rosa P.") ||
        (normalizedSlug.includes("cotton") && r.name === "Maya K.") ||
        (normalizedSlug.includes("summer") && r.name === "Daniel W.")
    ) || allReviews[0];

  // Related products from best sellers tab
  const relatedProducts = [
    { name: "Wool Sweater", image: productImages["wool-sweater"] ?? "/images/after/hero-1.jpg", price: productPrices["wool-sweater"] ?? 0, badge: "best" },
    { name: "Denim Jacket", image: productImages["denim-jacket"] ?? "/images/after/hero-1.jpg", price: productPrices["denim-jacket"] ?? 0, badge: "best" },
    { name: "Kids Set", image: productImages["kids-set"] ?? "/images/after/hero-1.jpg", price: productPrices["kids-set"] ?? 0, badge: "best" },
    { name: "Denim Jacket", image: productImages["denim-jacket"] ?? "/images/after/hero-1.jpg", price: productPrices["denim-jacket"] ?? 0, badge: "sale" },
    { name: "Summer Dress", image: productImages["summer-dress"] ?? "/images/after/hero-1.jpg", price: productPrices["summer-dress"] ?? 0, badge: "sale" },
    { name: "Basic Hoodie", image: productImages["basic-hoodie"] ?? "/images/after/hero-1.jpg", price: productPrices["basic-hoodie"] ?? 0, badge: "sale" },
    { name: "Kids Set", image: productImages["kids-set"] ?? "/images/after/hero-1.jpg", price: productPrices["kids-set"] ?? 0, badge: "sale" },
  ];

  return (
    <>
      {/* Olive title band */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.06 13.5L4.61 8.9c-.36-.36-.36-.94 0-1.3l4.45-4.45a1 1 0 011.42 1.08l-3.12 3.12a1 1 0 01-1.08 1.42zM11 11a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </li>
              <li aria-current="page" className="font-medium text-white">
                {productName}
              </li>
            </ol>
          </nav>
          <div className="mt-5">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl [font-family:var(--font-after-display)]">
              {productName}
            </h1>
            <p className="mt-2 text-stone-300">
              {formatMoney(price)}
            </p>
          </div>
        </div>
      </section>

      <main className="bg-[#faf7f2] pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Product media */}
            <div className="space-y-4">
              <Image
                src={image}
                alt={imageAlt}
                className="rounded-2xl border border-stone-200 w-full h-96 object-cover"
                width={2400}
                height={1800}
                loading="lazy"
              />

              <div className="grid grid-cols-3 gap-2">
                {["Cotton Shirt", "Casual Pants", "Basic Hoodie", "Denim Jacket", "Summer Dress", "Kids Set", "Wool Sweater", "Denim Shorts"].map((name) => {
                  const isActive = name === productName;
                  return (
                    <button
                      key={name}
                      type="button"
                      disabled={!isActive}
                      className={`relative rounded-xl border ${
                        isActive ? "border-[#4d5b3f]" : "border-stone-200/50"
                      } transition-colors`}
                    >
                      <span className="absolute -inset-1 rounded-xl"></span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product details panel */}
            <div>
              {/* Description */}
              <div className="mb-8">
                <p className="text-stone-600 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Sizing guide */}
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#4d5b3f]">Size Guide</p>
                <p className="mt-2 text-sm text-stone-500">
                  <strong>Chest (inches):</strong> 36(S) · 38(M) · 40(L) · 42(XL)
                </p>
                <p className="mt-2 text-sm text-stone-500">
                  <strong>Length (inches):</strong> 28(S) · 29(M) · 30(L) · 31(XL)
                </p>
              </div>

              {/* Quantity selector */}
              <div className="mb-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="grid h-10 w-10 place-items-center rounded-l border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                >
                  <Minus aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-semibold tabular-nums text-stone-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="grid h-10 w-10 place-items-centered rounded-r border border-stone-200 bg-white text-stone-600 transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
                >
                  <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Size options */}
              <div className="grid grid-cols-3 gap-2 my-4">
                {sizeOptionsList.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`relative rounded-full border border-stone-200 bg-white ${
                      selectedSize === size ? "bg-[#4d5b3f] text-white" : ""
                    } text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAdd}
                className="w-full rounded-full bg-[#4d5b3f] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3f4b33] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f] focus-visible:ring-offset-2"
              >
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setWished((c) => !c)}
                aria-pressed={wished}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                className="mt-3 rounded-full bg-white/90 px-3 py-2 text-sm font-medium text-stone-500 transition-colors duration-200 hover:text-[#4d5b3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d5b3f]"
              >
                <Heart
                  className={wished ? "h-4 w-4 fill-[#4d5b3f] text-[#4d5b3f]" : "h-4 w-4 text-stone-500"}
                  aria-hidden="true"
                />
                {wished ? ("Saved") : ("Wishlist")}
              </button>
            </div>
          </div>

          {/* Reviews section */}
          <section aria-label="Customer reviews" className="mt-16 pt-10 bg-white border-t border-stone-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl [font-family:var(--font-after-display)]">
                Customer Reviews
              </h2>
              <p className="mt-2 text-stone-500">
                Rated 4.7 out of 5 stars
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-3">
                {allReviews.map((review, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#4d5b3f]/10">
                      <Star className="h-4 w-4 text-[#c8a96a]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">{review.name}</p>
                      <p className="text-sm text-stone-500">{review.initials}</p>
                      <p className="mt-1 text-stone-600 leading-relaxed">
                        {review.quote}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-stone-500">Write a review</p>
                <a href="#" className="text-[#4d5b3f] font-medium underline underline-offset-4 hover:underline">
                  Here
                </a>
              </div>
            </div>
          </section>

          {/* Related products */}
          <section aria-label="Related products" className="mt-16 pt-10 bg-[#faf7f2]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl md:mb-6 [font-family:var(--font-after-display)]">
                Complete the look
              </h2>

              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
                {relatedProducts.map((prod) => {
                  const prodName = prod.name;
                  const prodImage = prod.image ?? "/images/after/hero-1.jpg";
                  const prodPrice = prod.price ?? 0;
                  const prodBadge = prod.badge ?? "new";

                  const prodDiscount =
                    prodBadge === "sale"
                      ? (productExtras[prodName.toLowerCase().replace(/ /g, "-")]?.discount ??
                        (productExtras[prodName.toLowerCase().replace(/ /g, "-")]?.oldPrice
                          ? Math.round(
                              (1 - prodPrice / Number(productExtras[prodName.toLowerCase().replace(/ /g, "-")].oldPrice!.replace("$", ""))) * 100,
                            )
                          : 0))
                      : 0;

                  const prodBadgeLabel =
                    prodBadge === "new" ? "New" : prodBadge === "best" ? "Best Seller" : `-${prodDiscount}%`;

                  return (
                    <ProductCard
                      key={prodName}
                      name={prodName}
                      price={formatMoney(prodPrice)}
                      image={prodImage}
                      badge={prodBadge as "new" | "best" | "sale"}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}