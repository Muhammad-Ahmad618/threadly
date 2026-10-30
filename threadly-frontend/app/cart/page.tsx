import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import SiteShell from "@/components/shared/SiteShell";
import CartPage from "@/components/pages/cartPage/CartPage";

// Same font setup as the landing page so both routes share one look; the
// variables are scoped to this page's wrapper.
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
  title: "Your Cart — Threadly",
  description:
    "Review the items in your Threadly bag, apply a promo code and head to checkout. Free shipping over $75 and easy 30-day returns.",
};

export default function CartRoute() {
  return (
    <div
      className={`${display.variable} ${body.variable} scroll-smooth bg-[#faf7f2] text-stone-600 antialiased [font-family:var(--font-landingPage-body)]`}
    >
      <SiteShell>
        <CartPage />
      </SiteShell>
    </div>
  );
}
