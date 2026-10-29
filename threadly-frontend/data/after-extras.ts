// Everything new for the "after" page lives here. The shared siteContent in
// content.ts is imported and reused as-is — never edited.

import { siteContent } from "./content";

/* ------------------------------------------------------------------ */
/* Announcement bar                                                    */
/* ------------------------------------------------------------------ */

export const announcementMessages = [
  "Free shipping on orders over $75 · Easy 30-day returns",
  "New season drop — just landed in stores and online",
  "Students get 15% off with a valid ID at checkout",
];

/* ------------------------------------------------------------------ */
/* Hero slider                                                         */
/* ------------------------------------------------------------------ */

export const heroSlides = [
  {
    eyebrow: "New Season",
    headline: "Dress Well. Feel Effortless.",
    support:
      "Relaxed tailoring and natural fabrics in earthy tones — new arrivals made for everyday wear.",
    image: "/images/after/hero-1.jpg",
    imageAlt:
      "Couple in earthy brown outfits standing together in a field of tall dry grass",
  },
  {
    eyebrow: "The Linen Edit",
    headline: "Light Layers. Long Days.",
    support:
      "Breathable linen and cotton staples that keep their shape from morning coffee to last light.",
    image: "/images/after/hero-2.jpg",
    imageAlt: "Man wearing a cream linen suit in soft natural light",
  },
  {
    eyebrow: "Everyday Basics",
    headline: "Built to Be Your Favorite.",
    support:
      "Quality fabrics, honest prices and free returns — basics you will reach for on repeat.",
    image: "/images/after/hero-3.jpg",
    imageAlt:
      "Man in a charcoal shirt adjusting his glasses by a weathered wooden door",
  },
];

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

export const trustItems = [
  { title: "Free Shipping", text: "On all orders over $75" },
  { title: "30-Day Returns", text: "Easy, prepaid returns" },
  { title: "Secure Payment", text: "Encrypted at checkout" },
  { title: "Here 24/7", text: "Real humans, any time" },
];

/* ------------------------------------------------------------------ */
/* Categories (reuses content.ts, adds descriptions)                   */
/* ------------------------------------------------------------------ */

const categoryDescriptions: Record<string, string> = {
  Men: "Relaxed shirts, knitwear and tailoring",
  Women: "Dresses, blouses and everyday layers",
  Kids: "Soft, durable pieces for tiny humans",
  Shoes: "Leather styles made to last",
  Accessories: "Bags, belts and small leather goods",
  Sale: "Last-chance pieces at up to 40% off",
};

// Image alts for the /after photography (reviewed before shipping).
const categoryAlts: Record<string, string> = {
  Men: "Cream linen shirt on a wooden branch hanger",
  Women: "Cream blouse held up against a warm tan background",
  Kids: "Neutral-toned children's clothes and a teddy bear on a wooden clothing rack",
  Shoes: "Brown leather slingback heels next to their box on a white background",
  Accessories: "Black and tan leather handbags on a grey background",
  Sale: "Stack of folded knit sweaters in caramel, brown and cream tones",
};

export const afterCategories = siteContent.categories.map((category) => ({
  name: category.name,
  href: "#featured",
  image: `/images/after/cat-${category.name.toLowerCase()}.jpg`,
  imageAlt: categoryAlts[category.name] ?? category.imageAlt,
  description: categoryDescriptions[category.name] ?? "",
}));

/* ------------------------------------------------------------------ */
/* Featured products (reuses content.ts products)                      */
/* ------------------------------------------------------------------ */

export const featuredCopy = {
  heading: "Featured Products",
  subtitle: "Best sellers and just-landed pieces — every item quality-checked and ready to ship.",
};

export type BadgeKind = "new" | "best" | "sale";

export const featuredTabs: {
  label: string;
  items: { name: string; badge: BadgeKind }[];
}[] = [
  {
    label: "New Arrivals",
    items: [
      { name: "Cotton Shirt", badge: "new" },
      { name: "Summer Dress", badge: "new" },
      { name: "Casual Pants", badge: "new" },
      { name: "Basic Hoodie", badge: "new" },
    ],
  },
  {
    label: "Best Sellers",
    items: [
      { name: "Wool Sweater", badge: "best" },
      { name: "Denim Jacket", badge: "best" },
      { name: "Kids Set", badge: "best" },
      { name: "Denim Shorts", badge: "best" },
    ],
  },
  {
    label: "Sale",
    items: [
      { name: "Denim Jacket", badge: "sale" },
      { name: "Summer Dress", badge: "sale" },
      { name: "Basic Hoodie", badge: "sale" },
      { name: "Kids Set", badge: "sale" },
    ],
  },
];

// Ratings, review counts and sale-pre prices. oldPrice is what the item
// "used to cost" before the discount.
export const productExtras: Record<
  string,
  { rating: number; reviews: number; oldPrice?: string; discount?: number }
> = {
  "Cotton Shirt": { rating: 4.8, reviews: 214 },
  "Casual Pants": { rating: 4.6, reviews: 158 },
  "Basic Hoodie": { rating: 4.9, reviews: 342, oldPrice: "$52.99", discount: 25 },
  "Denim Jacket": { rating: 4.7, reviews: 189, oldPrice: "$62.99", discount: 20 },
  "Summer Dress": { rating: 4.8, reviews: 127, oldPrice: "$43.99", discount: 20 },
  "Kids Set": { rating: 4.9, reviews: 96, oldPrice: "$31.99", discount: 20 },
  "Wool Sweater": { rating: 4.8, reviews: 274 },
  "Denim Shorts": { rating: 4.6, reviews: 143 },
};

export const productImageAlts: Record<string, string> = {
  "Cotton Shirt": "Close-up of a person wearing a crisp white cotton shirt in warm light",
  "Casual Pants": "Woman wearing beige wide-leg casual pants and a white tee, seen from behind",
  "Basic Hoodie": "Young woman wearing a pale sage hoodie outdoors",
  "Denim Jacket": "Close-up of a denim jacket collar with a brown leather patch",
  "Summer Dress": "Cream lace summer dress hanging beside white heeled sandals",
  "Kids Set": "Cream ribbed baby onesie folded inside a kraft paper box",
  "Wool Sweater": "Camel wool sweater folded on white bedding",
  "Denim Shorts": "Woman wearing light-wash denim shorts and a white tee, seen from behind",
};

// The /after photography for each product. Explicit (not derived from the
// name) because content.ts uses some non-matching file names — e.g. the
// "Wool Sweater" photo on /before is prod-sweater.jpg.
export const productImages: Record<string, string> = {
  "Cotton Shirt": "/images/after/prod-cotton-shirt.jpg",
  "Casual Pants": "/images/after/prod-casual-pants.jpg",
  "Basic Hoodie": "/images/after/prod-basic-hoodie.jpg",
  "Denim Jacket": "/images/after/prod-denim-jacket.jpg",
  "Summer Dress": "/images/after/prod-summer-dress.jpg",
  "Kids Set": "/images/after/prod-kids-set.jpg",
  "Wool Sweater": "/images/after/prod-sweater.jpg",
  "Denim Shorts": "/images/after/prod-denim-shorts.jpg",
};

// Numeric prices for the cart (content.ts keeps its display strings).
export const productPrices: Record<string, number> = {
  "Cotton Shirt": 19.99,
  "Casual Pants": 29.99,
  "Basic Hoodie": 39.99,
  "Denim Jacket": 49.99,
  "Summer Dress": 34.99,
  "Kids Set": 24.99,
  "Wool Sweater": 44.99,
  "Denim Shorts": 26.99,
};

export const freeShippingThreshold = 75;

/* ------------------------------------------------------------------ */
/* Promo banner                                                        */
/* ------------------------------------------------------------------ */

export const promoCopy = {
  eyebrow: "Limited time",
  title: "Season Sale — Up to 40% Off",
  text: "Last-chance sizes are going fast. Shop markdowns across knitwear, dresses and denim before the season ends.",
  ctaLabel: "Shop the Sale",
  image: "/images/after/promo.jpg",
  imageAlt: "Stylish couple in black and cream outfits on a wooden staircase",
};

/* ------------------------------------------------------------------ */
/* Brand story                                                         */
/* ------------------------------------------------------------------ */

export const storyCopy = {
  eyebrow: "Our Story",
  heading: "Small team. Serious about fabric.",
  paragraphs: [
    "Threadly started in 2019 when four friends pooled their savings and rented a tiny studio above a bakery. We were tired of clothes that looked great on day one and fell apart by month three — so we set out to make everyday pieces we would actually keep.",
    "Every fabric is chosen in person: organic cotton from Portugal, recycled wool from Italy, and linen that gets softer with every wash. We work with small, audited factories, produce in short runs to avoid waste, and quality-check every batch before it ships.",
  ],
  stats: [
    { value: 50, decimals: 0, suffix: "k+", label: "Happy customers" },
    { value: 4.9, decimals: 1, suffix: "", label: "Average rating" },
    { value: 100, decimals: 0, suffix: "%", label: "Quality checked" },
  ],
  mainImage: "/images/after/story-main.jpg",
  mainImageAlt: "Woman in a blush dress walking through an autumn meadow at dusk",
  detailImage: "/images/after/story-detail.jpg",
  detailImageAlt: "Close-up of cream eyelet lace fabric",
};

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export const reviewsCopy = {
  heading: "Loved by 50,000+ customers",
  subtitle:
    "Real feedback from verified buyers — the good, the great, and the “where has this been all my life”.",
};

export const reviews = [
  {
    initials: "MK",
    name: "Maya K.",
    quote:
      "The linen shirt is the nicest I have owned — the weight is perfect and it survived a week of travel without looking rumpled.",
  },
  {
    initials: "JR",
    name: "Jonas R.",
    quote:
      "Ordered on Tuesday, wore it Friday. The wool sweater feels twice its price and the free returns made sizing stress-free.",
  },
  {
    initials: "AT",
    name: "Amara T.",
    quote:
      "Bought the kids set as a gift and ended up ordering two more. The fabric is still soft after countless washes.",
  },
  {
    initials: "SL",
    name: "Sofia L.",
    quote:
      "Support answered in minutes and swapped my size the same day. This is what customer service should feel like.",
  },
  {
    initials: "DW",
    name: "Daniel W.",
    quote:
      "The casual pants drape beautifully and the beige goes with everything. I have since bought them in a second color.",
  },
  {
    initials: "RP",
    name: "Rosa P.",
    quote:
      "Sale section actually has good sizes left. Got the denim jacket for 20% off and the stitching is impeccable.",
  },
];

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

export const newsletterCopy = {
  eyebrow: "Newsletter",
  heading: "Get 10% off your first order",
  text: "Join the list for early access to new drops, styling notes and subscriber-only offers. No spam — unsubscribe any time.",
  inputLabel: "Email address",
  inputPlaceholder: "you@example.com",
  buttonLabel: "Subscribe",
  successHeading: "You're on the list!",
  successText: "Use code WELCOME10 at checkout for 10% off your first order.",
  image: "/images/after/newsletter.jpg",
  imageAlt: "Cream jacket and neutral clothes hanging on white hangers against a soft grey wall",
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footerContact = {
  title: "Contact",
  lines: [
    { text: siteContent.footer.address },
    { text: siteContent.footer.phone, href: `tel:${siteContent.footer.phone.replace(/[^0-9+]/g, "")}` },
    { text: siteContent.footer.email, href: `mailto:${siteContent.footer.email}` },
    { text: "Mon–Sat, 9am–7pm ET" },
  ],
};

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "X", href: "#" },
  { label: "Pinterest", href: "#" },
];

export const paymentMethods = ["VISA", "Mastercard", "Amex", "PayPal", "Apple Pay"];
