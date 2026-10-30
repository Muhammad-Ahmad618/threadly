import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import SiteShell from "@/components/shared/SiteShell";
import ProductDetail from "@/components/pages/products/ProductDetail";

// Same font setup as the landing page so the look is consistent across routes.
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-landingPage-display",
  display: "swap",
});

const body = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-landingPage-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[Product] — Threadly",
  description:
    "View product details, sizing, and customer reviews for Threadly clothing.",
};

export default function ProductRoute({
  params,
}: {
  params: { slug: string | undefined };
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} scroll-smooth bg-[#faf7f2] text-stone-600 antialiased [font-family:var(--font-landingPage-body)]`}
    >
      <SiteShell>
        <ProductDetail slug={params?.slug ?? "cotton-shirt"} />
      </SiteShell>
    </div>
  );
}